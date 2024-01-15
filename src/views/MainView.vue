<script lang=ts>
    import {defineComponent} from 'vue';
    import Finder from "@/views/Finder.vue";
    import SourceMain from "@/views/SourceMain.vue";
    import type {VkMapUsers, VkUser, VKUserCounters} from "@/api/types/vk";
    import FriendsMain from "@/views/FriendsMain.vue";
    import UserPage from "@/views/UserPage.vue";

    export default defineComponent({
        name: "MainView",
        components: {Finder, SourceMain, FriendsMain, UserPage},
        data() {
            return {
                sourceUsers: {} as VkMapUsers,
                usersFriends: {} as VkMapUsers,
                currentUser: null,
                token: '',
                friendsItems: [] as VkUser[],
                loadFriends: 0,
                nowLoad: '',
                errorQueue: new Set()
            }
        },
        methods: {
            addUser(u: VkUser): void {
                if (this.sourceUsers[u.id]) return
                this.sourceUsers[u.id] = u
            },
            buildUsers(): void {
                //it can be more efficient with update friends on append user into sourceList
                this.usersFriends = {}
                this.getFriends(this.sourceUsers)
            },
            getFriendsImpl(sourceUser: VkUser): Promise<void> {
                // doesn't work if user have more than 5000 friends
                VK.Api.call("friends.get", {
                    user_id: sourceUser.id,
                    fields: "photo_50,sex,bdate",
                    v: import.meta.env.VITE_VK_VER,
                }, (r) => {
                    if (r.response) {
                        let friendsItems = (r.response.items as VkUser[]).filter(u => !u.deactivated)
                        this.updateFriends(sourceUser, friendsItems)
                        // https://dev.vk.com/ru/api/api-requests#%D0%A7%D0%B0%D1%81%D1%82%D0%BE%D1%82%D0%BD%D1%8B%D0%B5%20%D0%BE%D0%B3%D1%80%D0%B0%D0%BD%D0%B8%D1%87%D0%B5%D0%BD%D0%B8%D1%8F
                        this.getCount(friendsItems.map(u => u.id))
                    }
                    if (r.error) {
                        console.error(`user ${sourceUser.first_name} ${sourceUser.last_name}`)
                        console.error(r.error.error_msg)
                    }
                })
            },
            async getCount(uids) {
                const call = (uid) => {
                    VK.Api.call("users.get", {
                        user_ids: uid,
                        fields: "counters",
                        v: import.meta.env.VITE_VK_VER,
                    }, (r) => {
                        if (r.response) {
                            this.usersFriends[uid]['friends_count'] = (r.response[0].counters as VKUserCounters).friends
                            this.loadFriends += 1
                            this.nowLoad = `${r.response[0].first_name} ${r.response[0].last_name}`
                        }
                        if (r.error) {
                            this.errorQueue.add(uid)
                        }
                    })
                }
                for (let u of uids) {
                    call(u)
                    await this.sleep(3500 / 5)
                }
                if (this.errorQueue.length != 0 ) {
                    for (let u in this.errorQueue) {
                        call(u)
                        if (this.usersFriends[u]['friends_count']) this.errorQueue.delete(u)
                        await this.sleep(3500 / 5)
                    }
                }
            },
            sleep(ms) {
                return new Promise(r => setTimeout(r, ms))
            },
            getFriends(sourceUsers: VkMapUsers): void {
                //build objects
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
      :alreadyLoad="loadFriends"
      :now-load-user="nowLoad"
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