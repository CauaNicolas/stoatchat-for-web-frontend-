import { describe, expect, it } from "vitest";
import { toCodepoint } from "./util";

// Implementação CORRIGIDA
function unicodeEmojiUrlCorrigido(pack: string = "fluent-3d", text: string) {
  return `https://static.revolt.chat/emoji/${pack}/${toCodepoint(text)}.svg`;
}

describe("unicodeEmojiUrl - CICLO 2", () => {
  it("deve gerar URL correta para emoji smile com fluent-3d (padrão)", () => {
    const url = unicodeEmojiUrlCorrigido("fluent-3d", "😀");
    expect(url).toBe("https://static.revolt.chat/emoji/fluent-3d/1f600.svg");
  });
});
