<script lang="ts">
    import {RouterView} from 'vue-router'
    import {defineComponent} from "vue";
    import axios from "axios";


    export default defineComponent({
        name: 'App',
        components: {RouterView},
        mounted() {
            VK.init({ apiId: import.meta.env.VITE_VK_ID });
        }
    })
</script>

<template>
<RouterView/>
</template>

<style scoped>
</style>
