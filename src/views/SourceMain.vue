<script lang=ts>
    import {defineComponent, PropType, ref, Ref} from 'vue';
    import {VkUser} from "@/api/types/vk";
    import UserInline from "@/components/UserInline.vue";
    import UserInlineList from "@/components/UserInlineList.vue";

    export default defineComponent({
        name: "SourceMain",
        components: {UserInlineList, UserInline},
        props: {
            sourceUsers: [] as PropType<VkUser[]>
        },
        data() {
            return {}
        },
    })
</script>

<template>
<div class="source-list">
  <div>source</div>
  <UserInlineList
    :users="sourceUsers"
    @tap="u => $emit('chooseUser', u)"
  />
  <button @click.prevent="$emit('build')">построить</button>
</div>
</template>

<style scoped>
.source-list {
  display: flex;
  flex-direction: column;
}
</style>