<script setup lang="ts">

import {inject} from "vue";

const color = inject('color');
const counter = inject('counter');

import SelectPicker from "~/components/SelectPicker.vue";

</script>

<template>
  <div class="bg-pink w-100 h-100">
    <div class="w-[20rem] h-full flex flex-col justify-between bg-white rounded-r-lg h-20">
      <div class="flex flex-row justify-between align-center">
        <div class="w-10 h-10 bg-color-primary"></div>
        <div class="flex flex-row items-center pr-3">

          <a href="https://x.com/HugoRCD__?s=20" aria-label="Twitter">
            <LucideTwitter
                size="24"
                class="text-color-text cursor-pointer hover:text-color-primary"
            />
          </a>
        </div>
      </div>
      <SelectPicker v-model="color"/>

      <div class="flex-1">
        <p class="text-color-text/60 p-2 text-center">
          Consectetur ut magna elit culpa. Nisi ipsum laboris enim esse sunt irure labore amet id fugiat magna. Laborum aute incididunt excepteur velit laboris ad laborum occaecat ea voluptate aute sit. Ut ea amet magna pariatur nostrud veniam pariatur Lorem sunt ad tempor excepteur nostrud deserunt. Incididunt in ea pariatur ipsum duis proident fugiat.
        </p>
      </div>

      <div class="w-100 p-2">
        <label>
          <span class="text-color-primary/75">Lien de votre pixel</span>
          <input type="text" class="w-full h-10 border-[1px] border-color-primary rounded mb-5 text-color-text/75"
                 placeholder="https://test.com"/>
        </label>
        <div class="flex flex-row justify-between items-center mb-2">
          <span class="text-color-text/50 bold text-lg">Nombre de pixels : {{ counter }}</span>
          <span class="text-color-primary bold text-lg">{{ counter }}€</span>
        </div>
        <button
            class="w-full bg-color-primary/80 hover:bg-color-primary text-color-background font-bold py-3 px-4 rounded">
          Payer
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>