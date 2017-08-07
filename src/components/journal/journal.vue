<template>
  <div id="journal" class="row page">
    <div class="col-xs-2">
      <ul>
        <li v-for="category in categoriesData" :key="category.id">
          <router-link :to="journalByCatIdRoute(category.id)">{{category.name}} ({{category.count}})</router-link>
        </li>
      </ul>
    </div>
    <div class="col-xs-10">
      <div class="row">
        <div class="col-xs-12">
          <span v-html="journalData.content.rendered"/>
        </div>
        <div class="col-xs-6" v-for="post in posts" :key="post.id">
          <span v-html="post.images[0]"/><br>
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

  const byCat = '/journal/category/'
//  const byYear = '/journal/year/'

  export default {
    name: 'journal-page',
    computed: {
      ...mapGetters(['pages', 'posts', 'categories']),
      journalData () {
        return this.pages.find(item => {
          return item.id === 7
        })
      },
      categoriesData () {
        return this.categories
      },
      postsData () {
        return this.posts
      }
    },
    methods: {
      journalByCatIdRoute (id) {
        return byCat + id
      }
    }
  }
</script>
