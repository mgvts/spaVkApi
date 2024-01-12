<script lang=ts>
    import {defineComponent, PropType} from 'vue';
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
                sourceUsers: {} as PropType<VkMapUsers>,
                usersFriends: {} as PropType<VkMapUsers>,
                currentUser: null,
                token: '',
            }
        },
        methods: {
            addUser(u: VkUser): void {
                console.log(u)
                if (this.sourceUsers[u.id]) return
                this.sourceUsers[u.id] = u
            },
            buildUsers(): void {
                //it can be more efficient with update friends on append user into sourceList
                this.usersFriends = {}
                this.getFriends(this.sourceUsers)
            },
            getFriendsImpl(sourceUser: VkUser): void {
                // doesn't work if user have more than 5000 friends
                (() => (VK.Api.call("friends.get", {
                    user_id: sourceUser.id,
                    fields: "photo_50,sex,bdate",
                    v:  import.meta.env.VITE_VK_VER,
                }, (r) => {
                    this.updateFriends(sourceUser, (r.response.items as VkUser[]).filter(u => !u.deactivated))
                })))()
            },
            getFriends(sourceUsers: VkMapUsers): void {
                Object.values(sourceUsers).forEach(u => this.getFriendsImpl(u))
            },
            updateFriends(source: VkUser, friends: VkUser[]) {
                friends.forEach(f => this.updateFriend(source, f))
            },
            updateFriend(source, friend) {
                if (this.usersFriends[friend.id]) {
                    this.usersFriends[friend.id]['sourceFriends'].push(source)
                } else {
                    this.usersFriends[friend.id] = friend
                    this.usersFriends[friend.id]['sourceFriends'] = [source]
                }
            },
            lgn() {
                VK.Auth.login(r => {
                    console.log(r)
                })
            },
            lgout() {
                VK.Auth.logout(r => {
                    console.log(r)
                })
            },
            delSource(u: VkUser): void {
              delete this.sourceUsers[u.id]
            }
        },
    })
</script>

<template>
<button @click.prevent="lgn">
  login
</button>
<button @click.prevent="lgout">
  logout
</button>
<div v-if="currentUser">
  <UserPage :user="currentUser" @back="currentUser=null"/>
</div>
<div v-show="!currentUser">
  <div class="wrapper">
    <Finder
      class="finder-page"
      @addUser="addUser"
    />
    <SourceMain
      class="source-page"
      :sourceUsers="Object.values(sourceUsers)"
      @build="buildUsers()"
      @chooseUser="u => (currentUser=u)"
      @delSource="delSource"
    />
    <FriendsMain
      v-if="usersFriends"
      class="friends-page"
      :users="Object.values(usersFriends)"
      :totalSource="Object.keys(sourceUsers).length"
      @chooseUser="u => (currentUser=u)"
    />
  </div>
</div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: row;
  gap: 2rem
}

[class$="-page"] {
  min-width: 20rem;
  width: calc((100% - 6rem) / 3);
  height: 100%;
}
</style>