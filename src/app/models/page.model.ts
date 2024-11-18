export interface Section {
    name: string,
    sectionId: number
}
  
export interface Page {
    sections: Section[]
} 
  