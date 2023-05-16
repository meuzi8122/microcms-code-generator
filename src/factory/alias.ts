import { PropertySignature, TypeAliasDeclaration, factory } from "typescript";
import { NumberPropertyFactory, StringPropertyFactory } from "./property";


export class CustomAliasFactory {

    static generate(name: string, properties: PropertySignature[]): TypeAliasDeclaration {
        return factory.createTypeAliasDeclaration(
            undefined,
            name,
            undefined,
            factory.createTypeLiteralNode(properties)
        );
    }

}


export const ImageAlias = CustomAliasFactory.generate("Image", [
    StringPropertyFactory.generate("url"),
    NumberPropertyFactory.generate("width"), // TODO: optional
    NumberPropertyFactory.generate("height") // TODO: optional
]);
