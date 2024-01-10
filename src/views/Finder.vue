<script lang=ts>
    import {defineComponent} from 'vue';
    import UserInline from "@/components/UserInline.vue";
    import {type VkUser} from "@/api/types/vk";
    import UserInlineList from "@/components/UserInlineList.vue";
    import Hint from "@/components/Hint.vue";

    export default defineComponent({
        name: "Finder",
        components: {UserInlineList, UserInline, Hint},
        data: function () {
            return {
                members: [] as VkUser[],
                searchStr: ''
            }
        },
        methods: {
            setUserInSearch(e: InputEvent): void {
                console.log(e)
                let chosen = this.choose(this.searchStr, this.members[0].first_name, this.members[0].last_name)
                this.searchStr = chosen ?? this.searchStr
                e.preventDefault()
                this.$refs.searchInput.focus()
            },
            /***
             * tries to guess possible name or surname of user input {@param search}
             * @param search  current user input
             * @param pFirst   first of possible member {@see VkUser.first_name}
             * @param pLast    first of possible member {@see VkUser.last_name}
             */
            choose(search: string, pFirst: string, pLast: string): string | null {
                const splitSearch = search.split(' ')
                if (splitSearch.length == 1) {
                    if (pFirst.includes(search, 0)) return pFirst + ' '
                    if (pLast.includes(search, 0)) return pLast + ' '
                } else if (splitSearch.length == 2) {
                    if (splitSearch[0] == pFirst) return `${pFirst} ${pLast}`
                    if (splitSearch[0] == pLast) return `${pFirst} ${pLast}`
                }
                return null
            }
        },
        watch: {
            searchStr(q: string): void {
                ;(async () => await VK.Api.call("users.search",
                    {
                        q,
                        v: import.meta.env.VITE_VK_VER,
                        fields: "photo_50"
                    },
                    r => {
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
  <div class="header">
    <Hint
      str="press tab for paste first user name or surname in search bar"
    />
  </div>
  <div class="find-box">
    <input
      style="width: 80%"
      ref="searchInput"
      v-model="searchStr"
      @keydown.tab="setUserInSearch"
      placeholder="search me"
    />
    <UserInlineList
      :users="members"
      @tap="u => $emit('addUser', u)"
    />
  </div>
</div>
</template>

<style scoped>
.finder-page {
  gap: 1rem;
  display: flex;
  flex-direction: column;
}
</style>