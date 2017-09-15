<template>
  <transition name="fade" mode="out-in">
    <div id="showActivityIndicator" v-show="show" :class="show ? 'loading' : 'loaded'">
      <span class="activityImg">
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
           width="110" height="110" viewBox="0 0 90 90" style="enable-background:new 0 0 90 90;" xml:space="preserve">
          <g>
            <path d="M64.4,11.4L83.8,45L64.4,78.6H25.6L6.2,45l19.4-33.6H64.4 M65,10.4H25L5,45l20,34.6h40L85,45L65,10.4L65,10.4z"/>
            <path d="M45,6.2l33.6,19.4v38.8L45,83.8L11.4,64.4V25.6L45,6.2 M45,5L10.4,25v40L45,85l34.6-20V25L45,5L45,5z"/>
          </g>
        </svg>
      </span>
      <span class="activityTag" v-html="activityTag"/>
    </div>
  </transition>
</template>

<script>
  import Config from '../../api/app.config'

  export default {
    name: 'activity-indicator',
    props: {
      show: Boolean
    },
    data () {
      return {
        activityTag: Config.appTitleShort
      }
    }
  }
</script>
