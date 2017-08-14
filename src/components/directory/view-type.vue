<template>
  <div class="row no-gutter">
    <div class="col-xs-6">
      <v-touch tag="i" @tap="setViewType('list')" class="icon-list"/>
    </div>
    <div class="col-xs-6">
      <v-touch tag="i" @tap="setViewType('grid')" class="icon-grid"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'maker',
    methods: {
      setViewType (type) {
        this.$store.commit('mutateViewType', type)
      }
    }
  }
</script>
