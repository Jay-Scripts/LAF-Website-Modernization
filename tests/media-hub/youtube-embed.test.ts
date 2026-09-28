import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import YouTubeEmbed from "../../app/media-hub/_components/YouTubeEmbed";

test("video preview exposes a modal trigger without loading the player before interaction", () => {
  const markup = renderToStaticMarkup(createElement(YouTubeEmbed, { videoId: "NMytlsxzv70", title: "A Place to Heal" }));
  assert.match(markup, /aria-label="Play A Place to Heal"/);
  assert.match(markup, /aria-haspopup="dialog"/);
  assert.match(markup, /aria-expanded="false"/);
  assert.doesNotMatch(markup, /<iframe/);
});
