import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import HeartsCTA from "../../components/HeartsCTA";
import { getServicePage } from "../../data/servicePages";

test("transportation CTA frames the families in the open shuttle doorway", () => {
  const transportation = getServicePage("transportation");
  assert.ok(transportation);
  assert.equal(transportation.ctaImage, "/images/hearts/transportation/transportation-home-arrival.jpeg");
  assert.ok("ctaImageClassName" in transportation);
  assert.equal(transportation.ctaImageClassName, "object-[38%_30%] max-[767px]:object-[38%_center]");
});

test("activities CTA uses the group photo with a child-focused crop", () => {
  const activities = getServicePage("activities");
  assert.ok(activities);
  assert.equal(activities.ctaImage, "/images/hearts/activities/activities-group-play.png");
  assert.ok("ctaImageClassName" in activities);
  assert.equal(activities.ctaImageClassName, "object-[28%_65%] max-[767px]:object-[26%_65%]");
});

test("shared HEARTS CTA keeps the housing photo treatment and configurable copy", () => {
  assert.equal(typeof HeartsCTA, "function", "a reusable photo CTA must be available");
  const markup = renderToStaticMarkup(createElement(HeartsCTA, {
    imageSrc: "/images/hearts/everyday-meals/everyday-meals-prep.jpeg",
    title: "Help keep families nourished.",
    description: "Meals for children and caregivers.",
  }));
  assert.ok(markup.includes("everyday-meals-prep.jpeg"));
  assert.ok(markup.includes("Help keep families nourished."));
  assert.ok(markup.includes("Meals for children and caregivers."));
  assert.ok(markup.includes("hearts-cta-copy"));
  assert.ok(markup.includes("text-shadow:"));
  assert.ok(markup.includes("Give Hope"));
  assert.ok(!markup.includes("/_next/image"));
});
