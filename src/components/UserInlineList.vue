<script lang=ts>
    import {defineComponent, PropType} from 'vue';
    import UserInline from "@/components/UserInline.vue";
    import {VkUser} from "@/api/types/vk";

    export default defineComponent({
        name: "UserInlineList",
        components: {UserInline},
        props: {
            users: [] as PropType<VkUser[]>
        }
    })
</script>

<template>
<div>
  <UserInline
    v-for="user in users"
    :key="user.id"
    :user=user
    @tap="u => $emit('tap', u)"
  />
</div>
</template>

<style scoped>

</style>