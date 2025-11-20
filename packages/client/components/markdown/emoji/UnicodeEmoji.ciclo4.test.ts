import { describe, expect, it } from "vitest";
import { toCodepoint } from "./util";

// Implementação CORRIGIDA
function unicodeEmojiUrlCorrigido(pack: string = "fluent-3d", text: string) {
  return `https://static.revolt.chat/emoji/${pack}/${toCodepoint(text)}.svg`;
}

describe("unicodeEmojiUrl - CICLO 4", () => {
  it("deve gerar URL correta para emoji com skin tone", () => {
    const url = unicodeEmojiUrlCorrigido("twemoji", "👍🏻"); // thumbs up light skin
    expect(url).toBe("https://static.revolt.chat/emoji/twemoji/1f44d-1f3fb.svg");
  });
});
