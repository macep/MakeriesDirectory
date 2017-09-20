<template>
  <nav>
    <span v-for="link in mainMenu" :key="link.id" class="nav-item">
      <a v-if="link.object_id === weekenderId" :href="weekenderExternal" target="_new">{{link.title}}</a>
      <router-link v-else :to="link.url">{{link.title}}</router-link>
    </span>
    <span class="nav-item auth-nav-item">
      <a class="logged-out" href="#" v-if="authenticated" @click.prevent="auth.logout">logout</a>
    </span>
  </nav>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Config from '../../api/app.config'

  export default {
    name: 'jgm-menu',
    props: ['auth', 'authenticated'],
    data () {
      return {
        weekenderId: Config.pagesIDs.weekender,
        weekenderExternal: Config.routerSettings.weekenderExternal
      }
    },
    computed: {
      ...mapGetters(['mainMenu'])
    }
  }
</script>
