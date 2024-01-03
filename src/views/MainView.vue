<script lang=ts>
    import {defineComponent} from 'vue';
    import Finder from "@/components/Finder.vue";

    export default defineComponent({
        name: "MainView",
        components: {Finder}
    })
</script>

<template>
<Finder/>
</template>

<style scoped>

</style>