import { defineConfig } from "vitepress";
import llmstxt from "vitepress-plugin-llms";

// Teek 在线主题包引用（需安装 Teek 在线版本）
import { defineTeekConfig } from "vitepress-theme-teek/config";
import { version } from "vitepress-theme-teek/es/version";

const description = [
  "欢迎来到 80fafa 使用文档",
  "80fafa 是一个助于知识分享、内容变现的取码平台",
  "80fafa 拥有三种典型的业务: 为内容分享者加密并发码，为终端用户支付并取码，提供结算变现",
].toString();

const teekConfig = defineTeekConfig({
  sidebarTrigger: true,
  author: { name: "Teeker", link: "https://github.com/Kele-Bingtang" },
  blogger: {
    avatar:
      "https://testingcf.jsdelivr.net/gh/Kele-Bingtang/static/user/avatar1.png",
    shape: "circle-rotate",
    name: "80fafa",
    slogan: "让知识变现更容易！",
    circleBgImg: "/blog/bg4.webp",
    color: "#ffffff",
  },
  footerInfo: {
    theme: {
      name: `Theme By Teek@${version}`,
    },
    copyright: {
      createYear: 2025,
      suffix: "80fafa",
    },
  },
  codeBlock: {
    copiedDone: (TkMessage) => TkMessage.success("复制成功！"),
  },
  post: {
    showCapture: true,
  },
  articleShare: { enabled: true },
  vitePlugins: {
    sidebarOption: {
      initItems: false,
    },
  },
  markdown: {
    demo: {
      githubUrl: "https://market02.github.io/blob/master/docs",
    },
  },
  siteAnalytics: [
    {
      provider: "baidu",
      options: {
        id: "d5ee872d9aa1ef8021f4a3921b2e9c2a",
      },
    },
    {
      provider: "google",
      options: {
        id: "G-K5GNDW3L7K",
      },
    },
  ],
});

// https://vitepress.dev/reference/site-config
export default defineConfig({
  extends: teekConfig,
  title: "80fafa - 帮您发发",
  description: description,
  cleanUrls: false,
  lastUpdated: true,
  lang: "zh-CN",
  // 添加 srcExclude 配置
  

  head: [
    [
      "link",
      { rel: "icon", type: "image/svg+xml", href: "/teek-logo-mini.svg" },
    ],
    ["link", { rel: "icon", type: "image/png", href: "/teek-logo-mini.png" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:locale", content: "zh-CN" }],
    ["meta", { property: "og:title", content: "80fafa | 帮您发发" }],
    ["meta", { property: "og:site_name", content: "Teek" }],
    ["meta", { property: "og:image", content: "" }],
    ["meta", { property: "og:url", content: "" }],
    ["meta", { property: "og:description", description }],
    ["meta", { name: "description", description }],
    ["meta", { name: "author", content: "Teek" }],
    // 禁止浏览器缩放
    // [
    //   "meta",
    //   {
    //     name: "viewport",
    //     content: "width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no",
    //   },
    // ],
    ["meta", { name: "keywords", description }],
    ["meta", { name: "baidu-site-verification", content: "codeva-GdK2q9MO1i" }], // 百度收录
    [
      "meta",
      { name: "msvalidate.01", content: "48CABE70F538B8D117567176ABF325AF" },
    ], // Bing 收录验证
    [
      "script",
      {
        charset: "UTF-8",
        id: "LA_COLLECT",
        src: "//sdk.51.la/js-sdk-pro.min.js",
      },
    ], // 51.la
    [
      "script",
      {},
      `typeof LA !== 'undefined' && LA.init({ id: "3LqfP8Icg0GeEvtn", ck: "3LqfP8Icg0GeEvtn", hashMode: true })`,
    ], // 51.la
  ],
  markdown: {
    // 开启行号
    lineNumbers: true,
    image: {
      // 默认禁用；设置为 true 可为所有图片启用懒加载。
      lazyLoading: true,
    },
    // 更改容器默认值标题
    container: {
      tipLabel: "提示",
      warningLabel: "警告",
      dangerLabel: "危险",
      infoLabel: "信息",
      detailsLabel: "详细信息",
    },
  },
  sitemap: {
    hostname: "http://doc.80fafa.com",
    transformItems: (items) => {
      const permalinkItemBak: typeof items = [];
      // 使用永久链接生成 sitemap
      const permalinks = (globalThis as any).VITEPRESS_CONFIG.site.themeConfig
        .permalinks;
      items.forEach((item) => {
        const permalink = permalinks?.map[item.url];
        if (permalink)
          permalinkItemBak.push({ url: permalink, lastmod: item.lastmod });
      });
      return [...items, ...permalinkItemBak];
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/teek-logo-mini.svg",
    darkModeSwitchLabel: "主题",
    sidebarMenuLabel: "菜单",
    returnToTopLabel: "返回顶部",
    lastUpdatedText: "上次更新时间",
    outline: {
      level: [2, 4],
      label: "本页导航",
    },
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    nav: [
      { text: "首页", link: "/" },
      // {
      //   text: "80fafa指南",
      //   link: "/guide/intro",
      //   activeMatch: "/01.指南/",
      // },
      // { text: "80fafa API", link: "/15.API/10.主题配置", activeMatch: "/15.API/" },
      // { text: "Moni", link: "/25.Moni/01.使用方法", activeMatch: "/25.Moni/" },
      {
        text: "80fafa指南",
        items: [
          {
            text: "简介",
            link: "/01.80fafa指南/01.简介/01.简介",
            activeMatch: "/01.80fafa指南/01.简介/01.简介",
          },
          {
            text: "分享者操作",
            link: "/01.80fafa指南/10.分享者操作/10.发布商品",
            activeMatch: "/01.80fafa指南/10.分享者操作/10.发布商品",
          },
          {
            text: "终端用户操作",
            link: "/01.80fafa指南/20.终端用户操作/02.扫码取码",
            activeMatch: "/01.80fafa指南/20.终端用户操作/02.扫码取码",
          },
        ],
      },
      {
        text: "80fafa API",
        items: [
          {
            text: "API介绍",
            link: "/15.80fafa API/01.API介绍/01.登录API介绍",
            activeMatch: "/15.80fafa API/01.API介绍/01.登录API介绍",
          },
          {
            text: "API使用方法",
            link: "/15.80fafa API/10.API使用方法/01.API使用方法1",
            activeMatch: "/15.80fafa API/10.API使用方法/01.API使用方法1",
          },
        ],
      },
      {
        text: "Moni介绍",
        items: [
          {
            text: "快速了解",
            link: "/25.Moni介绍/01.快速了解",
            activeMatch: "/25.Moni介绍/01.快速了解/",
          },
          {
            text: "使用方法",
            link: "/25.Moni介绍/05.使用方法",
            activeMatch: "/25.Moni介绍/05.使用方法/",
          },
          {
            text: "应用场景",
            link: "/25.Moni介绍/10.应用场景",
            activeMatch: "/25.Moni介绍/10.应用场景/",
          },
        ],
      },
      {
        text: "Stopnet介绍",
        items: [
          {
            text: "快速了解",
            link: "/30.Stopnet介绍/01.快速了解",
            activeMatch: "/30.Stopnet介绍/01.快速了解/",
          },
          {
            text: "使用方法",
            link: "/30.Stopnet介绍/05.使用方法",
            activeMatch: "/30.Stopnet介绍/05.使用方法/",
          },
          {
            text: "应用场景",
            link: "/30.Stopnet介绍/10.应用场景",
            activeMatch: "/30.Stopnet介绍/10.应用场景/",
          },
        ],
      },
      {
        text: "资源",
        items: [
          {
            text: "网盘推荐",
            link: "/20.资源/01.网盘推荐",
            activeMatch: "/20.资源/01.网盘推荐/",
          },
          {
            text: "资源分享平台",
            link: "/20.资源/05.资源分享平台",
            activeMatch: "/resource/share/",
          },
        ],
      },
      {
        text: "功能页",
        items: [
          { text: "归档页", link: "/archives" },
          { text: "清单页", link: "/articleOverview" },
          { text: "登录页", link: "/login" },
          {
            text: "风险链接提示页",
            link: "/risk-link?target=http://doc.80fafa.com",
          },
          { text: "分类页", link: "/categories" },
          { text: "标签页", link: "/tags" },
        ],
      },
    ],
    socialLinks: [{ icon: "github", link: "https://market02.github.io/" }],
    search: {
      provider: "algolia",
      options: {
        appId: "2LFTZ9LKO9",
        apiKey: "017332fa7dc0bbe5e1637b215f92a5d1",
        indexName: "vitepress_theme_teek",
      },
    },
    editLink: {
      text: "在 GitHub 上编辑此页",
      pattern: "https://market02.github.io/edit/master/docs/:path",
    }, 
  },
  vite: {
    plugins: [llmstxt() as any],
  },
  // transformHtml: (code, id, context) => {
  //   if (context.page !== "404.md") return code;
  //   return code.replace("404 | ", "");
  // },
});
