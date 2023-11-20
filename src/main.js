import { createApp } from "vue";
import App from "./App.vue";
import store from "./store.js";
import { router } from "./router/index.js";

const app = createApp(App);

app.use(router);
app.use(store).mount("#app");
