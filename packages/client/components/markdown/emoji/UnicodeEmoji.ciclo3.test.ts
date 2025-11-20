import { describe, expect, it } from "vitest";
import { toCodepoint } from "./util";

// Implementação CORRIGIDA
function unicodeEmojiUrlCorrigido(pack: string = "fluent-3d", text: string) {
  return `https://static.revolt.chat/emoji/${pack}/${toCodepoint(text)}.svg`;
}

describe("unicodeEmojiUrl - CICLO 3", () => {
  it("deve gerar URL correta para emoji heart com noto", () => {
    const url = unicodeEmojiUrlCorrigido("noto", "❤️");
    // ❤️ tem variation selector fe0f, toCodepoint atualmente mantém ele
    expect(url).toBe("https://static.revolt.chat/emoji/noto/2764-fe0f.svg");
  });
});
