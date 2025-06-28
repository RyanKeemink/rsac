import { defineType, defineField } from 'sanity'

export const hero = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({
      name: "logoImage",
      title: "Logo Afbeelding",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "taglines",
      title: "Taglines (lijst)",
      type: "array",
      of: [{ type: "string" }],
      description: "Bijvoorbeeld: ['klimmen', 'boulderen', 'alpineren']",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Afbeelding",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "infoSection",
      title: "Informatie sectie",
      type: "array",
      of: [{ type: "block" }],
      description: "Tekst voor de informatiesectie op de homepage",
    }),
  ],
});
