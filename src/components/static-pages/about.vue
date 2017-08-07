<template>
  <div id="about" class="row page">
    <div class="col-xs-10 col-xs-offset-1">
      <div class="row about-content">
        <div class="col-xs-3 helen">
          <img :src="helen"/>
        </div>
        <div class="col-xs-9 text">
          <span v-html="aboutData.content.rendered"/>
        </div>
      </div>
      <div class="row about-more-content">
        <div class="col-xs-8">
          <span v-html="aboutMoreData.content.rendered"/>
        </div>
        <div class="col-xs-3 pull-right">
          <div class="row">
            <div class="col-xs-12 about-banner" v-for="banner in bannerPosts" :key="banner.id">
              <br>
              <banner :banner="banner"/>
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
        helen: `${Config.wpDomain}/wp-content/uploads/2013/11/helen.png`
      }
    },
    computed: {
      ...mapGetters(['pages', 'bannerPosts']),
      aboutData () {
        return this.pages.find(item => {
          return item.id === 2
        })
      },
      aboutMoreData () {
        return this.pages.find(item => {
          return item.id === 107
        })
      }
    }
  }
</script>
