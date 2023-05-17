import { KeywordTypeNode, PropertySignature, SyntaxKind, TypeReferenceNode, factory } from "typescript";

export class PropertyFactory {

    static node: KeywordTypeNode<any> = factory.createKeywordTypeNode(SyntaxKind.AnyKeyword);

    static generateProperty(name: string): PropertySignature {
        return factory.createPropertySignature(undefined, name, undefined, this.node);
    }

    static generateArrayProperty(name: string): PropertySignature {
        return factory.createPropertySignature(undefined, name, undefined, factory.createArrayTypeNode(this.node));
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

/* aliasName → Article propertyName → article */

export class ReferencePropertyFactory {
    private static generateReferenceNode(aliasName: string): TypeReferenceNode {
        return factory.createTypeReferenceNode(factory.createIdentifier(aliasName), undefined);
    }

    static generateProperty(aliasName: string, propertyName: string): PropertySignature {
        return factory.createPropertySignature(undefined, propertyName, undefined, this.generateReferenceNode(aliasName));
    }

    static generateArrayProperty(aliasName: string, propertyName: string): PropertySignature {
        return factory.createPropertySignature(undefined, propertyName, undefined, factory.createArrayTypeNode(this.generateReferenceNode(aliasName)));
    }
}

