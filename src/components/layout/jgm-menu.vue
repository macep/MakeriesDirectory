<template>
  <nav>
    <a class="nav-toggle" @click="toggleMenu">
      <span/><span/><span/>
    </a>
    <div :class="{ 'nav-menu': true, 'is-active': isMenuActive }">
      <span @click="closeMenu" class="nav-item">
        <router-link to="/">Home</router-link>
      </span>
      <span @click="closeMenu" class="nav-item">
        <router-link to="/about/">About</router-link>
      </span>
      <span @click="closeMenu" class="nav-item">
        <router-link to="/directory/">Directory</router-link>
      </span>
      <span @click="closeMenu" class="nav-item">
        <router-link to="/events-and-blog/">Events and Blog</router-link>
      </span>
      <span @click="closeMenu" class="nav-item">
        <router-link to="/maker-factory-sign-up/">Maker-factory sign up</router-link>
      </span>
      <span @click="closeMenu" class="nav-item">
        <router-link to="/work-with-us/">Work with us</router-link>
      </span>
    </div>
  </nav>
</template>

<script>
  export default {
    name: 'jgm-menu',
    data () {
      return {
        isMenuActive: false
      }
    },
    methods: {
      toggleMenu () {
        this.isMenuActive = !this.isMenuActive
      },
      closeMenu () {
        this.isMenuActive = false
      },
      relativePath (url) {
        url = url.replace('https://', '')
        return url.replace(url.split('/')[0], '')
      }
    }
  }
</script>
