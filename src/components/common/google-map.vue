<template>
  <iframe width="200" height="150" frameborder="0" style="border:0" :src="'https://www.google.com/maps/embed?pb=' + pbcode"/>
</template>

<script>
  export default {
    name: 'google-map',
    props: {
      pbcode: {
        type: String,
        required: true
      }
    }
  }
</script>
