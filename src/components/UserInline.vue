<script lang=ts>
    import {defineComponent, PropType} from 'vue';
    import type {VkUser} from "@/api/types/vk";
    import {Sex} from "@/api/types/vk";

    export default defineComponent({
        name: "UserInline",
        props: {
            user: Object as PropType<VkUser>,
            canDelete: {
                type: Boolean,
                default: false
            },
            grad: Object
        },
        computed: {
          gradStyle() {
              return this.grad
          }
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
<div class="user-inline pointer" @click.prevent="tap" :style="gradStyle">
  <img :src="user.photo_50" alt=""/>
  <div class="info">
    <div class="first">{{ first }}</div>
    <div class="last">{{ last }}</div>
    <div class="sex">{{ sex }}</div>
  </div>
  <div v-if="canDelete"
       class="cross"
       @click.prevent="$emit('del', user)"
  >&#10005;
  </div>
</div>
</template>

<style scoped>
.user-inline {
  display: grid;
  grid-template-columns: 50px auto 20px;
  align-items: center;
  height: 70px;
  padding: 10px;
}

.user-inline:hover {
  transform: scale(1.1);
}

.info {
  display: flex;
  flex-direction: column;
}
</style>