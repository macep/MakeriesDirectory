<template>
    <div id="journal" class="row page">
      <div class="col-xs-2">
        <accordion-menu :one-at-a-time="true" :acc-data="categories"/>
      </div>
      <div class="col-xs-10">
        <div class="row">
          <div class="col-xs-6 post-item" v-for="post in categoryData" :key="post.id">
            <router-link :to="post.spa_route">
              <image-overlayed :url="post.images[0]" :overlayed="true" :escaped="false"/>
              <div class="info">
                <div class="info-wrapper">
                  <div class="info-inner">
                    <div class="inner">
                      <h3 v-html="post.title"/>
                      <div v-html="post.date"/>
                    </div>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import accordionMenu from '../common/accordion-menu.vue'
  import imageOverlayed from '../common/image-overlayed.vue'

  export default {
    name: 'journal-by-cat-page',
    components: {accordionMenu, imageOverlayed},
    computed: {
      ...mapGetters(['posts', 'categories']),
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
