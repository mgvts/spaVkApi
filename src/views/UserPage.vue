<script lang=ts>
    import {defineComponent, PropType} from 'vue';
    import {VkUser, VkWall} from "@/api/types/vk";
    import WallItem from "@/components/WallItem.vue";
    import UserInline from "@/components/UserInline.vue";
    import UserInlineList from "@/components/UserInlineList.vue";

    export default defineComponent({
        name: "UserPage",
        components: {UserInlineList, UserInline, WallItem},
        props: {
            user: Object as PropType<VkUser>
        },
        data() {
            return {
                wall: this.user ? this.getWall() : []
            }
        },
        methods: {
            getWall(): VkWall[] {
                let res = []
                ;(async () => await (VK.Api.call('wall.get', {
                            owner_id: this.user.id,
                            v: "5.199"
                        },
                        r => {
                            console.log(r)
                            if (r.response) {
                                this.wall = r.response.items
                                res = r.response.items
                            }
                        })
                ))()
                return res
            }
        }
    })
</script>

<template>
<div v-if="user">
  <div>
    <button @click.prevent="$emit('back')">back</button>
  </div>
  <div>
    <UserInline :user="user"/>
  </div>
  <div class="content">
    <div class="wall">
      <WallItem
        v-if="wall.length > 0"
        v-for="w in wall"
        :key="w.id"
        :wall="w"
      />
      <div v-else>
        this user haven't got any post created by itself
      </div>
    </div>
    <div class="friends">
        <div class="friends-header">friends</div>
        <div v-if="user.sourceFriends">
          <UserInlineList :users="user.sourceFriends"/>
        </div>
      <div v-else>
        some problems, i see that this user haven't got any users in friendship with source list
      </div>
    </div>
  </div>
</div>
<div v-else>
  <div>loading</div>
</div>
</template>

<style scoped>
.wall {
  display: flex;
  flex-direction: column;
  width: 20rem;
}
.content {
  display: flex;
  flex-direction: row;
}
</style>