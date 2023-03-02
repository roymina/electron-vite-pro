<script setup>
import tools from '@/composables/tools'
onMounted(() => {
  tools.testPrint()
})
</script>

<template>
  <!-- <Versions></Versions> -->
  <RouterView />
</template>
