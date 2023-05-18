import { PropertySignature, TypeAliasDeclaration, factory } from "typescript";
import { NumberPropertyFactory, PropertyFactory, StringPropertyFactory } from "./property";


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


export const DomainValueAlias = CustomAliasFactory.generate("DomainValue", [
    StringPropertyFactory.generateProperty("id", true),
    PropertyFactory.generateProperty("value", true),
]);


export const ImageAlias = CustomAliasFactory.generate("Image", [
    StringPropertyFactory.generateProperty("url", true),
    NumberPropertyFactory.generateProperty("width", true),
    NumberPropertyFactory.generateProperty("height", true)
]);