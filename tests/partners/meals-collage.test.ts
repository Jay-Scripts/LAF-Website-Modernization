import assert from "node:assert/strict";
import test from "node:test";
import { getServicePage } from "../../data/servicePages";

test("meal collage leads with the family table and four supporting photos", () => {
  const meals = getServicePage("everyday-meals");
  assert.ok(meals);
  assert.equal(meals.images.length, 5);
  assert.equal(meals.images[0].src, "/images/hearts/everyday-meals/everyday-meals-family-table.png");
  assert.equal(meals.images[0].className, "col-span-2 md:col-span-6 md:row-span-2");
  for (const photo of meals.images.slice(1)) {
    assert.equal(photo.className, "md:col-span-3");
  }
  assert.equal(new Set(meals.images.map((photo) => photo.src)).size, 5);
});
