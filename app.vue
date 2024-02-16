<script setup lang="ts">
import {provide} from 'vue'

const color = ref('#FF0000')
const counter = ref(0);
provide('color', color)
provide('counter', counter)

</script>

<template>
  <Html lang="en">
  <title>
    La page à un million
  </title>
  <meta name="description" content="La page qui valait 1 million"/>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" href="public/favicon.ico">
  <Body class="selection:bg-neutral-200 dark:selection:bg-neutral-700 bg-color-background relative">
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
  </Body>
  </Html>
</template>
