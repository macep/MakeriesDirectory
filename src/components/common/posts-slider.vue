<template>
  <ul class="posts-slider">
    <li v-for="slide in data" :key="slide.id" class="slide">
      <router-link to="/directory">
        <img :src="slide.better_featured_image.source_url" class="slide-image"/>
        <span class="slide-caption">
          <span class="slide-caption-logo">
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
               :width="isMobile ? 60 : 90" :height="isMobile ? 60 : 90" viewBox="0 0 90 90" style="enable-background:new 0 0 90 90;" xml:space="preserve">
              <g>
                <path d="M64.4,11.4L83.8,45L64.4,78.6H25.6L6.2,45l19.4-33.6H64.4 M65,10.4H25L5,45l20,34.6h40L85,45L65,10.4L65,10.4z"/>
                <path d="M45,6.2l33.6,19.4v38.8L45,83.8L11.4,64.4V25.6L45,6.2 M45,5L10.4,25v40L45,85l34.6-20V25L45,5L45,5z"/>
                <g>
                  <path d="M28.5,38.7H30v7.5c0,3-1.5,3.9-3.4,3.9c-0.5,0-1.2-0.1-1.5-0.3l0.2-1.2c0.3,0.1,0.7,0.2,1.2,0.2c1.3,0,2-0.6,2-2.8V38.7z"
                    />
                  <path d="M44.2,49.4c-0.6,0.2-1.9,0.6-3.4,0.6c-1.7,0-3.1-0.4-4.2-1.5c-1-0.9-1.6-2.4-1.6-4.1c0-3.3,2.3-5.8,6-5.8
                    c1.3,0,2.3,0.3,2.8,0.5l-0.4,1.2c-0.6-0.3-1.3-0.5-2.5-0.5c-2.7,0-4.5,1.7-4.5,4.5c0,2.8,1.7,4.5,4.3,4.5c0.9,0,1.6-0.1,1.9-0.3
                    v-3.3h-2.2V44h3.7V49.4z"/>
                  <path d="M59,45c-0.1-1.6-0.2-3.4-0.2-4.8h0c-0.4,1.3-0.8,2.7-1.4,4.2l-2,5.4h-1.1l-1.8-5.3c-0.5-1.6-1-3-1.3-4.3h0
                    c0,1.4-0.1,3.2-0.2,4.9l-0.3,4.8h-1.4l0.8-11.1H52l1.9,5.4c0.5,1.4,0.8,2.6,1.1,3.8h0c0.3-1.1,0.7-2.3,1.2-3.8l2-5.4H60l0.7,11.1
                    h-1.4L59,45z"/>
                </g>
              </g>
            </svg>
          </span>
          <span class="slide-caption-title" v-html="slide.title.rendered"/>
          <span class="slide-caption-content hidden-xs" v-html="slide.content.rendered"/>
        </span>
      </router-link>
    </li>
  </ul>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'posts-slider',
    props: {
      data: {
        type: Array,
        required: true
      }
    },
    computed: {
      ...mapGetters(['isMobile'])
    }
  }
</script>
