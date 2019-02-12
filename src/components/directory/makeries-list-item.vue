<template>
  <div class="banner-inner">
    <router-link :to="route">
      <image-overlayed :url="img" :imgData="imgData" :overlayed="overlayed" :escaped="escaped"/>
    </router-link>
    <router-link :to="route" class="banner-title">{{title}}</router-link>
    <span v-html="content" class="banner-content"/>
  </div>
</template>

<script>
  import imageOverlayed from '../common/image-overlayed.vue'
  import axios from 'axios'
  import nJwt from 'njwt'
  import Config from '../../api/app.config.js'

  export default {
    name: 'banner',
    components: { imageOverlayed },
    props: {
      id: {
        type: [Number, String],
        required: false
      },
      route: {
        type: String,
        required: false
      },
      title: {
        type: String,
        required: true
      },
      img: {
        type: [String, Number],
        required: true
      },
      content: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        imgData: '',
        overlayed: true,
        escaped: true
      }
    },
    async mounted () {
      if (typeof this.img === 'number') {
        const imgData = await axios({
          method: 'get',
          url: `${Config.apiV2Root}maker/${this.id}/image/${this.img}`,
          headers: { token: nJwt.create({
            userId: 1,
            userRole: 'superAdmin',
            iss: Config.apiV2Root,
            scope: 'self'
          }, 'JWT_SECRET', 'HS256').compact() }
        })
        this.imgData = `data:image/jpeg;base64,${imgData.data}`
      }
    }
  }
</script>
