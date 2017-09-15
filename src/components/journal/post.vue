<template>
  <router-link :to="route">
    <image-overlayed :url="img" :overlayed="true" :escaped="false"/>
    <div class="info">
      <div class="info-wrapper">
        <div class="info-inner">
          <div class="inner">
            <h3 v-html="title"/>
            <div class="post-date" v-html="date"/>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
  import imageOverlayed from '../common/image-overlayed.vue'

  export default{
    name: 'post',
    components: {imageOverlayed},
    props: {
      route: {
        type: String,
        required: true
      },
      img: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      date: {
        type: String,
        required: true
      }
    }
  }
</script>
