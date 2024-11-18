import type DeltaType from 'quill-delta';

export enum ContentType {
    SimpleText = 'simple-text',
    Color = 'color',
    Image = 'image',
    RichText = 'rich-text',
    File = 'file',
    HtmlWidget = 'html-widget',
    Collection = 'collection'
}

export interface Content {
    id: number,    
    sectionId: number,
    statusId: number,
    variantId: number,
    locationId: number,   
    value?: ContentValue,
    createdAt: string,
    updatedAt: string,
    type?: ContentType
}

export interface ImageValue {
    width: number,
    height: number,
    fileName: string,
    alt: string,
}

export interface FileValue {    
    fileName: string,
    linkText: string,
}

export type RichTextValue = DeltaType;

export type ContentValue = (string|RichTextValue|ImageValue|FileValue);

export const VariantNames = ['','2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'];  