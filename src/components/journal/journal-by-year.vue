<template>
  <div id="journal" class="row page">
    <div class="col-xs-2">
      <blog-menu :acc-data="categories"/>
    </div>
    <div class="col-xs-10">
      <div class="row">
        <div class="col-xs-6 post-item" v-for="post in yearData" :key="post.id">
          <post :route="post.spa_route" :img="post.images[0]" :title="post.title" :date="post.date"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import blogMenu from '../common/blog-menu.vue'
  import post from './post.vue'

  export default {
    name: 'journal-by-year-page',
    components: {blogMenu, post},
    computed: {
      ...mapGetters(['posts', 'categories']),
      yearData () {
        return this.posts.filter(item => +item.year === this.selectedYear)
      },
      selectedYear () {
        return +this.$route.path.split('/')[3]
      }
    }
  }
</script>
