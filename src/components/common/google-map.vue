<template>
  <iframe width="100%" height="160" frameborder="0" :src="'https://www.google.com/maps/embed?pb=' + pbcode"/>
</template>

<script>
  export default {
    name: 'google-map',
    props: {
      pbcode: {
        validator: prop => typeof prop === 'string' || prop === undefined,
        required: true
      }
    }
  }
</script>
