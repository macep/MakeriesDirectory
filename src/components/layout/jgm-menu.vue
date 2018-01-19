<template>
  <nav>
    <span v-for="link in mainMenu" :key="link.id" class="nav-item">
      <a v-if="link.object_id === weekenderId" :href="weekenderExternal" target="_new">{{link.title}}</a>
      <router-link v-else-if="link.object_id === directory" :to="directoryRoute" class="featured-makers">
        <v-touch @tap="directoryFeatured">{{link.title}}</v-touch>
      </router-link>
      <router-link v-else :to="link.url">{{link.title}}</router-link>
    </span>
    <span class="nav-item auth-nav-item" v-if="authenticated">
      <img :src="avatar" id="profile-avatar">
      <v-touch class="logged-in" href="#" @tap.prevent="auth.logout">logout</v-touch>
    </span>
    <span class="nav-item auth-nav-item" v-if="!authenticated">
      <router-link class="logged-out" to="/login">login</router-link>
      <small><router-link to="/register">or register</router-link></small>
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
        directory: Config.pagesIDs.directory,
        directoryRoute: Config.routerSettings.directory,
        weekenderExternal: Config.routerSettings.weekenderExternal,
        avatar: Config.missingAvatar
      }
    },
    mounted () {
      if (localStorage.getItem('jgm_current_user')) {
        this.avatar = JSON.parse(localStorage.getItem('jgm_current_user')).picture
      }
    },
    computed: {
      ...mapGetters(['mainMenu'])
    },
    methods: {
      directoryFeatured () {
        this.$store.commit('mutateShowAllSuppliers', false)
      }
    },
    watch: {
      authenticated () {
        if (this.authenticated) {
          setTimeout(() => {
            this.avatar = JSON.parse(localStorage.getItem('jgm_current_user')).picture
          }, 500)
        }
      }
    }
  }
</script>
