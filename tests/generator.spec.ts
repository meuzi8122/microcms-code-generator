import { CMSCodeGenerator } from "../src/generator";

const generator = new CMSCodeGenerator("./tests/data/blog");

describe("生成された自作型のチェック", () => {
    const nodes = generator.generateNodes();

    test("Image型が生成されること", () => {
        expect(nodes[0].name.escapedText).toEqual("Image");
    });

    test("Article型が生成されること", () => {
        expect(nodes[1].name.escapedText).toEqual("Article");
    });

    test("Category型が生成されること", () => {
        expect(nodes[2].name.escapedText).toEqual("Category");
    });

});
