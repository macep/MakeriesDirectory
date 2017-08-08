<template>
  <span class="image-overlayed-wrapper">
    <template v-if="escaped">
      <img :src="url" class="image-overlayed"/>
    </template>
    <span v-else v-html="url" class="image-overlayed"/>
    <span v-if="overlayed" class="image-overlay"/>
  </span>
</template>

<script>
  export default {
    name: 'image-overlayed',
    props: {
      url: {
        type: String,
        required: true
      },
      overlayed: {
        type: Boolean,
        required: true
      },
      escaped: {
        type: Boolean,
        required: true
      }
    }
  }
</script>
