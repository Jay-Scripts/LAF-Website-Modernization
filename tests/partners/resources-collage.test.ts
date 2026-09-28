import assert from "node:assert/strict";
import test from "node:test";
import { getServicePage } from "../../data/servicePages";

test("resources collage preserves six photos in an asymmetric photo story", () => {
  const resources = getServicePage("resources-responsibility");
  assert.ok(resources);
  assert.equal(resources.images.length, 6);
  assert.deepEqual(resources.images.map((photo) => photo.className), [
    "col-span-2 md:col-span-5 md:row-span-2",
    "col-span-2 md:col-span-3",
    "col-span-2 md:col-span-4 md:row-span-2",
    "col-span-2 md:col-span-3",
    "col-span-2 md:col-span-7",
    "col-span-2 md:col-span-5",
  ]);
  assert.equal(new Set(resources.images.map((photo) => photo.src)).size, 6);
});
