<template>
  <span class="image-overlayed-wrapper">
    <img :src="url" class="image-overlayed"/>
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
      }
    }
  }
</script>
