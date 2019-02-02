<template>
  <p v-if="collection.length > 0" :class="wrapClass">
    <span v-if="category">{{category}}:</span>
    <span v-for="(item, index) in collection" :key="index">
      {{item[name]}}
      <template v-if="index < collection.length - 1">, </template>
    </span>
  </p>
</template>

<script>
export default {
  name: 'Enum',
  props: {
    category: {
      type: String,
      require: false
    },
    collection: {
      type: Array,
      required: true,
      default: []
    },
    name: {
      type: String,
      require: false,
      default: 'name'
    },
    wrapClass: {
      type: String,
      require: false,
      default: 'list-item'
    }
  }
}
</script>
