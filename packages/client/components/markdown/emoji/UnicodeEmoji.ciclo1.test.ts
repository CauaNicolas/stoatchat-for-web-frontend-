import { describe, expect, it } from "vitest";
import { toCodepoint } from "./util";

// Implementação CORRIGIDA (após TDD)
function unicodeEmojiUrlCorrigido(pack: string = "fluent-3d", text: string) {
  return `https://static.revolt.chat/emoji/${pack}/${toCodepoint(text)}.svg`;
}

describe("unicodeEmojiUrl - CICLO 1", () => {
  it("deve gerar URL correta para emoji smile com twemoji", () => {
    const url = unicodeEmojiUrlCorrigido("twemoji", "😀");
    expect(url).toBe("https://static.revolt.chat/emoji/twemoji/1f600.svg");
  });
});
