<template>
  <nav>
    <span v-for="link in mainMenu" :key="link.id" class="nav-item">
      <a v-if="link.object_id === weekenderId" :href="weekenderExternal" target="_new">{{link.title}}</a>
      <router-link v-else :to="link.url">{{link.title}}</router-link>
    </span>
    <span class="nav-item">
      <a href="#" v-if="!authenticated" @click.prevent="login">login</a>
      <a href="#" v-else @click.prevent="logout">logout</a>
    </span>
  </nav>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Config from '../../api/app.config'
  import AuthService from '../../api/auth.service'

  const auth = new AuthService()

  const {login, logout, authenticated, authNotifier} = auth

  export default {
    name: 'jgm-menu',
    data () {
      authNotifier.$on('authChange', authState => {
        this.authenticated = authState.authenticated
      })
      return {
        weekenderId: Config.pagesIDs.weekender,
        weekenderExternal: Config.routerSettings.weekenderExternal,
        authenticated
      }
    },
    computed: {
      ...mapGetters(['mainMenu'])
    },
    methods: {
      login,
      logout
    }
  }
</script>
