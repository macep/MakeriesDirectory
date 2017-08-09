<template>
  <div id="journal-single" class="row post">
    <div class="col-xs-1">
      <i :class="categoryName(singlePostData.categories[0])"/>
    </div>
    <div class="col-xs-11">
      <h1 v-html="singlePostData.title"/>
      <em>{{appTitle}} • {{singlePostData.date}}</em>
      <div class="post-content" v-html="singlePostData.content"/>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Config from '../../api/app.config'

  export default {
    name: 'journal-single',
    computed: {
      ...mapGetters(['pages', 'posts', 'categories']),
      singlePostData () {
        return this.posts.filter(item => item.id === this.postId)[0]
      },
      postId () {
        return +this.$route.path.split('/')[3]
      },
      appTitle () {
        return Config.appTitle
      }
    },
    methods: {
      categoryName (catId) {
        return 'icon-cat-' + this.categories.find(cat => cat.id === catId).name.toLowerCase()
      }
    }
  }
</script>
