<template>
  <div id="journal-single" class="row post">
    <div class="col-xs-1">
      <i :class="categoryName(singlePostData.categories[0])"/>
    </div>
    <div class="col-sm-8">
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
    <div class="col-sm-3 recent-posts-and-ads">
      <div class="row">
        <div class="col-xs-6 col-sm-12">
          <div class="row">
            <div class="col-xs-12">
              <h3 class="recent-posts-title">{{youMightAlsoLike}}</h3>
            </div>
            <div class="col-xs-12 post-item" v-for="post in lastRecentPosts" :key="post.id">
              <post :route="post.spa_route" :img="post.images[0]" :title="post.title" :date="post.date"/>
            </div>
          </div>
        </div>
        <div class="col-xs-6 col-sm-12">
          <div class="col-xs-12">
            <h3 class="recent-posts-title">{{otherLinks}}</h3>
          </div>
          <div class="col-xs-12 blog-banner" v-for="banner in bannerPosts" :key="banner.id">
            <br>
            <banner :route="banner.routeTo" :img="banner.better_featured_image.source_url" :title="banner.title.rendered" :content="banner.content.rendered" :overlayed="false" :escaped="true"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Config from '../../api/app.config'
  import {getNthFragment} from '../../modules/utils'
  import post from './post.vue'
  import banner from '../common/banner'

  export default {
    name: 'journal-single',
    components: {post, banner},
    data () {
      return {
        appTitle: Config.appTitle,
        youMightAlsoLike: Config.titles.youMightAlsoLike,
        otherLinks: Config.titles.otherLinks,
        facebookUrl: `${Config.social.sharer.facebookUrl}${window.location.protocol}//${window.location.host}${this.$route.path}`,
        twitterUrl: `${Config.social.sharer.twitterURl}${window.location.protocol}//${window.location.host}${this.$route.path}`,
        pinterestCode: Config.social.sharer.pinterestCode
      }
    },
    mounted () {},
    computed: {
      ...mapGetters(['posts', 'categories', 'bannerPosts']),
      lastRecentPosts () {
        let recentPosts = this.posts.slice(0, Config.recentPostsNumber + 1)
        let currentPost = this.posts.find((item) => item.id === +getNthFragment(this.$route.path, 3))
        let currentPostPos = recentPosts.indexOf(currentPost)
        let takeOut = (currentPostPos > -1) ? currentPostPos : Config.recentPostsNumber
        return recentPosts.filter((item, i) => i !== takeOut)
      },
      postId () {
        return +getNthFragment(this.$route.path, 3)
      },
      singlePostData () {
        console.log(this.posts.filter(item => item.id === this.postId)[0].title)
        return this.posts.filter(item => item.id === this.postId)[0]
      }
    },
    methods: {
      categoryName (catId) {
        return `icon-cat-${this.categories.find(cat => cat.id === catId).name.toLowerCase()}`
      }
    },
    metaInfo () {
      return {
        title: `${this.singlePostData.title} (from ${this.singlePostData.date})`
      }
    }
  }
</script>
