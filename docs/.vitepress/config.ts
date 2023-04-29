import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Hi",
  description: "welcome",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "博客", link: "/blog/frontend/typescript" },
    ],
    search: {
      provider: "local",
    },
    sidebar: {
      "/blog": [
        {
          text: "前端",
          items: [
            {
              text: "typescript",
              link: "/blog/frontend/typescript",
            },
            {
              text: "基础知识",
              link: "/blog/frontend/base",
            },
            {
              text: "设计模式",
              link: "/blog/frontend/design-mode",
            },
            {
              text: "设计原则",
              link: "/blog/frontend/design-principle",
            },
            {
              text: "烟花效果",
              link: "/blog/frontend/fireworks",
            },
          ],
        },
        {
          text: "后端",
          items: [
            {
              text: "第一篇",
              link: "/blog/backend/index",
            },
          ],
        },
        {
          text: "随便看看",
          items: [
            {
              text: "聪明的投资者",
              link: "/blog/other/聪明的投资者",
            },
            {
              text: "影响力",
              link: "/blog/other/影响力",
            },
            {
              text: "优势谈判",
              link: "/blog/other/优势谈判",
            },
            {
              text: "原则",
              link: "/blog/other/原则",
            },
          ],
        },
      ],
    },

    socialLinks: [{ icon: "github", link: "https://github.com/journey0726" }],
  },
});
