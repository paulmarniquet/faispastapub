<script setup>
import Payment from "~/components/Payment.vue";
import Pixel from "~/components/Pixel.vue";
import {inject} from 'vue'
import Room from "~/components/Room.vue";
import SelectPicker from "~/components/SelectPicker.vue";

const colorPicker = inject('color');
const counter = inject('counter');
const config = useRuntimeConfig();
const urlInput = ref('');
const pixelColors = ref([]);
const pixelsModified = ref([]);
const pixelArray = ref([]);

onBeforeMount(async () => {
  await successPayment();
  await getPixels();
  handleLinks();
});

function handleLinks() {
  const links = document.querySelectorAll('.color-picker a');
  links.forEach(link => {
    if (link.href === "https://www.paulmarniquet.fr/") {
      link.style.pointerEvents = 'none';
    }
  });
}

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
  if (pixelColors.value[id] === 'white') {
    counter.value++;
    pixelColors.value[id] = color;
    pixelsModified.value.push(id);
  } else if (pixelColors.value[id] !== color && color === 'white') {
    counter.value--;
    pixelColors.value[id] = 'white';
    pixelsModified.value = pixelsModified.value.filter(pixel => pixel !== id);
  }
}
</script>
<template>
  <div class="bg-pink w-full h-full flex flex-row">
    <div class="sidebar w-1/4 border-2 border-gray-200 rounded-xl flex justify-center">
      <div class="fixed">
        <div class="w-[20rem] flex flex-col start bg-grey rounded-r-lg h-20 mt-6">

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

        <div class="flex">
          <p class="text-color-text/60 p-2 text-center my-4">
            Bienvenue sur la page à 1 million.
            <br>Ici vous pouvez acheter des pixels pour 1€ l'unité dans le but de
            participer à un projet communautaire.
          </p>
        </div>

        <SelectPicker v-model="color"/>


        <div class="w-100 p-2">
          <label>
            <span class="text-color-primary/75">Lien de votre pixel</span>
            <input type="url"
                   v-model="urlInput"
                   class="w-full h-10 mt-2 p-2 border-[1px] border-color-primary rounded mb-5 text-color-text/75"
                   placeholder="https://www.votresite.com"/>
          </label>
          <Payment :numberPixels="counter"
                   :pixelsModified="pixelsModified"
                   :pixelColors="pixelColors"
                   :urlInput="urlInput"
          />

        </div>
      </div>
      </div>
    </div>

    <div class="grid" ref="grid">
      <Pixel v-for="(color, index) in pixelColors" :key="index" :id="index + 1"
             :initialColor="color"
             :selectedColor="colorPicker"
             :url="pixelArray[index].url"
             @changeColor="changeColor"
      />
    </div>
  </div>
  <Room/>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10px, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(10px, 1fr));
  width: 75%;
}
</style>
