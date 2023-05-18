import { PunctuationToken, SyntaxKind, factory } from "typescript";

export class QuestionTokenGenerator {

    static generate(): PunctuationToken<SyntaxKind.QuestionToken> {
        return factory.createToken(SyntaxKind.QuestionToken);
    }

}

