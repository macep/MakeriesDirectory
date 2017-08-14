<template>
  <div id="view-type" class="row no-gutter">
    <div class="col-xs-6">
      <v-touch tag="i" :class="{'active': viewType === 'list'}" @tap="setViewType('list')" class="icon-list"/>
    </div>
    <div class="col-xs-6">
      <v-touch tag="i" :class="{'active': viewType === 'grid'}" @tap="setViewType('grid')" class="icon-grid"/>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'maker',
    computed: {
      ...mapGetters(['viewType']),
      activeViewType () {
        return this.viewType
      }
    },
    methods: {
      setViewType (type) {
        this.$store.commit('mutateViewType', type)
      }
    }
  }
</script>
