<template>
  <div class="home-banner-inner">
    <template v-if="banner.routeTo">
      <router-link :to="banner.routeTo">
        <span class="banner-image-wrapper">
          <img :src="banner.better_featured_image.source_url" class="banner-image"/>
          <span class="banner-image-overlay"/>
        </span>
      </router-link>
      <router-link :to="banner.routeTo" class="banner-title">{{banner.title.rendered}}</router-link>
    </template>
    <template v-else>
      <a href="http://eepurl.com/lobiL" target="_new">
        <span class="banner-image-wrapper">
          <img :src="banner.better_featured_image.source_url" class="banner-image"/>
          <span class="banner-image-overlay"/>
        </span>
      </a>
      <a href="http://eepurl.com/lobiL" target="_new" class="banner-title">{{banner.title.rendered}}</a>
    </template>
    <span v-html="banner.content.rendered" class="banner-content"/>
  </div>
</template>

<script>
  export default {
    name: 'banner',
    props: {
      banner: {
        type: Object,
        required: true
      }
    }
  }
</script>
