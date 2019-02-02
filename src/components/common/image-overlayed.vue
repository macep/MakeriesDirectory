<template>
  <span class="image-overlayed-wrapper">
    <template v-if="escaped">
      <img ref="img" :src="imgData || url" class="image-overlayed"/>
    </template>
    <template v-else-if="background">
      <div :style="img"></div>
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
        type: [String, Number],
        required: true
      },
      imgData: {
        required: false
      },
      overlayed: {
        type: Boolean,
        required: true
      },
      escaped: {
        type: Boolean,
        required: true
      },
      background: {
        type: Boolean,
        required: false
      }
    },
    computed: {
      img () {
        return {
          backgroundImage: `url("${this.url}")`,
          width: '100%',
          height: '250px',
          backgroundSize: 'cover'
        }
      }
    }
  }
</script>
