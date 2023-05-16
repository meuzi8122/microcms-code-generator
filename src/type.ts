export type Schema = {
    name: string;
    fields: Field[];
}

export type Field = {
    fieldId: string;
    name: string;
    kind: string,
    required?: boolean;
    selectedItems?: any[];
    multipleSelect?: boolean;
}