import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import HousingPhotoStory from "../../app/services/[slug]/HousingPhotoStory";
import { getServicePage } from "../../data/servicePages";

test("housing photos reveal individually without removing photo-preview controls", () => {
  const housing = getServicePage("housing");
  assert.ok(housing);
  const markup = renderToStaticMarkup(createElement(HousingPhotoStory, { images: [...housing.images] }));
  assert.equal((markup.match(/data-revealed="false"/g) ?? []).length, 3);
  assert.equal((markup.match(/aria-label="View [^"]+ photo"/g) ?? []).length, 3);
  assert.equal((markup.match(/filter:none/g) ?? []).length, 3);
  assert.ok(markup.includes("-translate-x-8"));
  assert.ok(markup.includes("translate-x-8"));
});
