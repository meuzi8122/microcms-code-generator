import * as fs from "fs";
import { ListFormat, NodeArray, ScriptTarget, TypeAliasDeclaration, createPrinter, createSourceFile, factory } from "typescript";
import { CustomAliasFactory, ImageAlias } from "./factory/alias";
import { AnyPropertyFactory, BoolPropertyFactory, NumberPropertyFactory, ReferencePropertyFactory, StringPropertyFactory } from "./factory/property";
import type { Schema } from "./type";

const printer = createPrinter();


export class CMSCodeGenerator {

    private schemas: Schema[];

    constructor(schemaDirName: string) {
        this.schemas = this.loadSchemas(schemaDirName);
    }

    private loadSchemas(schemaDirName: string): Schema[] {
        const schemaFiles = fs.readdirSync(schemaDirName);

        return schemaFiles.map(schemaFileName => ({
            name: schemaFileName.replace(".json", ""),
            fields: JSON.parse(fs.readFileSync(`${schemaDirName}/${schemaFileName}`, "utf-8")).apiFields
        }));

    }

    private generateAlias(schema: Schema): TypeAliasDeclaration {
        const properties = schema.fields.map(field => {
            if (field.kind === "number") {
                return NumberPropertyFactory.generate(field.fieldId);
            } else if (field.kind === "boolean") {
                return BoolPropertyFactory.generate(field.fieldId);
            } else if (["text", "textArea"].includes(field.kind)) {   // TODO: リッチテキストエディタ
                return StringPropertyFactory.generate(field.fieldId);
            } else if (field.kind === "image") {
                return ReferencePropertyFactory.generate("Image", field.fieldId);
            } else if (field.kind === "relation") {
                const relation = this.schemas.find(schema => schema.name === field.fieldId.charAt(0).toUpperCase() + field.fieldId.slice(1).toLowerCase());
                return relation ? ReferencePropertyFactory.generate(relation.name, field.fieldId) : AnyPropertyFactory.generate(field.fieldId);
            } else {
                return AnyPropertyFactory.generate(field.fieldId);
            }
        });

        return CustomAliasFactory.generate(schema.name, properties);
    }

    generateNodes(): NodeArray<TypeAliasDeclaration> {
        return factory.createNodeArray([ImageAlias, ...this.schemas.map(schema => this.generateAlias(schema))]);
    }

    generateCode(): string {
        return printer.printList(
            ListFormat.MultiLine,
            this.generateNodes(),
            createSourceFile("", "", ScriptTarget.ESNext, true)
        );
    }

}