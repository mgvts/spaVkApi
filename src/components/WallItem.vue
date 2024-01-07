<script lang=ts>
    import {defineComponent, PropType} from 'vue';
    import {VkPhotoCopyType, VkWall} from "@/api/types/vk";

    export default defineComponent({
        name: "WallItem",
        props: {
            wall: Object as PropType<VkWall>
        },
        data() {
            return {
                photos: this.getPhotos()
            }
        },
        methods: {
            getPhotos() {
                return this.wall.attachments.filter(at => at.photo)
                    .map(at => {
                        let url = ''
                        at.photo.sizes.some(phtCopy => {
                            url = phtCopy.url
                            return phtCopy.type == "m"
                        })
                        return url ? url : null
                    })
            }
        }
    })
</script>

<template>
<div class="wall-item" v-if="photos.length > 0 || wall.text !== ''">
  <div class="wall-text">
    {{ wall.text }}
  </div>
  <div class="attachments">
    <div v-for="p in photos">
      <img v-if="p" :src="p" alt="">
    </div>
  </div>
</div>


</template>

<style scoped>
.wall-item {
  display: flex;
  flex-direction: column;
  align-items: center;

  border: 1px solid black;
  padding: 5px;
  border-radius: 1rem;
  margin-bottom: 1rem;
  background-color: beige;
}

.wall-text {
  width: 100%;
}

/*130px max lenght*/
.attachments {
  display: inline-grid;
  grid-template-columns: 130px auto;
}
</style>