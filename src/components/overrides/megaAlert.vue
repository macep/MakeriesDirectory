<template>
  <transition name="fade">
    <div v-show="val" :class="['alert', 'alert-'+type, placement]" :style="{width}" role="alert">
      <v-touch tag="button" v-show="dismissable" type="button" class="close" @tap="closeAction">
        <span>&times;</span>
      </v-touch>
      <slot/>
    </div>
  </transition>
</template>

<script>
  import {alert} from 'vue-strap'

  export default {
    name: 'megaAlert',
    extends: alert,
    props: {
      value: {
        type: Boolean,
        default: true
      },
      closeAction: {
        type: Function,
        default: () => {}
      }
    }
  }
</script>
