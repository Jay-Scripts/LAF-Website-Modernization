import assert from "node:assert/strict";
import test from "node:test";
import { getServicePage } from "../../data/servicePages";

test("activities collage leads with group play and four supporting photos", () => {
  const activities = getServicePage("activities");
  assert.ok(activities);
  assert.equal(activities.images.length, 5);
  assert.equal(activities.images[0].src, "/images/hearts/activities/activities-group-play.png");
  assert.equal(activities.images[0].className, "col-span-2 md:col-span-6 md:row-span-2");
  for (const photo of activities.images.slice(1)) {
    assert.equal(photo.className, "md:col-span-3");
  }
  assert.equal(new Set(activities.images.map((photo) => photo.src)).size, 5);
});
