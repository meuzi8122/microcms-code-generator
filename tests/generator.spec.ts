import { CMSCodeGenerator } from "../src/generator";

const generator = new CMSCodeGenerator("./tests/data/blog");

describe("", () => {

    test("", () => {
        expect(generator.generateCode()).toEqual(`
            type Image = {
                url: string;
                width: number;
                height: number;
            }
            type Article = {
                id: number;
                title: string;
                title: string;
                category: any;
                image: Image;
            };
            type Category = {
                id: number;
                name: string;
            };
        `);
    });

});
