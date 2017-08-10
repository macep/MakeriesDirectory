<template>
    <div id="journal" class="row page">
      <div class="col-xs-2">
        <blog-menu :one-at-a-time="true" :acc-data="categories"/>
      </div>
      <div class="col-xs-10">
        <div class="row">
          <div class="col-xs-6 post-item" v-for="post in categoryData" :key="post.id">
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
    name: 'journal-by-cat-page',
    components: {blogMenu, post},
    computed: {
      ...mapGetters(['posts', 'categories']),
      categoryData () {
        return this.posts.filter(item => {
          return item.categories.find(cat => {
            if (cat === this.categId) {
              return item
            }
          })
        })
      },
      categId () {
        return +this.$route.path.split('/')[3]
      }
    }
  }
</script>
