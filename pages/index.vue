<script setup>
import Payment from "~/components/Payment.vue";
import Pixel from "~/components/Pixel.vue";
import {inject} from 'vue'

const colorPicker = inject('color');
const counter = inject('counter');

const config = useRuntimeConfig();
const urlInput = ref('');
const pixelColors = ref([]);
const pixelsModified = ref([]);
let editMode = ref(false);
const pixelArray = ref([]);

onBeforeMount(async () => {
  await successPayment();
  await getPixels();
});

async function getPixels() {
  try {
    const pixelsResponse = await fetch(config.public.API_URL + '/api/pixels', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const pixelsJson = await pixelsResponse.json();
    pixelArray.value = pixelsJson;
    pixelColors.value = pixelsJson.map(pixel => pixelArray.value[pixel.id - 1].color);
  } catch (error) {
    console.error("Erreur lors de la récupération des pixels:", error);
  }
}

function editModeTrue() {
  editMode.value = !editMode.value;
}

async function successPayment() {
  const url = window.location.href;
  if (url.includes('payment=success') && localStorage.getItem('pixels') !== null) {
    const match = url.match(/[?&]pid=(\d+)/);
    const payment = await fetch(config.public.API_URL + '/api/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pid: match[1],
      })
    });
    if (payment.status === 200) {
      const pixels = JSON.parse(localStorage.getItem('pixels'));
      await fetch(config.public.API_URL + '/api/pixels', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pixels)
      });
      localStorage.removeItem('pixels');
    } else {
      console.error('Erreur lors de la validation du paiement');
    }
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

<template>
  <div
      class="h-screen flex flex-col justify-between bg-white rounded-tl-lg overflow-hidden shadow-md border border-inherit">
    <div class="flex flex-center justify-start w-screen">
      <div class="w-1/4 flex flex-col justify-items-start items-center">
        <div>
          <input type="url"
                 placeholder="https//www.votresite.com"
                 v-model="urlInput"
                 class="w-full h-10 border-2 border-black rounded-lg p-2"/>

          <button @click="editModeTrue" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Editer
          </button>
          <Payment :number-pixels="counter"
                   :pixelsModified="pixelsModified"
                   :pixelColors="pixelColors"
                   :urlInput="urlInput"
          />
        </div>
      </div>
      <div class="grid" ref="grid">
        <Pixel v-for="(color, index) in pixelColors" :key="index" :id="index + 1"
               :initialColor="color"
               :selectedColor="colorPicker"
               :editMode="editMode"
               :url="pixelArray[index].url"
               @changeColor="changeColor"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid {
  grid-template-columns: repeat(50, 1fr);
  grid-template-rows: repeat(100, 1fr);
}
</style>
