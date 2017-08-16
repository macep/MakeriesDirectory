<template>
  <div class="starred-number">
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 90 90" style="enable-background:new 0 0 90 90;" xml:space="preserve">
    <g>
      <path d="M64.4,11.4L83.8,45L64.4,78.6H25.6L6.2,45l19.4-33.6L64.4,11.4 M65,10.4H25L5,45l20,34.6h40L85,45L65,10.4L65,10.4z"/>
      <path d="M45,6.2l33.6,19.4v38.8L45,83.8L11.4,64.4V25.6L45,6.2 M45,5L10.4,25v40L45,85l34.6-20V25L45,5L45,5z"/>
    </g>
    <text transform="matrix(1 0 0 1 38.3044 55.908)">{{text}}</text>
    </svg>
  </div>
</template>

<script>
  export default {
    name: 'starred-item',
    props: ['text']
  }
</script>
