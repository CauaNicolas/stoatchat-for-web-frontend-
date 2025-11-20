import { describe, it, expect } from "vitest";
import { toCodepoint, isOnlyEmoji } from "./util";

describe("toCodepoint", () => {
  it("deve converter emoji simples para codepoint", () => {
    // 😀 (grinning face)
    expect(toCodepoint("😀")).toBe("1f600");
  });

  it("deve converter emoji com skin tone para codepoint", () => {
    // 👍🏽 (thumbs up medium skin tone)
    expect(toCodepoint("👍🏽")).toBe("1f44d-1f3fd");
  });

  it("deve converter emoji com ZWJ (zero-width joiner) para codepoint", () => {
    // 👨‍👩‍👧‍👦 (family: man, woman, girl, boy)
    expect(toCodepoint("👨‍👩‍👧‍👦")).toBe("1f468-200d-1f469-200d-1f467-200d-1f466");
  });

  it("deve retornar string vazia para input vazio", () => {
    expect(toCodepoint("")).toBe("");
  });

  it("deve converter emoji de bandeira para codepoint", () => {
    // 🇧🇷 (Brazil flag)
    expect(toCodepoint("🇧🇷")).toBe("1f1e7-1f1f7");
  });

  it("deve converter emoji com variation selector", () => {
    // ❤️ (red heart with variation selector)
    expect(toCodepoint("❤️")).toBe("2764-fe0f");
  });
});

describe("isOnlyEmoji", () => {
  it("deve retornar true para string com apenas um emoji", () => {
    expect(isOnlyEmoji("😀")).toBe(true);
  });

  it("deve retornar true para string com múltiplos emojis", () => {
    expect(isOnlyEmoji("😀😃😄")).toBe(true);
  });

  it("deve retornar true para emoji com espaços em branco", () => {
    expect(isOnlyEmoji("  😀  ")).toBe(true);
  });

  it("deve retornar false para string com texto e emoji", () => {
    expect(isOnlyEmoji("olá 😀")).toBe(false);
  });

  it("deve retornar false para string sem emoji", () => {
    expect(isOnlyEmoji("olá mundo")).toBe(false);
  });

  it("deve retornar true para custom emoji", () => {
    expect(isOnlyEmoji(":01HNGABCD1234567890ABCDEFG:")).toBe(true);
  });

  it("deve retornar true para mix de unicode e custom emoji", () => {
    expect(isOnlyEmoji("😀:01HNGABCD1234567890ABCDEFG:🎉")).toBe(true);
  });

  it("deve retornar false para string vazia", () => {
    expect(isOnlyEmoji("")).toBe(false);
  });

  it("deve retornar false para string com apenas espaços", () => {
    expect(isOnlyEmoji("   ")).toBe(false);
  });
});

describe("toCodepoint - edge cases que podem causar URLs quebradas", () => {
  it("deve lidar com emoji seguido por variation selector invisível", () => {
    // Alguns emojis têm variation selectors que podem não ser processados
    const heartWithSelector = "❤️"; // U+2764 U+FE0F
    const codepoint = toCodepoint(heartWithSelector);
    // Deve incluir o variation selector no codepoint
    expect(codepoint).toContain("2764");
    expect(codepoint).not.toBe("");
  });

  it("deve lidar com sequências de keycap emojis", () => {
    // Keycap emojis como #️⃣ podem ter problemas
    const keycap = "#️⃣"; // U+0023 U+FE0F U+20E3
    const codepoint = toCodepoint(keycap);
    expect(codepoint).not.toBe("");
    expect(codepoint).toContain("23");
  });

  it("deve lidar com emoji com múltiplos skin tones", () => {
    // 🧑🏻‍🤝‍🧑🏿 - people holding hands with different skin tones
    const complexEmoji = "🧑🏻‍🤝‍🧑🏿";
    const codepoint = toCodepoint(complexEmoji);
    expect(codepoint).not.toBe("");
    // Deve conter os codepoints dos skin tones
    expect(codepoint).toContain("1f3fb"); // light skin tone
    expect(codepoint).toContain("1f3ff"); // dark skin tone
  });

  it("NÃO deve processar caracteres de controle isolados", () => {
    // Zero-width joiner isolado não é um emoji válido
    const zwj = "\u200d";
    const codepoint = toCodepoint(zwj);
    // Deve ignorar caracteres de controle isolados
    expect(codepoint).toBe("");
  });

  it("deve processar corretamente emojis com fitzpatrick modifiers", () => {
    // 👋🏾 wave with medium-dark skin tone
    const wave = "👋🏾";
    const codepoint = toCodepoint(wave);
    expect(codepoint).toBe("1f44b-1f3fe");
  });
});
