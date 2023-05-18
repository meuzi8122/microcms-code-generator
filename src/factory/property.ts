import { KeywordTypeNode, PropertySignature, SyntaxKind, TypeReferenceNode, factory } from "typescript";
import { QuestionTokenGenerator } from "./token";

export class PropertyFactory {

    static node: KeywordTypeNode<any> = factory.createKeywordTypeNode(SyntaxKind.AnyKeyword);

    static generateProperty(name: string, required: boolean): PropertySignature {
        return factory.createPropertySignature(undefined, name, required ? undefined : QuestionTokenGenerator.generate(), this.node);
    }

    static generateArrayProperty(name: string, required: boolean): PropertySignature {
        return factory.createPropertySignature(undefined, name, required ? undefined : QuestionTokenGenerator.generate(), factory.createArrayTypeNode(this.node));
    }

}

export class StringPropertyFactory extends PropertyFactory {
    static node = factory.createKeywordTypeNode(SyntaxKind.StringKeyword);
}

export class NumberPropertyFactory extends PropertyFactory {
    static node = factory.createKeywordTypeNode(SyntaxKind.NumberKeyword);
}

export class BoolPropertyFactory extends PropertyFactory {
    static node = factory.createKeywordTypeNode(SyntaxKind.BooleanKeyword);
}

/* 以下はPropertyFactoryを継承しない */

/* aliasName → Article propertyName → article */

export class ReferencePropertyFactory {

    private static generateReferenceNode(aliasName: string): TypeReferenceNode {
        return factory.createTypeReferenceNode(factory.createIdentifier(aliasName), undefined);
    }

    static generateProperty(aliasName: string, propertyName: string, required: boolean): PropertySignature {
        return factory.createPropertySignature(undefined, propertyName, required ? undefined : QuestionTokenGenerator.generate(), this.generateReferenceNode(aliasName));
    }

    static generateArrayProperty(aliasName: string, propertyName: string, required: boolean): PropertySignature {
        return factory.createPropertySignature(undefined, propertyName, required ? undefined : QuestionTokenGenerator.generate(), factory.createArrayTypeNode(this.generateReferenceNode(aliasName)));
    }

}

