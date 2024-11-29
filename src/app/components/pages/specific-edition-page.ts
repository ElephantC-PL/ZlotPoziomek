import { ContentType } from "../../services/db-data.service"

export interface Section { 
  sectionId: number
  type?: SectionType
}

export interface Page {
  sections: Section[]
} 

export enum SectionType {
  Normal = 'Normal',
  Banner = 'Banner'
}

export const BANNER: Section = {  
  sectionId: 1, 
  type: SectionType.Banner
}

export const EDITION: Section = {
  sectionId: 2,
}

export const HOW_TO_GET: Section = { 
  sectionId: 3,
}

export const SPECIFIC_EDITION_PAGE = {
  sections: [BANNER,EDITION, HOW_TO_GET]
}

export const VARIANTS = [1,2,3,4,5,6,7,8,9].reverse();

export const VARIANT_NAMES = ['','2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'];  

export const TYPES = [ContentType.SimpleText, ContentType.Color, ContentType.RichText, ContentType.Image, ContentType.File, ContentType.EmbedHtml];

export const SECTIONS = [1,2,3,4,5,6,7,8,9,10];