<template>
  <div id="journal" class="row page">
    <div class="col-xs-12" v-for="post in categoryData" :key="post.id">
      {{post.id}}
      {{post.title}}
      {{post.images}}
      {{post.categories}}

      <hr>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'journal-by-cat-page',
    computed: {
      ...mapGetters(['posts']),
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
