import { ContentType, ContentValue, FileValue, ImageValue, RichTextValue } from "./db-data.model";

export interface ArrayOfArrays { 
    [sectionId: number]: SectionData[];
}
  
export type SectionData = {type: ContentType, value: ContentValue};

export interface Message {
    id: number,
    text: string,
    isError?: boolean
}

export interface sectionDataToDisplay {
    string: string[],
    image: ImageValue[],
    richText: RichTextValue[],
    file: FileValue[]
}  