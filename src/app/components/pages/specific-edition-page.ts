import { Section } from "../../models/page.model"

export const EDITION: Section = {
  name: "edition",
  sectionId: 1,
}

export const HOW_TO_GET: Section = {
  name: "how-to-get",
  sectionId: 2,
}

export const SPECIFIC_EDITION_PAGE = {
  sections: [EDITION, HOW_TO_GET]
}

export const VARIANTS = [1,2,3,4,5,6,7,8,9].reverse();