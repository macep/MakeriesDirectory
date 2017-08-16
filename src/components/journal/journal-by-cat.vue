<template>
    <div id="journal" class="row page">
      <div class="col-sm-3 col-md-2" v-if="!isMobile">
        <blog-menu :acc-data="categories"/>
      </div>
      <div class="col-sm-9 col-md-10">
        <div class="row">
          <div class="col-xs-12">
            <h3 class="posts-filter-title">{{categoryTitle}}</h3>
          </div>
          <div class="col-xs-6 post-item" v-for="post in categoryData" :key="post.id">
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
    name: 'journal-by-cat-page',
    components: {blogMenu, post},
    computed: {
      ...mapGetters(['posts', 'categories', 'isMobile']),
      categoryData () {
        return this.posts.filter(item => {
          return item.categories.find(cat => {
            if (cat === this.categId) {
              return item
            }
          })
        })
      },
      category () {
        return this.categories.find(cat => cat.id === this.categId)
      },
      categId () {
        return +this.$route.path.split('/')[3]
      },
      categoryTitle () {
        return `${Config.titles.category} ${this.category.name}`
      }
    }
  }
</script>
