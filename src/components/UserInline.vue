<script lang=ts>
    import {defineComponent, PropType} from 'vue';
    import type {VkUser} from "@/api/types/vk";
    import {Sex} from "@/api/types/vk";
    import {countAge} from "@/api/utils/util";

    export default defineComponent({
        name: "UserInline",
        props: {
            user: Object as PropType<VkUser>,
            canDelete: {
                type: Boolean,
                default: false
            },
            grad: Object,
            ageFlag: {
                type: Boolean,
                default: false
            }
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
                age: this.ageFlag ? countAge(this.user.bdate) : null,
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
    <div v-if="ageFlag && age">{{ age }}</div>
    <div v-if="this.user.friends_count"> total friends: {{ this.user.friends_count }}</div>
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