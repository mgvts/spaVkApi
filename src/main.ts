import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
const app = createApp(App)

app.use(router)

app.mount('#app')

import * as VKID from '@vkid/sdk';


VKID.Config.set({
    app: 51825362,                                       // Идентификатор приложения.
    redirectUrl: "https://mgvts.github.io/spa_vk_api/", // Адрес для перехода после авторизации.
});