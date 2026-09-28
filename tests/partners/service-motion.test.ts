import assert from "node:assert/strict";
import test from "node:test";
import { isValidElement, type ReactNode } from "react";
import ServicePage from "../../app/services/[slug]/page";
import PageHero from "../../components/PageHero";
import Reveal from "../../components/Reveal";
import { servicePages } from "../../data/servicePages";

test("all six service pages expose matching hero, CTA and HEARTS entrance motion", async () => {
  for (const service of servicePages) {
    const tree = await ServicePage({ params: Promise.resolve({ slug: service.slug }) });
    const nodes: { type: unknown; props: { children?: ReactNode; className?: string; imageWrapperClassName?: string; contentClassName?: string } }[] = [];
    function visit(node: ReactNode) {
      if (Array.isArray(node)) { node.forEach(visit); return; }
      if (!isValidElement<{ children?: ReactNode; className?: string; imageWrapperClassName?: string; contentClassName?: string }>(node)) return;
      nodes.push(node);
      visit(node.props.children);
    }
    visit(tree);
    const hero = nodes.find((node) => node.type === PageHero);
    assert.ok(hero?.props.imageWrapperClassName?.includes("hearts-hero-photo"), service.slug);
    assert.ok(hero?.props.contentClassName?.includes("hearts-hero-copy"), service.slug);
    assert.ok(nodes.some((node) => node.type === Reveal && node.props.className?.includes("hearts-cta-copy")), service.slug);
    assert.ok(nodes.some((node) => node.type === Reveal && node.props.className === "hearts-programs"), service.slug);
  }
});
