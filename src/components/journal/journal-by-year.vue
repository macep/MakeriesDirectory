<template>
  <div id="journal" class="row page">
    <div class="col-xs-2">
      <ul>
        <li v-for="category in categories" :key="category.id">
          <router-link :to="">{{category.name}} ({{category.count}})</router-link>
        </li>
      </ul>
    </div>
    <div class="col-xs-10">
      <span v-html="journalData.content.rendered"/>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'journal-page',
    computed: {
      ...mapGetters(['pages', 'categories']),
      journalData () {
        return this.pages.find(item => {
          return item.id === 7
        })
      },
      categoriesData () {
        return this.categories
      }
    }
  }
</script>
