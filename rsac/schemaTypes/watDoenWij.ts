import { defineType, defineField } from 'sanity';

export const watDoenWij =  defineType({
  name: "watDoenWijSection",
  title: "Wat doen wij sectie",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
    }),
    defineField({
      name: "activiteiten",
      title: "Activiteiten",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "naam", title: "Naam", type: "string" },
            { name: "beschrijving", title: "Beschrijving", type: "text" },
            { name: "afbeelding", title: "Afbeelding", type: "image", options: { hotspot: true } },
          ],
        },
      ],
    }),
  ],
});