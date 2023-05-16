import { PropertySignature, SyntaxKind, factory } from "typescript";

export class StringPropertyFactory {
    static generate(name: string): PropertySignature {
        return factory.createPropertySignature(undefined, name, undefined, factory.createKeywordTypeNode(SyntaxKind.StringKeyword));
    }
}

export class NumberPropertyFactory {
    static generate(name: string): PropertySignature {
        return factory.createPropertySignature(undefined, name, undefined, factory.createKeywordTypeNode(SyntaxKind.NumberKeyword));
    }
}

export class BoolPropertyFactory {
    static generate(name: string): PropertySignature {
        return factory.createPropertySignature(undefined, name, undefined, factory.createKeywordTypeNode(SyntaxKind.BooleanKeyword));
    }
}

export class AnyPropertyFactory {
    static generate(name: string): PropertySignature {
        return factory.createPropertySignature(undefined, name, undefined, factory.createKeywordTypeNode(SyntaxKind.AnyKeyword));
    }
}


/* aliasName → Article propertyName → article */

export class ReferencePropertyFactory {
    static generate(aliasName: string, propertyName: string): PropertySignature {
        const node = factory.createTypeReferenceNode(factory.createIdentifier(aliasName), undefined);
        return factory.createPropertySignature(undefined, propertyName, undefined, node);
    }
}

