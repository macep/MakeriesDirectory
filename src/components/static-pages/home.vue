<template>
  <div id="home" class="row page">
    <div class="col-xs-12">
      <ul id="home-slider">
        <li v-for="slide in homeSliderPosts" :key="slide.id" class="slide">
          <router-link to="/directory">
            <img :src="slide.better_featured_image.source_url" class="slide-image"/>
            <span class="slide-caption">
              <i class="icon-facebook"/>
              <span class="slide-caption-title" v-html="slide.title.rendered"/>
              <span class="slide-caption-content" v-html="slide.content.rendered"/>
            </span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="col-xs-12 col-md-4 home-banner" v-for="banner in homeBannerPosts" :key="banner.id">
      <template v-if="banner.routeTo">
        <router-link :to="banner.routeTo">
          <img :src="banner.better_featured_image.source_url" class="banner-image"/>
        </router-link>
        <router-link :to="banner.routeTo">{{banner.title.rendered}}</router-link>
      </template>
      <template v-else>
        <a href="http://eepurl.com/lobiL" target="_new">
          <img :src="banner.better_featured_image.source_url" class="banner-image"/>
        </a>
        <a href="http://eepurl.com/lobiL" target="_new">{{banner.title.rendered}}</a>
      </template>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import apiService from '../../api/app.service'

  export default {
    name: 'home-page',
    data () {
      return {
        homeSliderPosts: [],
        homeBannerPosts: []
      }
    },
    mounted () {
      apiService.getPostsByCategory(863).then(response => {
        this.homeSliderPosts = response.posts
      })
      apiService.getPostsByCategory(864).then(response => {
        this.homeBannerPosts = response.posts.reverse()
        this.homeBannerPosts.forEach((item, idx) => {
          switch (idx) {
            case 0:
              item.routeTo = '/directory'
              break
            case 1:
              item.routeTo = '/sign-up'
              break
            case 2:
              item.linkTo = 'http://eepurl.com/lobiL'
              break
          }
        })
        console.log(this.homeBannerPosts)
      })
    },
    computed: {
      ...mapGetters(['posts'])
    },
    methods: {}
  }
</script>
