<template>
  <div class="banner-inner">
    <router-link :to="`/maker/${id}/${route}`">
      <image-overlayed :url="img" :overlayed="overlayed" :escaped="escaped"/>
    </router-link>
    <router-link :to="`/maker/${id}/${route}`" class="banner-title">{{title}}</router-link>
    <span v-html="content" class="banner-content"/>
  </div>
</template>

<script>
  import imageOverlayed from '../common/image-overlayed.vue'

  export default {
    name: 'banner',
    components: { imageOverlayed },
    props: {
      id: {
        type: [Number, String],
        required: false
      },
      route: {
        type: String,
        required: false
      },
      title: {
        type: String,
        required: true
      },
      img: {
        type: [String, Number],
        required: true
      },
      content: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        overlayed: true,
        escaped: true
      }
    }
  }
</script>
