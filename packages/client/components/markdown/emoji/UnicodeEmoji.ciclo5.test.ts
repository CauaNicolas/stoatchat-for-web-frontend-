import { describe, expect, it } from "vitest";
import { toCodepoint } from "./util";

// Implementação CORRIGIDA
function unicodeEmojiUrlCorrigido(pack: string = "fluent-3d", text: string) {
  return `https://static.revolt.chat/emoji/${pack}/${toCodepoint(text)}.svg`;
}

describe("unicodeEmojiUrl - CICLO 5", () => {
  it("deve retornar URL vazia para string vazia", () => {
    const url = unicodeEmojiUrlCorrigido("twemoji", "");
    expect(url).toBe("https://static.revolt.chat/emoji/twemoji/.svg");
  });
});
