<template>
  <nav>
    <span v-for="link in mainMenu" :key="link.id" class="nav-item">
      <a v-if="link.object_id === weekenderId" :href="weekenderExternal" target="_new">{{link.title}}</a>
      <router-link v-else :to="link.url">{{link.title}}</router-link>
    </span>
    <span class="nav-item auth-nav-item" v-if="authenticated">
      <img :src="avatar" id="profile-avatar">
      <a class="logged-out" href="#" @click.prevent="auth.logout">logout</a>
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
        weekenderExternal: Config.routerSettings.weekenderExternal,
        avatar: Config.missingAvatar
      }
    },
    mounted () {
      setTimeout(() => {
        if (this.userProfile.hasOwnProperty('picture')) {
          this.avatar = this.userProfile.picture
        }
        if (localStorage.getItem('jgm_current_user')) {
          this.avatar = JSON.parse(localStorage.getItem('jgm_current_user')).picture
          this.$store.commit('mutateUserProfile', JSON.parse(localStorage.getItem('jgm_current_user')))
        }
      }, 100)
    },
    computed: {
      ...mapGetters(['mainMenu', 'userProfile'])
    },
    watch: {
      authenticated () {
        if (this.authenticated) {
          this.$store.commit('mutateUserProfile', localStorage.getItem('jgm_current_user'))
        }
      },
      userProfile () {
        if (this.userProfile.hasOwnProperty('picture')) {
          this.avatar = this.userProfile.picture
        }
      }
    }
  }
</script>
