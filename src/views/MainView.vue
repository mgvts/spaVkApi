<script lang=ts>
    import {defineComponent, PropType, reactive, ref} from 'vue';
    import Finder from "@/views/Finder.vue";
    import SourceMain from "@/views/SourceMain.vue";
    import {VkMapUsers, VkUser} from "@/api/types/vk";
    import FriendsMain from "@/views/FriendsMain.vue";
    import UserPage from "@/views/UserPage.vue";

    export default defineComponent({
        name: "MainView",
        components: {Finder, SourceMain, FriendsMain, UserPage},
        data() {
            return {
                sourceUsers: [] as VkUser[],
                buildFlag: false,
                usersFriends: Object as PropType<VkMapUsers>,
                currentUser: null
            }
        },
        methods: {
            addUser(u: VkUser): void {
                this.sourceUsers.push(u)
            },
            buildUsers(): void {
                this.usersFriends = {}
                this.getFriends(this.sourceUsers)
            },
            getFriendsImpl(sourceUser: VkUser): void {
                // doesnt work if user have more then 5000 friends
                // todo friends_count
                (() => (VK.Api.call("friends.get", {
                    user_id: sourceUser.id,
                    fields: "nickname,photo_50,sex",
                    v: "5.199",
                }, (r) => {
                    this.updateFriends(sourceUser, r.response.items)
                })))()
            },
            getFriends(sourceUsers: VkUser[]): void {
                sourceUsers.forEach(u => this.getFriendsImpl(u))
            },
            updateFriends(source: VkUser, friends: VkUser[]) {
                friends.forEach(f => this.updateFriend(source, f))
            },
            updateFriend(source, friend) {
                // console.log(this.usersFriends)
                // here links on this task it doesn't matter
                if (this.usersFriends[friend.id]) {
                    console.log(friend)
                    this.usersFriends[friend.id]['sourceFriends'].push(source)
                }else {
                    this.usersFriends[friend.id] = friend
                    this.usersFriends[friend.id]['sourceFriends'] = [source]
                }
            }
        },
    })
</script>

<template>
<div v-if="currentUser">
  <UserPage :user="currentUser" @back="currentUser=null"/>
</div>
<div v-show="!currentUser">
  <div class="wrapper">
    <Finder @addUser="u => addUser(u)"/>
    <SourceMain :sourceUsers="sourceUsers" @build="buildUsers()" @chooseUser="u => (currentUser=u)"/>
    <FriendsMain v-if="usersFriends" :users="Object.values(usersFriends)" @unbuild="usersFriends=[]" @chooseUser="u => (currentUser=u)"/>
  </div>
</div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: row;
}
</style>