import { defineType, defineField } from 'sanity';

export const sponsors =  defineType({
  name: "sponsorenSection",
  title: "Sponsoren sectie",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
    }),
    defineField({
      name: "sponsoren",
      title: "Sponsoren",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "type",
              title: "Type",
              type: "string",
              options: {
                list: [
                  { title: "Logo met link", value: "logo" },
                  { title: "Iframe", value: "iframe" },
                ],
                layout: "radio",
              },
              initialValue: "logo",
            },
            // Voor logo met link
            { name: "naam", title: "Naam", type: "string" },
            { name: "logo", title: "Logo", type: "image", options: { hotspot: true } },
            { name: "url", title: "Link", type: "url" },
            // Voor iframe
            { name: "iframeSrc", title: "Iframe src", type: "url" },
            { name: "iframeTitle", title: "Iframe titel", type: "string" },
          ],
        },
      ],
    }),
  ],
});