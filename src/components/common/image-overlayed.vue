<template>
  <span class="image-overlayed-wrapper">
    <img :src="url" class="image-overlayed"/>
    <span class="image-overlay"/>
  </span>
</template>

<script>
  export default {
    name: 'image-overlayed',
    props: {
      url: {
        type: String,
        required: true
      }
    }
  }
</script>
