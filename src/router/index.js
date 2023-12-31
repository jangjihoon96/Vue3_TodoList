import { createRouter, createWebHistory } from "vue-router";

// 연결할 각 컴포넌트 import (src/views폴더 아래 컴포넌트들 생성해둠)
import TabList from "../views/TabList";
import TabStet from "../views/TabStet";

// 라우터 설계
const routes = [
  { path: "/Vue3_Todolist_Deploy", component: TabList },
  { path: "/Vue3_Todolist_Deploy/stet", component: TabStet },
];

// 라우터 생성
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 라우터 추출 (main.js에서 import)
export { router };
