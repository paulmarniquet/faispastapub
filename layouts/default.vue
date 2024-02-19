<script setup lang="ts">
const color = defineModel({required: true});
</script>

<template>
  <div class="flex w-100 h-100 pt-4 max-layout-width relative bg-color-background">
    <div class="flex-1">
      <slot/>
    </div>
  </div>
</template>

<style scoped>

</style>