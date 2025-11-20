import { describe, expect, it } from "vitest";
import { toCodepoint } from "./util";

// Implementação CORRIGIDA FINAL
function unicodeEmojiUrlCorrigido(pack: string = "fluent-3d", text: string) {
  return `https://static.revolt.chat/emoji/${pack}/${toCodepoint(text)}.svg`;
}

describe("unicodeEmojiUrl - CICLO 6", () => {
  it("deve gerar URL correta para emoji composto (ZWJ sequence)", () => {
    const url = unicodeEmojiUrlCorrigido("twemoji", "👨‍👩‍👧‍👦"); // family
    // ZWJ sequences mantêm o 200d no meio
    expect(url).toBe("https://static.revolt.chat/emoji/twemoji/1f468-200d-1f469-200d-1f467-200d-1f466.svg");
  });
});
