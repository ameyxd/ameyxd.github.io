import { defineConfig } from "tinacms";

export default defineConfig({
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || "",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  schema: {
    collections: [
      {
        name: "post",
        label: "Blog Posts",
        path: "content/posts",
        format: "mdx",
        ui: {
          filename: {
            readonly: true,
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "publishedAt",
            label: "Published Date",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "image",
            name: "image",
            label: "Cover Image",
          },
          {
            type: "number",
            name: "readingTime",
            label: "Reading Time (minutes)",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            templates: [
              {
                name: "CodeBlock",
                label: "Code Block",
                fields: [
                  {
                    name: "language",
                    label: "Language",
                    type: "string",
                    options: ["typescript", "javascript", "jsx", "tsx", "bash", "css", "json", "markdown"],
                  },
                  {
                    name: "code",
                    label: "Code",
                    type: "string",
                    ui: {
                      component: "textarea",
                    },
                  },
                ],
              },
              {
                name: "BlockQuote",
                label: "Block Quote",
                fields: [
                  {
                    name: "quote",
                    label: "Quote",
                    type: "string",
                    ui: {
                      component: "textarea",
                    },
                  },
                  {
                    name: "author",
                    label: "Author",
                    type: "string",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  media: {
    tina: {
      publicFolder: "public",
      mediaRoot: "images",
    },
  },
}); 