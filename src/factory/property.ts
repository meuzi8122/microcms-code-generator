import { KeywordTypeNode, PropertySignature, PunctuationToken, SyntaxKind, TypeReferenceNode, factory } from "typescript";

export class PropertyFactory {

    static node: KeywordTypeNode<any> = factory.createKeywordTypeNode(SyntaxKind.AnyKeyword);

    private static generateQuestionToken(required: boolean): PunctuationToken<SyntaxKind.QuestionToken> | undefined {
        return required ? undefined : factory.createToken(SyntaxKind.QuestionToken);
    }

    static generateProperty(name: string, required: boolean): PropertySignature {
        return factory.createPropertySignature(undefined, name, this.generateQuestionToken(required), this.node);
    }

    static generateArrayProperty(name: string, required: boolean): PropertySignature {
        return factory.createPropertySignature(undefined, name, this.generateQuestionToken(required), factory.createArrayTypeNode(this.node));
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
    private static generateQuestionToken(required: boolean): PunctuationToken<SyntaxKind.QuestionToken> | undefined {
        return required ? undefined : factory.createToken(SyntaxKind.QuestionToken);
    }

    private static generateReferenceNode(aliasName: string): TypeReferenceNode {
        return factory.createTypeReferenceNode(factory.createIdentifier(aliasName), undefined);
    }

    static generateProperty(aliasName: string, propertyName: string, required: boolean): PropertySignature {
        return factory.createPropertySignature(undefined, propertyName, this.generateQuestionToken(required), this.generateReferenceNode(aliasName));
    }

    static generateArrayProperty(aliasName: string, propertyName: string, required: boolean): PropertySignature {
        return factory.createPropertySignature(undefined, propertyName, this.generateQuestionToken(required), factory.createArrayTypeNode(this.generateReferenceNode(aliasName)));
    }
}

