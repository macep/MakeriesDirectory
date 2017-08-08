<template>
  <div id="journal" class="row page">
    <div class="col-xs-2">
      <accordion-menu :one-at-a-time="true" :acc-data="categoriesData"/>
    </div>
    <div class="col-xs-10">
      <div class="row">
        <div class="col-xs-12">
          <span v-html="journalData.content.rendered"/>
        </div>
        <div class="col-xs-6" v-for="post in posts" :key="post.id">
          <!--<span v-html="post.images[0]"/><br>-->
          <span v-html="post.title"/><br>
          <span v-html="post.excerpt"/> <br>
          <span v-html="post.date"/> <br>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Config from '../../api/app.config'
  import accordionMenu from '../common/accordion-menu.vue'

  export default {
    name: 'journal-page',
    components: {accordionMenu},
    computed: {
      ...mapGetters(['pages', 'posts', 'categories']),
      journalData () {
        return this.pages.find(item => {
          return item.id === Config.pagesIDs.journal
        })
      },
      categoriesData () {
        return this.categories
      },
      postsData () {
        return this.posts
      }
    }
  }
</script>
