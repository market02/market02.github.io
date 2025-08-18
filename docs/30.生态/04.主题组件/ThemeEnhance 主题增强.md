---
title: ThemeEnhance 主题增强 <Badge type="tip" text="v1.1.0" />
date: 2025-04-29 02:41:47
permalink: /ecosystem/components/theme-enhance
categories:
  - 生态
  - 主题组件
tags:
  - 生态
  - 主题组件
---

使用文章分析组件，可以获取文章的创建时间、字数、阅读时间、访问量等信息。

## 基础使用

```ts
import DefaultTheme from "vitepress/theme";
import { TkThemeEnhance, teekConfigContext } from "vitepress-theme-teek";
import { h } from "vue";

provide(teekConfigContext, {
  themeEnhance: {
    // ... 更多配置请看配置系列文章
  },
});

export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      "nav-bar-content-after": () => h(TkThemeEnhance),
    }),
};
```
