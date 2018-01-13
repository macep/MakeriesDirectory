<template>
  <div id="home" class="row page">
    <div class="col-xs-12">
      <div class="row small-gutter">
        <div class="col-xs-12">
          <posts-slider :data="sliderPosts"/>
        </div>
      </div>
      <div class="row small-gutter">
        <div class="col-xs-12 col-sm-4 home-banner" v-for="banner in bannerPosts" :key="banner.id">
          <banner :route="banner.routeTo" :img="banner.better_featured_image.source_url" :title="banner.title.rendered" :content="banner.content.rendered" :overlayed="true" :escaped="true"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import banner from '../common/banner'
  import postsSlider from '../common/posts-slider.vue'

  export default {
    name: 'home-page',
    components: {banner, postsSlider},
    computed: {
      ...mapGetters(['sliderPosts', 'bannerPosts', 'isMobile'])
    }
  }
</script>
