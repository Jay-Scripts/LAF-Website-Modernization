import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import PartnersCarousel from "../../components/PartnersCarousel";

test("each partner has a keyboard-accessible preview trigger without duplicate tab stops", () => {
  const markup = renderToStaticMarkup(createElement(PartnersCarousel));
  const buttons = markup.match(/<button\b[^>]*>/g) ?? [];
  const previewButtons = buttons.filter((button) => button.includes('aria-label="About '));
  const accessibleButtons = previewButtons.filter((button) => !button.includes('aria-hidden="true"'));
  assert.equal(accessibleButtons.length, 24);
  assert.equal(new Set(accessibleButtons.map((button) => button.match(/aria-label="([^"]+)"/)?.[1])).size, 24);
  const duplicates = previewButtons.filter((button) => button.includes('aria-hidden="true"'));
  assert.equal(duplicates.length, 24);
  assert.ok(duplicates.every((button) => button.includes('tabindex="-1"')));
});
