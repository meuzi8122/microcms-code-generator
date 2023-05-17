import * as fs from "fs";
import { ListFormat, NodeArray, ScriptTarget, TypeAliasDeclaration, createPrinter, createSourceFile, factory } from "typescript";
import { CustomAliasFactory, ImageAlias } from "./factory/alias";
import { BoolPropertyFactory, NumberPropertyFactory, PropertyFactory, ReferencePropertyFactory, StringPropertyFactory } from "./factory/property";
import type { Schema } from "./type";

const pluralize = require("pluralize");

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

    private getRelatedSchemaName(fieldId: string): string | null {
        const schema = this.schemas.find(schema => schema.name === fieldId.charAt(0).toUpperCase() + fieldId.slice(1).toLowerCase());
        return schema ? schema.name : null;
    }

    private generateAlias(schema: Schema): TypeAliasDeclaration {
        const properties = schema.fields.map(field => {
            if (field.kind === "number") {
                return NumberPropertyFactory.generateProperty(field.fieldId, Boolean(field.required));
            } else if (field.kind === "boolean") {
                return BoolPropertyFactory.generateProperty(field.fieldId, Boolean(field.required));
            } else if (["text", "textArea"].includes(field.kind)) {   // TODO: リッチテキストエディタ
                return StringPropertyFactory.generateProperty(field.fieldId, Boolean(field.required));
            } else if (field.kind === "image") {
                return ReferencePropertyFactory.generateProperty("Image", field.fieldId, Boolean(field.required));
            } else if (field.kind === "relation") {
                const relatedSchemaName = this.getRelatedSchemaName(field.fieldId);
                return relatedSchemaName ? ReferencePropertyFactory.generateProperty(relatedSchemaName, field.fieldId, Boolean(field.required)) : PropertyFactory.generateProperty(field.fieldId, Boolean(field.required));
            } else if (field.kind === "relationList") {
                /* 複数形を単数形に変換 */
                const relatedSchemaName = this.getRelatedSchemaName(pluralize(field.fieldId, 1));
                return relatedSchemaName ? ReferencePropertyFactory.generateArrayProperty(relatedSchemaName, field.fieldId, Boolean(field.required)) : PropertyFactory.generateProperty(field.fieldId, Boolean(field.required));
            } else {
                return PropertyFactory.generateProperty(field.fieldId, Boolean(field.required));
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