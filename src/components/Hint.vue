<script lang=ts>
    import {defineComponent} from 'vue';

    export default defineComponent({
        name: "Hint",
        props: {
            str: String
        },
        data() {
            return {
                isOpen: true
            }
        }
    })
</script>

<template>
<div class="hint" v-if="isOpen">
  <div class="hint-text">
    {{ str }}
  </div>
  <div class="cross pointer"  @click.prevent="isOpen=false">
    &#10005;
  </div>
</div>
</template>

<style scoped>
.hint {
  display: flex;
  flex-direction: row;
  width: 20rem;
  background-color: antiquewhite;
  border-radius: 20px;
  padding: 10px;
}
</style>