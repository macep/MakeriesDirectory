<template xmlns="http://www.w3.org/1999/html">
  <div id="journal" class="row page">
    <div class="col-sm-3 col-md-2" v-if="!isMobile">
      <blog-menu :acc-data="categories"/>
    </div>
    <div class="col-sm-9 col-md-10">
      <div class="row small-gutter">
        <div class="col-xs-12">
          <h3 class="posts-filter-title"> {{archiveTitle}}</h3>
        </div>
        <div class="col-xs-12 col-sm-6 post-item" v-for="post in yearData" :key="post.id">
          <post :route="post.spa_route" :img="post.images[0]" :title="post.title" :date="post.date" :background="true"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Config from '../../api/app.config'
  import {getNthFragment} from '../../modules/utils'
  import blogMenu from '../common/blog-menu.vue'
  import post from './post.vue'

  export default {
    name: 'journal-by-year-page',
    components: {blogMenu, post},
    computed: {
      ...mapGetters(['posts', 'categories', 'isMobile']),
      yearData () {
        return this.posts.filter(item => +item.year === this.selectedYear)
      },
      selectedYear () {
        return +getNthFragment(this.$route.path, 3)
      },
      archiveTitle () {
        return `${Config.titles.archive}: ${this.selectedYear}`
      }
    },
    metaInfo () {
      return {
        title: `${Config.titles.archive} from ${this.selectedYear}`
      }
    }
  }
</script>
