<script lang="ts">
    import {RouterView} from 'vue-router'
    import {defineComponent} from "vue";
    import axios from "axios";

    const APP_ID = 51825366

    export default defineComponent({
        name: 'App',
        components: {RouterView},
        async beforeMount() {
            await VK.init({
                apiId: APP_ID
            });

            // ;(await VK.Auth.login(
            //     function (response) {
            //         console.log(response)
            //         if (response.session) {
            //             /* Пользователь успешно авторизовался */
            //             console.log("Пользователь успешно авторизовался")
            //             if (response.settings) {
            //                 /* Выбранные настройки доступа пользователя, если они были запрошены */
            //                 console.log("Выбранные настройки доступа пользователя, если они были запрошены")
            //                 console.log(response.settings)
            //             }
            //         } else {
            //             /* Пользователь нажал кнопку Отмена в окне авторизации */
            //             console.log("Пользователь нажал кнопку Отмена в окне авторизации")
            //         }
            //     },
            //     262_144 + 2))

            let q = await axios.post(`https://oauth.vk.com/authorize?` +
                `client_id=${APP_ID}&` +
                `display=popup` +
                `&redirect_uri= http://localhost:5173/` +
                `scope=${262_144 + 2}`
            )
            console.log(q)
        }
    })
</script>

<template>
<RouterView/>
</template>

<style scoped>
</style>
