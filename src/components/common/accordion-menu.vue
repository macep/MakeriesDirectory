<template>
  <div class="panel-group" id="accordion" role="tablist" :aria-multiselectable="oneAtATime">
    <div class="panel panel-default">
      <div class="panel-heading" role="tab" id="heading-1">
        <h4 class="panel-title" :class="{'open': categoriesOpen}">
          <v-touch tag="a" @tap="categoriesOpen = !categoriesOpen" role="button" data-toggle="collapse" data-parent="#accordion" :aria-expanded="categoriesOpen" aria-controls="collapse-1">
            Categories
          </v-touch>
        </h4>
      </div>
      <div id="collapse-1" class="panel-collapse collapse" :class="{'in': categoriesOpen}" :style="panelStyle(categoriesOpen)" role="tabpanel" aria-labelledby="heading-1">
        <div class="panel-body">
          <ul>
            <li v-for="category in accData" :key="category.id">
              <router-link :to="journalByCatIdRoute(category.id)">{{category.name}}</router-link> ({{category.count}})
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading" role="tab" id="heading-2">
        <h4 class="panel-title" :class="{'open': archivesOpen}">
          <v-touch tag="a" @tap="archivesOpen = !archivesOpen" role="button" data-toggle="collapse" data-parent="#accordion" :aria-expanded="archivesOpen" aria-controls="collapse-2">
            Archives
          </v-touch>
        </h4>
      </div>
      <div id="collapse-2" class="panel-collapse collapse" :class="{'in': archivesOpen}" :style="panelStyle(archivesOpen)" role="tabpanel" aria-labelledby="heading-2">
        <div class="panel-body">
          <ul>
            <li>2015</li>
            <li>2016</li>
            <li>2017</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  const byCat = '/journal/category/'
  export default {
    name: 'accordion-menu',
    props: {
      oneAtATime: {
        type: Boolean,
        required: true
      },
      accData: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        categoriesOpen: true,
        archivesOpen: false
      }
    },
    methods: {
      journalByCatIdRoute (id) {
        return byCat + id
      },
      panelStyle (val) {
        return {
          height: val ? '' : '0'
        }
      }
    }
  }
</script>
