<template>
  <header>
    <router-link to="/">
      <img id="jgm-logo" :src="logo"/>
    </router-link>
  </header>
</template>

<script>
  import {mapGetters} from 'vuex'
  import apiService from '../../api/app.service'

  export default {
    name: 'jgm-header',
    data () {
      return {
        logo: '/static/images/logo.png',
        pages: []
      }
    },
    mounted () {
      // posts
//      apiService.getPosts(null, null, 100, 'desc').then((response) => {
//        console.log(response)
//      })
//       post
      apiService.getPost(3273).then((response) => {
        console.log('post 3273', response)
      })
      // pages
//      apiService.getPages().then((response) => {
//        console.log(response)
//      })
      // oage
//      apiService.getPage(2925).then((response) => {
//        console.log('page 2925', response)
//      })
      // menus
//      apiService.getMenu(2).then((response) => {
//        console.log(response)
//      })
//      apiService.getMenu(3).then((response) => {
//        console.log(response)
//      })
//      apiService.getMenu(9).then((response) => {
//        console.log(response)
//      })
    },
    computed: {
      ...mapGetters(['translations'])
    }
  }
</script>
