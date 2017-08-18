<template>
  <div id="view-type" class="row no-gutter">
    <div class="col-xs-6">
      <v-touch tag="i" :class="{'active': viewType === 'grid'}" @tap="setViewType('grid')" title="grid view" class="icon-view_module"/>
    </div>
    <div class="col-xs-6">
      <v-touch tag="i" :class="{'active': viewType === 'list'}" @tap="setViewType('list')" title="list view" class="icon-view_list"/>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'maker-details',
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
