/**
 * Surah Al-Baqarah 2:261 — verified against api.quran.com (Uthmani) and
 * alquran.cloud (quran-simple, en.sahih, ur.jalandhry) on 2026-07-31.
 * Do not hand-edit the Arabic without re-checking against a source.
 *
 * Shared by AyahBlock (About page) and Hero (home page act 3) so the verse
 * and its translations exist in exactly one place.
 */
export const AYAH = {
  arabic:
    "مَثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنبَتَتْ سَبْعَ سَنَابِلَ فِي كُلِّ سُنبُلَةٍ مِّائَةُ حَبَّةٍ ۗ وَاللَّهُ يُضَاعِفُ لِمَن يَشَاءُ ۗ وَاللَّهُ وَاسِعٌ عَلِيمٌ",
  reference: "سورة البقرة — ٢:٢٦١",
  translations: {
    en: {
      label: "English",
      text: "The example of those who spend their wealth in the way of Allah is like a seed [of grain] which grows seven spikes; in each spike is a hundred grains. And Allah multiplies [His reward] for whom He wills. And Allah is all-Encompassing and Knowing.",
    },
    ur: {
      label: "اردو",
      text: "جو لوگ اپنا مال خدا کی راہ میں خرچ کرتے ہیں ان (کے مال) کی مثال اس دانے کی سی ہے جس سے سات بالیں اگیں اور ہر ایک بال میں سو سو دانے ہوں اور خدا جس (کے مال) کو چاہتا ہے زیادہ کرتا ہے۔ وہ بڑی کشائش والا اور سب کچھ جاننے والا ہے",
    },
  },
} as const;

export type AyahLang = keyof typeof AYAH.translations;
