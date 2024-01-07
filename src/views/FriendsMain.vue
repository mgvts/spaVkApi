<script lang=ts>
    import {defineComponent, PropType} from 'vue';
    import {VkUser} from "@/api/types/vk";
    import UserInline from "@/components/UserInline.vue";
    import * as _ from "lodash"
    import UserInlineList from "@/components/UserInlineList.vue";

    export default defineComponent({
        name: "FriendsMain",
        components: {UserInline, UserInlineList},
        computed: {
            orderedUsers: function (): VkUser[] {
                let orderByName = _.orderBy(this.users, 'first_name')
                return _.orderBy(orderByName, 'last_name')
            }
        },
        props: {
            users: {
                type: [] as PropType<VkUser[]>,
                require: true
            }
        },
        data() {
            return {}
        },
        methods: {},
    })
</script>

<template>
<div>
  <button @click.prevent="$emit('unbuild')">back</button>
  <UserInlineList
    :users="orderedUsers"
    @tap="u => $emit('chooseUser', u)"
  />
</div>

</template>

<style scoped>

</style>