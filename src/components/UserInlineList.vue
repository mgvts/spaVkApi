<script lang=ts>
    import {defineComponent, PropType} from 'vue';
    import UserInline from "@/components/UserInline.vue";
    import {VkUser} from "@/api/types/vk";

    export default defineComponent({
        name: "UserInlineList",
        components: {UserInline},
        props: {
            users: {
                type: Object as PropType<VkUser[]>,
                default: []
            },
            canDelete: Boolean,
            grad: {
                type: Function,
                default: o => o
            },
            age: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            cssRuleImpl() {
                return {
                    backgroundColor: 'inherit'
                }
            }
        },
        data() {
            return {}
        }
    })
</script>

<template>
<div class="user-inline-list">
  <UserInline
    v-if="users.length > 0"
    :canDelete="canDelete"
    v-for="user in users"
    :grad="grad(user.sourceFriends?.length) || cssRuleImpl"
    :key="user.id"
    :user=user
    :ageFlag="age"
    @tap="u => $emit('tap', u)"
    @del="u => $emit('del', u)"
  />
  <div v-else>
    now here no users
  </div>
</div>
</template>

<style scoped>
.user-inline-list {
  height: 80vh;
}

.user-inline-list::-webkit-scrollbar {
  color: #48464c;
  display: block;
  width: 5px;
}

.user-inline-list::-webkit-scrollbar-thumb {
  border-radius: 2rem;
  background: #48464C;
}
</style>