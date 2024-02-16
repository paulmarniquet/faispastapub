<script setup lang="ts">
import {inject} from 'vue'

const color = inject('color');

const eventSidePannel = ref(true);

const toggleColorPicker = () => {
  showColorPicker.value = !showColorPicker.value;
};
const setColor = (e: { target: { value: unknown; }; }) => {
  color.value = e.target.value;
};
const showColorPicker = ref(false);

</script>

<template>
  <div
      class="left-0 bg-white rounded-r-lg h-20 flex flex-row w-[3rem]'">

    <div class="color-picker">
      <div class="color-picker-content">
        <input type="color" v-model="color" @input="setColor">
      </div>
    </div>

  </div>
</template>

<style scoped>

.color-picker {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.color-picker-content {
  z-index: 1000;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
}
</style>