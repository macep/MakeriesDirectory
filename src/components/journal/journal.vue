<template>
  <div id="journal" class="row page">
    <div class="col-sm-3 col-md-2" v-if="!isMobile">
      <blog-menu :one-at-a-time="true" :acc-data="categories"/>
    </div>
    <div class="col-sm-9 col-md-10">
      <div class="row small-g">
        <div class="col-xs-6 post-item" v-for="post in posts" :key="post.id">
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
  import post from './post.vue'

  export default {
    name: 'journal-page',
    components: {blogMenu, post},
    computed: {
      ...mapGetters(['posts', 'categories', 'isMobile'])
    },
    metaInfo: {
      title: `${Config.titles.journal}`
    }
  }
</script>
