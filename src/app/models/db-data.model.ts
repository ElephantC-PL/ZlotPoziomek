export enum ContentType {
    SimpleText = 'simple-text',
    Color = 'color',
    Image = 'image',
    RichText = 'rich-text',
    HtmlWidget = 'html-widget',
    Collection = 'collection'
}

export interface SimpleText {
    id: number,    
    sectionId: number,
    versionId: number,
    location: string
    value?: string,
    createdAt: string,
    updatedAt: string
}

export interface Color {
    id: number,    
    sectionId: number,
    versionId: number,
    location: string
    value?: string,
    createdAt: string,
    updatedAt: string
}

export interface RichText {
    id: number,    
    sectionId: number,
    versionId: number,
    location: string
    value?: object|string,
    createdAt: string,
    updatedAt: string
}

export type Content = (SimpleText|Color|RichText);