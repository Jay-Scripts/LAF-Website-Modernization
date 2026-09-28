import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ProgramsNavigation, { type ProgramSlug } from "../../components/ProgramsNavigation";

const programs: [ProgramSlug, string][] = [
  ["housing", "Housing"],
  ["everyday-meals", "Everyday Meals"],
  ["activities", "Activities"],
  ["resources-responsibility", "Resources &amp; Responsibility"],
  ["transportation", "Transportation"],
  ["spiritual-care", "Spiritual Care"],
];

test("HEARTS navigation highlights the supplied program across all six services", () => {
  for (const [slug, label] of programs) {
    const markup = renderToStaticMarkup(createElement(ProgramsNavigation, { activeProgram: slug, layout: "menu" }));
    assert.ok(markup.includes(`You’re exploring ${label}`));
    const links = markup.match(/<a\b[^>]*>/g) ?? [];
    assert.equal(links.length, 6);
    const active = links.filter((link) => link.includes('aria-current="page"'));
    assert.equal(active.length, 1);
    assert.ok(active[0].includes(`/services/${slug}#top`));
  }
});
