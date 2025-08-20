import Teek from "vitepress-theme-teek";
import TeekLayoutProvider from "./components/TeekLayoutProvider.vue";


// Teek 在线主题包引用（需安装 Teek 在线版本）
 import "vitepress-theme-teek/index.css";

import "./styles/code-bg.scss";
import "./styles/iframe.scss";

export default {
  extends: Teek,
  Layout: TeekLayoutProvider,
};
