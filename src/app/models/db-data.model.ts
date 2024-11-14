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
    versionId: number,
    locationId: number,   
    value?: ContentValue,
    createdAt: string,
    updatedAt: string
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