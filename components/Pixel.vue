<template>
  <div :id="id"
       @click="handleClick"
       :style="{ backgroundColor: color }"
       class="border-[0.1px] bg-white color-picker">
    <a v-if="!props.editMode" :href="props.url" aria-label="pixel"></a>
  </div>
</template>

<script setup>
const props = defineProps({
  id: Number,
  url: String,
  initialColor: String,
  selectedColor: String,
  editMode: Boolean,
});

const emits = defineEmits(['changeColor']);
const selected = ref(false);
const updatingColor = ref(false);
const color = ref(props.initialColor);

function handleClick() {
  if (props.editMode) {
    if (color.value === 'white') {
      updatingColor.value = true;
      color.value = !selected.value ? props.selectedColor : 'white';
      emits('changeColor', {id: props.id, color: color.value});
      selected.value = !selected.value;
      updatingColor.value = false;
    } else {
      if (color.value === props.selectedColor) {
        updatingColor.value = true;
        color.value = 'white';
        emits('changeColor', {id: props.id, color: color.value});
        selected.value = false;
        updatingColor.value = false;
      }
    }
  }
}
</script>


<style scoped>
.color-picker a {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
}

.color-picker {
  width: 20px;
  height: 20px;
}
</style>
