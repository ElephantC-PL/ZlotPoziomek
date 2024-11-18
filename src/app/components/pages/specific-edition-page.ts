import { Section } from "../../models/page.model"

export const edition: Section = {
  name: "edition",
  sectionId: 1,
}

export const howToGet: Section = {
  name: "how-to-get",
  sectionId: 2,
}

export const specificEditionPage = {
  sections: [edition, howToGet]
}