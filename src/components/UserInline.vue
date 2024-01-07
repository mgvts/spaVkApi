<script lang=ts>
    import {defineComponent, PropType} from 'vue';
    import  type { VkUser } from "@/api/types/vk";
    import {Sex} from "@/api/types/vk";

    export default defineComponent({
        name: "UserInline",
        props: {
            user: Object as PropType<VkUser>,
        },
        data() {
            return {
                first: this.user.first_name,
                last: this.user.last_name,
                sex: Sex[this.user.sex],
            }
        },
        methods: {
            tap() {
                this.$emit('tap', this.user)
            }
        }
    })
</script>

<template>
<div class="user-inline pointer" @click.prevent="tap">
  <img :src="user.photo_50" alt=""/>
  <div class="info">
    <div class="first">{{ first }}</div>
    <div class="last">{{ last }}</div>
    <div class="sex">{{ sex }}</div>
    <div >{{ user.id }}</div>
    <div v-if="user.sourceFriends"> {{ user.sourceFriends.length }}</div>
  </div>
</div>
</template>

<style scoped>
.user-inline {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 70px;
  border: 1px solid red;
  padding: 10px;
}

.info {
  display: flex;
  flex-direction: column;
}
</style>