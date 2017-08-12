<template>
  <div class="banner-inner">
    <template v-if="route">
      <router-link :to="route">
        <image-overlayed :url="img" :overlayed="overlayed" :escaped="escaped"/>
      </router-link>
      <router-link :to="route" class="banner-title">{{title}}</router-link>
    </template>
    <template v-else>
      <a href="http://eepurl.com/lobiL" target="_new">
        <image-overlayed :url="img" :overlayed="overlayed" :escaped="escaped"/>
      </a>
      <a href="http://eepurl.com/lobiL" target="_new" class="banner-title">{{title}}</a>
    </template>
    <span v-html="content" class="banner-content"/>
  </div>
</template>

<script>
  import imageOverlayed from './image-overlayed.vue'

  export default {
    name: 'banner',
    components: {imageOverlayed},
    props: {
      route: {
        type: String,
        required: false
      },
      img: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      content: {
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
