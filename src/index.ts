import * as fs from "fs";
import { CMSCodeGenerator } from "./generator";

const generator = new CMSCodeGenerator("../blog");
const code = generator.generateCode();

fs.writeFile("../type.ts", code, (error) => {
    if (error) {
        console.log(error);
    }
});