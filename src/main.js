import { createApp } from "vue";
import App from "./App.vue";
import store from "./store.js";
import { router } from "./router/index.js";
import VueApexCharts from "vue3-apexcharts";

const app = createApp(App);

app.use(router);
app.use(store).use(VueApexCharts).mount("#app");
