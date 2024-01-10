<script lang=ts>
    import {defineComponent, PropType, ref, Ref} from 'vue';
    import {VkUser} from "@/api/types/vk";
    import UserInline from "@/components/UserInline.vue";
    import UserInlineList from "@/components/UserInlineList.vue";

    export default defineComponent({
        name: "SourceMain",
        components: {UserInlineList, UserInline},
        props: {
            sourceUsers: {
                type: Object as PropType<VkUser[]>
            }
        },
        data() {
            return {}
        },
    })
</script>

<template>
<div class="source-list">
  <div class="header">
    <div>source</div>
  </div>
  <UserInlineList
    :canDelete="true"
    :users="sourceUsers"
    @tap="u => $emit('chooseUser', u)"
    @del="u => $emit('delSource', u)"
  />
  <button @click.prevent="$emit('build')">построить</button>
</div>
</template>

<style scoped>
.source-list {
  gap: 1rem;
  display: flex;
  flex-direction: column;
}
</style>