<script lang=ts>
    import {CSSProperties, defineComponent, PropType} from 'vue';
    import {VkUser} from "@/api/types/vk";
    import UserInline from "@/components/UserInline.vue";
    import * as _ from "lodash"
    import UserInlineList from "@/components/UserInlineList.vue";
    import {gradRed2Green} from "@/api/utils/util";

    export default defineComponent({
        name: "FriendsMain",
        components: {UserInline, UserInlineList},
        props: {
            users: {
                type: Object as PropType<VkUser[]>,
                require: true
            },
            totalSource: Number,
            alreadyLoad: Number,
            nowLoadUser: String
        },
        computed: {
            orderedUsers: function (): VkUser[] {
                let orderByName = _.orderBy(this.users, 'first_name')
                return _.orderBy(orderByName, 'last_name')
            }
        },
        data() {
            return {}
        },
        methods: {
            gradFunc(friendsCount: number): CSSProperties {
                return {
                    backgroundColor: gradRed2Green(friendsCount / this.totalSource)
                } as CSSProperties
            }
        },
    })
</script>

<template>
<div class="friends-page">
  <div class="header">
    <div> source friends</div>
    <div> already load {{ alreadyLoad }}/{{ Object.values(users).length }}</div>
    <div>now loading:{{ nowLoadUser }}</div>
  </div>
  <UserInlineList
    :age="true"
    :grad="gradFunc"
    :users="orderedUsers"
    @tap="u => $emit('chooseUser', u)"
  />
</div>

</template>

<style scoped>
.friends-page {
  gap: 1rem;
  display: flex;
  flex-direction: column;

}
</style>