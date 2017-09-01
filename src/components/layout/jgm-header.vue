<template>
  <header>
    <jgm-logo/>
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">Auth0 - Vue</a>
          <router-link :to="'/'" class="btn btn-primary btn-margin"> Home </router-link>
          <button class="btn btn-primary btn-margin" v-if="!authenticated" @click="login()"> Log In </button>
          <button class="btn btn-primary btn-margin" v-if="authenticated" @click="logout()"> Log Out
      </button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
  import jgmLogo from '../common/jgm-logo.vue'

  export default {
    name: 'jgm-header',
    props: ['auth', 'authenticated'],

    components: {jgmLogo}
  }
</script>
