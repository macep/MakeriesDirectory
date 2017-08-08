<template>
  <div id="journal" class="row page">
    <div class="col-xs-2">
      <accordion-menu :one-at-a-time="true" :acc-data="categories"/>
    </div>
    <div class="col-xs-10">
      <div class="row">
        <div class="col-xs-12">
          <span v-html="journalPageData.content.rendered"/>
        </div>
        <div class="col-xs-6 post-item" v-for="post in postsData" :key="post.id">
          <router-link to="/">
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
  import Config from '../../api/app.config'
  import accordionMenu from '../common/accordion-menu.vue'
  import imageOverlayed from '../common/image-overlayed.vue'

  export default {
    name: 'journal-page',
    components: {accordionMenu, imageOverlayed},
    computed: {
      ...mapGetters(['pages', 'posts', 'categories']),
      journalPageData () {
        return this.pages.find(item => {
          return item.id === Config.pagesIDs.journal
        })
      },
      postsData () {
        return this.posts
      }
    }
  }
</script>
