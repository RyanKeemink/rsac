import { defineType, defineField } from 'sanity';

export const gallery =  defineType({
  name: "gallerySection",
  title: "Fotogalerij Sectie",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
    }),
    defineField({
      name: "categories",
      title: "Categorieën",
      type: "array",
      of: [
        {
          name: "galleryCategory",
          title: "Categorie",
          type: "object",
          fields: [
            defineField({
              name: "key",
              title: "Unieke sleutel (bijv. 'klimweekenden')",
              type: "string",
            }),
            defineField({
              name: "label",
              title: "Knop label",
              type: "string",
            }),
            defineField({
              name: "images",
              title: "Foto's",
              type: "array",
              of: [{ type: "image", options: { hotspot: true } }],
            }),
            defineField({
              name: "description",
              title: "Beschrijving",
              type: "array",
              of: [{ type: "block" }],
            }),
          ],
        },
      ],
    }),
  ],
});