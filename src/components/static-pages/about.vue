<template>
  <div id="about" class="row page">
    <div class="col-xs-12 col-sm-10 col-sm-offset-1">
      <div class="row about-content">
        <div class="col-xs-12 about-title">
          <h1 v-html="aboutTitleData.title.rendered"/>
        </div>
        <div class="col-xs-3 helen">
          <img :src="aboutData.better_featured_image.source_url"/>
        </div>
        <div class="col-xs-9 text">
          <span v-html="aboutData.content.rendered"/>
        </div>
      </div>
      <div class="row about-more-content">
        <div class="col-xs-12 col-md-8">
          <span v-html="aboutMoreData.content.rendered"/>
        </div>
        <div class="col-xs-3 pull-right hidden-xs hidden-sm">
          <div class="row">
            <div class="col-xs-12 about-banner" v-for="banner in bannerPosts" :key="banner.id">
              <br>
              <banner :route="banner.routeTo" :img="banner.better_featured_image.source_url" :title="banner.title.rendered" :content="banner.content.rendered" :overlayed="false" :escaped="true"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import banner from '../common/banner'
  import Config from '../../api/app.config'

  export default {
    name: 'about-page',
    components: {banner},
    data () {
      return {
        aboutTitleData: {
          title: {
            rendered: ''
          }
        },
        aboutData: {
          better_featured_image: {
            source_url: ''
          },
          content: {
            rendered: ''
          }
        },
        aboutMoreData: {
          content: {
            rendered: ''
          }
        }
      }
    },
    computed: {
      ...mapGetters(['pages', 'bannerPosts'])
    },
    mounted () {
      if (this.pages.length > 0) {
        this.aboutTitleData = this.pages.find(item => item.id === Config.pagesIDs.aboutTitle)
        this.aboutData = this.pages.find(item => item.id === Config.pagesIDs.about)
        this.aboutMoreData = this.pages.find(item => item.id === Config.pagesIDs.aboutMore)
      }
    },
    metaInfo: {
      title: Config.titles.about
    },
    watch: {
      pages () {
        if (this.pages.length > 0) {
          this.aboutTitleData = this.pages.find(item => item.id === Config.pagesIDs.aboutTitle)
          this.aboutData = this.pages.find(item => item.id === Config.pagesIDs.about)
          this.aboutMoreData = this.pages.find(item => item.id === Config.pagesIDs.aboutMore)
        }
      }
    }
  }
</script>
