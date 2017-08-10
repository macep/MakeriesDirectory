<template>
  <div id="journal" class="row page">
    <div class="col-xs-2">
      <blog-menu :one-at-a-time="true" :acc-data="categories"/>
    </div>
    <div class="col-xs-10">
      <div class="row">
        <div class="col-xs-12">
          <span v-html="journalPageData.content.rendered"/>
        </div>
        <div class="col-xs-6 post-item" v-for="post in postsData" :key="post.id">
          <post :route="post.spa_route" :img="post.images[0]" :title="post.title" :date="post.date"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Config from '../../api/app.config'
  import blogMenu from '../common/blog-menu.vue'
  import imageOverlayed from '../common/image-overlayed.vue'
  import post from './post.vue'

  export default {
    name: 'journal-page',
    components: {blogMenu, imageOverlayed, post},
    computed: {
      ...mapGetters(['pages', 'posts', 'categories']),
      journalPageData () {
        return this.pages.find(item => item.id === Config.pagesIDs.journal)
      },
      postsData () {
        return this.posts
      }
    }
  }
</script>
