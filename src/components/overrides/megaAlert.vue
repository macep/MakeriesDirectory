<template>
  <transition name="fade">
    <div v-show="val" :class="['alert', 'alert-'+type, placement]" :style="{width}" role="alert">
      <button v-show="dismissable" type="button" class="close" @click="closeAction">
        <span>&times;</span>
      </button>
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
