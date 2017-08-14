<template>
  <span>
    <input type="search" v-model="criteria" :placeholder="searchPlaceholder"/>
  </span>
</template>

<script>
  import Config from '../../api/app.config'

  export default {
    name: 'search-directory',
    data () {
      return {
        criteria: '',
        searchPlaceholder: Config.titles.searchPlaceholder
      }
    },
    watch: {
      criteria () {
        this.$store.commit('mutateSearchCriteria', this.criteria)
      }
    }
  }
</script>
