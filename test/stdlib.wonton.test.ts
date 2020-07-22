import { createTestUtil } from "./utils";

const { expectOutput: 食渾沌 } = createTestUtil({
  prefix: "吾嘗觀「「渾沌經」」之書。方悟「食渾沌」之義。施「食渾沌」於「「",
  suffix: "」」。名之曰「餛飩」。施「JSON.stringify」於「餛飩」。書之。"
});

const { expectOutput: 包渾沌 } = createTestUtil({
  prefix:
    "吾嘗觀「「渾沌經」」之書。方悟「包渾沌」之義。施「JSON.parse」於「「",
  suffix: "」」。名之曰「餛飩」。施「包渾沌」於「餛飩」。書之。",
  stringProcess: (x: string) => x.replace(/[\s\n]+/gm, "")
});

function escape(str: TemplateStringsArray) {
  return str[0].replace(/\n/g, "\\\n");
}

describe("wonton", () => {
  describe("parse", () => {
    describe("objects", () => {
      it("empty", () => {
        食渾沌("", {});
      });

      it("empty object", () => {
        食渾沌("物也", {});
      });

      it("basic", () => {
        食渾沌(
          escape`
          物
            之「名」言「李白」
            之「壽考」數「六一」
            之「擅詩」爻「陽」
            之「官」物
              之「銜」言「翰林」。
              之「年」言「天寶元年」。
            也
          也`,
          {
            名: "李白",
            壽考: 61,
            擅詩: true,
            官: {
              銜: "翰林",
              年: "天寶元年"
            }
          }
        );
      });

      it("mixed object array", () => {
        食渾沌(
          escape`
          物
            之「名句」列
              物
                  之「題」言「清平調」
                  之「文」言「雲想衣裳花相容。春風拂檻露華濃。」
              也
              物
                  之「題」言「長相思」
                  之「文」言「長相思。在長安。絡緯秋啼金井闌。微霜淒淒簟色寒。」
              也
              物
                  之「題」言「襄陽歌」
                  之「文」言「落日欲沒峴山西。倒著接蘺花下迷。襄陽小兒齊拍手。攔街爭唱「白銅鞮」。」
              也
              物
                  之「題」言「楊叛兒」
                  之「文」言「烏啼隱楊花。君醉留妾家。博山爐中沉香火。雙煙一氣凌紫霞。」
              也
            也
            之「子女」列
                言「伯禽」言「平陽」言「頗黎」
            也
          也`,
          {
            名句: [
              {
                題: "清平調",
                文: "雲想衣裳花相容。春風拂檻露華濃。"
              },
              {
                題: "長相思",
                文: "長相思。在長安。絡緯秋啼金井闌。微霜淒淒簟色寒。"
              },
              {
                題: "襄陽歌",
                文:
                  "落日欲沒峴山西。倒著接蘺花下迷。襄陽小兒齊拍手。攔街爭唱「白銅鞮」。"
              },
              {
                題: "楊叛兒",
                文: "烏啼隱楊花。君醉留妾家。博山爐中沉香火。雙煙一氣凌紫霞。"
              }
            ],
            子女: ["伯禽", "平陽", "頗黎"]
          }
        );
      });
    });

    describe("arrays", () => {
      /* Top-level arrays is not yet supported
      it("empty array", () => {
        食渾沌("列也", []);
      });

      it("array of objects", () => {
        食渾沌("列 物也 物也 也", [{}, {}]);
      });
      */

      it("nested array", () => {
        食渾沌(
          escape`
          物
            之「名句」列
              列
                言「清平調」
                言「雲想衣裳花相容。春風拂檻露華濃。」
              也
              列
                言「長相思」
                言「長相思。在長安。絡緯秋啼金井闌。微霜淒淒簟色寒。」
              也
            也
          也`,
          {
            名句: [
              ["清平調", "雲想衣裳花相容。春風拂檻露華濃。"],
              ["長相思", "長相思。在長安。絡緯秋啼金井闌。微霜淒淒簟色寒。"]
            ]
          }
        );
      });
    });

    describe("dump", () => {
      it("empty", () => {
        包渾沌(JSON.stringify({}), "物也");
      });

      it("basic", () => {
        包渾沌(
          JSON.stringify({
            名: "李白",
            壽考: 61,
            擅詩: true,
            官: {
              銜: "翰林",
              年: "天寶元年"
            },
            子女: ["伯禽", "平陽", "頗黎"]
          }),
          `物
            之「名」 言「李白」
            之「壽考」數「六一」
            之「擅詩」爻「陽」
            之「官」物
              之「銜」言「翰林」
              之「年」言「天寶元年」
            也
            之「子女」列
              言「伯禽」
              言「平陽」
              言「頗黎」
            也
          也`
        );
      });
    });
  });
});