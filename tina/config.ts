import { defineConfig } from "tinacms";
import { photoBandSchema } from "../src/components/bands/photo";
import { textBandSchema } from "../src/components/bands/text";

// Your hosting provider likely exposes this as an environment variable
// const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch:"master",
  clientId: "494cca97-cb62-41a9-ab80-f79d981e8a6f", // Get this from tina.io
  token: "ce2d587cce14f26a83c2bdb54603d1928006284c", // Get this from tina.io

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "siteConfig",
        label: "Site Settings",
        path: "src/content/site-settings",
        format:'json',
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
          filename: {
            readonly: true,
          },
          global: true,
        },
        fields: [
          {
            type: "string",
            name: "siteTitle",
            label: "Website title",
          },
        ],
      },
      {
        name: "page",
        label: "Pages",
        path: "src/content/pages/",
        format:'mdx',
        ui: {
          filename: {
            slugify: values => {
              return `${values?.title?.toLowerCase().replace(/[^a-zA-Z\d_\-\s]/g, '').replace(/\s/g, '-',)}`
            },
          },
          router: ({ document }) => {
            return "/" + document._sys.filename;
          },
        },
        fields: [
          {
            type: "string",
            label: "Title",
            name: "title",
            description: "The title of the page.",
            isTitle: true,
            required: true,
          },
          {
            type: "object",
            list: true,
            name: "bands",
            label: "Page Sections",
            ui: {
              visualSelector: true,
            },
            templates: [
              // add templates here
              photoBandSchema,
              textBandSchema,
            ],
          },
        ],
      },
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },

  search: {
    tina: {
      indexerToken: '86cc5b92c765fd2689f850be3d816b5ac2cb6d80',
      stopwordLanguages: ['eng']
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100
  },

});
