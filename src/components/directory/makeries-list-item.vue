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
//  import apiService from '../../api/api.service'

  export default {
    name: 'banner',
    components: { imageOverlayed },
    props: {
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
      //      if (typeof this.img === 'number') {
      //        const makerId = this.route.split('/')[2]
      //        const imgData = await apiService.callApi(`maker/${makerId}/image/${this.img}`, null, 0)
      //        this.imgData = `data:image/jpeg;base64,${imgData.data}`
      //      }
      this.imgData = ``
    }
  }
</script>
