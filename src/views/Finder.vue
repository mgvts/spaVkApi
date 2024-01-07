<script lang=ts>
    import {defineComponent} from 'vue';
    import UserInline from "@/components/UserInline.vue";
    import {type VkUser} from "@/api/types/vk";

    export default defineComponent({
        name: "Finder",
        components: {UserInline},
        data: function () {
            return {
                members: [] as VkUser[],
            }
        },
        methods: {
            foo(q) {

                ;(async () => await VK.Api.call("search.getHints",
                    {
                        q,
                        v: "5.199",
                        search_global: 1,

                        fields: "photo_50,id,first_name"
                    },
                    (r) => {
                        console.log("search response")
                        console.log(r)
                        if (r.response) {
                            this.members = r.response.items
                        }
                    }))()
            }
        }
    })
</script>

<template>
<div class="finder-page">
  <input
    @input.prevent="e => this.foo(e.data)"
  />
  <div class="find-dox">
    <UserInline
      v-for="user in members"
      :key="user.id"
      :user=user
      @tap="u => $emit('addUser', u)"
    />
  </div>
</div>
</template>

<style scoped>
.finder-page {
  display: flex;
  flex-direction: column;
}

.find-dox {
  overflow: auto;
  overflow-x: hidden;
  height: 50vh;
  width: 300px;
}

.find-dox::-webkit-scrollbar {
  color: #48464C;
  display: block;
  width: 1rem;
}


.find-dox::-webkit-scrollbar-thumb {
  border-radius: 2rem;
  background: #48464C;
}
</style>