<template>
  <div class="flex flex-col justify-between bg-white">
    <div class="flex flex-center justify-start w-screen">
      <div class="w-1/4 flex flex-col justify-items-start items-center">
        <div>
          <SelectPicker v-model="selectedColor"/>
          <input type="text" v-model="urlInput" class="w-full h-10 border-2 border-black rounded-lg"/>
          <p>{{ counter }} euros</p>
          <!--
                    <p>Modified Pixels: {{ pixelsModified }}</p>
          -->
          <button v-if="editMode" @click="updatePixels"
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Envoyer
          </button>
          <button @click="editModeTrue" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Editer
          </button>
        </div>
      </div>
      <div class="grid" ref="grid">
        <Pixel v-for="(color, index) in pixelColors" :key="index" :id="index + 1"
               :initialColor="color"
               :selectedColor="selectedColor"
               :editMode="editMode"
               :url="pixelArray[index].url"
               @changeColor="changeColor"
        />
      </div>


    </div>
  </div>
</template>

<script setup>
import SelectPicker from "~/components/SelectPicker.vue";
import Pixel from "~/components/Pixel.vue";
const config = useRuntimeConfig();

const selectedColor = ref('');
const urlInput = ref('');
const pixelColors = ref([]);
const counter = ref(0);
const pixelsModified = ref([]);
let editMode = ref(false);
const pixelArray = ref([]);

onBeforeMount(() => {
  getPixels();
});

async function getPixels() {
  const pixels = await fetch(config.public.API_URL + '/api/pixels',
      {
        mode: 'cors',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
  );
  const pixelsJson = await pixels.json();
  pixelArray.value = pixelsJson;
  pixelColors.value = pixelsJson.map(pixel => pixelArray.value[pixel.id - 1].color);
}

function editModeTrue() {
  editMode.value = !editMode.value;
}

function initPixels() {
  for (let i = 0; i < 100; i++) {
    fetch(config.public.API_URL + '/api/pixels', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        color: 'white',
        url: 'https://www.paulmarniquet.fr'
      })
    });
  }
}

function updatePixels() {
  for (let i = 0; i < pixelsModified.value.length; i++) {
    fetch(config.public.API_URL + '/api/pixels/' + pixelsModified.value[i], {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        color: pixelColors.value[pixelsModified.value[i]],
        url: urlInput.value || 'https://www.paulmarniquet.fr'
      })
    });
  }
}

function changeColor({id, color}) {
  if (editMode.value) {
    if (pixelColors.value[id] === 'white') {
      pixelColors.value[id] = color;
      counter.value++;
      pixelsModified.value.push(id);
    } else {
      pixelColors.value[id] = 'white';
      counter.value--;
      pixelsModified.value = pixelsModified.value.filter(pixel => pixel !== id);
    }
  }
}
</script>

<style scoped>

.grid {
  grid-template-columns: repeat(50, 1fr);
  grid-template-rows: repeat(100, 1fr);
}

</style>
