<template>
  <div class="home-banner-inner">
    <template v-if="banner.routeTo">
      <router-link :to="banner.routeTo">
        <image-overlayed :url="banner.better_featured_image.source_url"/>
      </router-link>
      <router-link :to="banner.routeTo" class="banner-title">{{banner.title.rendered}}</router-link>
    </template>
    <template v-else>
      <a href="http://eepurl.com/lobiL" target="_new">
        <image-overlayed :url="banner.better_featured_image.source_url"/>
      </a>
      <a href="http://eepurl.com/lobiL" target="_new" class="banner-title">{{banner.title.rendered}}</a>
    </template>
    <span v-html="banner.content.rendered" class="banner-content"/>
  </div>
</template>

<script>
  import imageOverlayed from './image-overlayed.vue'

  export default {
    name: 'banner',
    components: {imageOverlayed},
    props: {
      banner: {
        type: Object,
        required: true
      }
    }
  }
</script>
