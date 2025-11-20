import { describe, expect, it } from "vitest";
import { toCodepoint } from "./util";

// Função utilitária para gerar URL (sem importar componente Solid)
function unicodeEmojiUrl(pack: string = "fluent-3d", text: string) {
  return `https://static.revolt.chat/emoji/${pack}/${toCodepoint(text)}.svg`;
}

describe("unicodeEmojiUrl - CDN URLs", () => {
  it("deve gerar URL correta para emoji smile com twemoji", () => {
    const url = unicodeEmojiUrl("twemoji", "😀");
    expect(url).toBe("https://static.revolt.chat/emoji/twemoji/1f600.svg");
  });

  it("deve gerar URL correta para emoji smile com fluent-3d (padrão)", () => {
    const url = unicodeEmojiUrl("fluent-3d", "😀");
    expect(url).toBe("https://static.revolt.chat/emoji/fluent-3d/1f600.svg");
  });

  it("deve gerar URL correta para emoji heart com noto", () => {
    const url = unicodeEmojiUrl("noto", "❤️");
    // ❤️ tem variation selector fe0f, toCodepoint atualmente mantém ele
    expect(url).toBe("https://static.revolt.chat/emoji/noto/2764-fe0f.svg");
  });

  it("deve gerar URL correta para emoji com skin tone", () => {
    const url = unicodeEmojiUrl("twemoji", "👍🏻"); // thumbs up light skin
    expect(url).toBe("https://static.revolt.chat/emoji/twemoji/1f44d-1f3fb.svg");
  });

  it("deve retornar URL vazia para string vazia", () => {
    const url = unicodeEmojiUrl("twemoji", "");
    expect(url).toBe("https://static.revolt.chat/emoji/twemoji/.svg");
  });

  it("deve gerar URL correta para emoji composto (ZWJ sequence)", () => {
    const url = unicodeEmojiUrl("twemoji", "👨‍👩‍👧‍👦"); // family
    // ZWJ sequences mantêm o 200d no meio
    expect(url).toContain("1f468-200d-1f469-200d-1f467-200d-1f466");
  });
});
