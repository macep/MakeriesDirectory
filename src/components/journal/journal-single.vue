<template>
  <div id="journal-single" class="row post">
    <div class="col-xs-1">
      <i :class="categoryName(singlePostData.categories[0])"/>
    </div>
    <div class="col-xs-8">
      <div class="row">
        <div class="col-xs-12">
          <h1 v-html="singlePostData.title"/>
          <em>{{appTitle}} • {{singlePostData.date}}</em>
          <div class="post-content" v-html="singlePostData.content"/>
        </div>
        <div class="col-xs-12 share-post">
          <div class='inner-wrapper'>
            <h3 class='item heading'>Share this:</h3>
            <span class="item facebook"><a target="_new" :href="facebookUrl"><i class="icon-facebook"></i></a></span>
            <span class="item twitter"><a target="_new" :href="twitterUrl"><i class="icon-twitter"></i></a></span>
            <span class="item pinterest"><a target="_new" :href="pinterestCode"><i class="icon-pinterest"></i></a></span>
          </div>
        </div>
      </div>
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
        <banner :route="banner.routeTo"
                :img="banner.better_featured_image.source_url"
                :title="banner.title.rendered"
                :content="banner.content.rendered"
                :overlayed="false"
                :escaped="true"/>
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
      },
      facebookUrl () {
        return Config.social.facebookUrl + window.location.protocol + '//' + window.location.host + this.$route.path
      },
      twitterUrl () {
        return Config.social.twitterURl + window.location.protocol + '//' + window.location.host + this.$route.path
      },
      pinterestCode () {
        return Config.social.pinterestCode
      }
    },
    methods: {
      categoryName (catId) {
        return 'icon-cat-' + this.categories.find(cat => cat.id === catId).name.toLowerCase()
      }
    }
  }
</script>
