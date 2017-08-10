<template>
  <div id="journal-single" class="row post">
    <div class="col-xs-1">
      <i :class="categoryName(singlePostData.categories[0])"/>
    </div>
    <div class="col-xs-8">
      <h1 v-html="singlePostData.title"/>
      <em>{{appTitle}} • {{singlePostData.date}}</em>
      <div class="post-content" v-html="singlePostData.content"/>
    </div>
    <div class="col-xs-3 recent-posts-and-ads">
      <div class="col-xs-12">
        <h3 class="recent-posts-title">YOU MIGHT ALSO LIKE:</h3>
      </div>
      <div class="col-xs-12 post-item" v-for="post in lastRecentPosts" :key="post.id">
        <post :route="post.spa_route" :img="post.images[0]" :title="post.title" :date="post.date"/>
      </div>
      <div class="col-xs-12">
        <h3 class="recent-posts-title">OTHER LINKS:</h3>
      </div>
      <div class="col-xs-12 blog-banner" v-for="banner in bannerPosts" :key="banner.id">
        <br>
        <banner :banner="banner" :overlayed="false" :escaped="true"/>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Config from '../../api/app.config'
  import post from './post.vue'
  import banner from '../common/banner'

  export default {
    name: 'journal-single',
    components: {post, banner},
    mounted () {},
    computed: {
      ...mapGetters(['pages', 'posts', 'categories', 'bannerPosts']),
      singlePostData () {
        return this.posts.filter(item => item.id === this.postId)[0]
      },
      postId () {
        return +this.$route.path.split('/')[3]
      },
      appTitle () {
        return Config.appTitle
      },
      lastRecentPosts () {
        let recentPosts = this.posts.slice(0, Config.recentPostsNumber + 1)
        let currentPost = this.posts.find((item) => item.id === +this.$route.path.split('/')[3])
        let currentPostPos = recentPosts.indexOf(currentPost)
        let takeOut = (currentPostPos > -1) ? currentPostPos : Config.recentPostsNumber
        return recentPosts.filter((item, i) => i !== takeOut)
      }
    },
    methods: {
      categoryName (catId) {
        return 'icon-cat-' + this.categories.find(cat => cat.id === catId).name.toLowerCase()
      }
    }
  }
</script>
