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
        <div class="w-[20rem] flex flex-col relative h-full pb-24 start bg-grey rounded-r-lg mt-6">

          <div class="flex flex-col">
            <img class="w-16 mx-auto mt-6"
                 src="../assets/logo/fptplogo.png" alt="">
            <h1 class="text-color-text/95 p-2 text-center mt-2 mb-6 text-lg">
              Donne un peu, fais pas ta pub..
            </h1>
            <p class="text-color-text/60 p-2 text-center">
              Ce mois-ci, tu peux soutenir <a href="https://www.la-spa.fr">la SPA</a> en achetant un pixel pour 1€.
              <br>En échange tu pourras mettre un lien vers ton site ou ton réseau social.
            </p>
          </div>

          <SelectPicker v-model="color"/>


          <div class="w-100 p-2">
            <label>
              <span class="text-[#ED5355]"
              >Lien vers ton site/réseau</span>
              <input type="url"
                     v-model="urlInput"
                     class="w-full h-10 mt-2 p-2 border-[1px] border-[#ED5355] rounded mb-5 text-color-text/95"
                     placeholder="https://www.votresite.com"/>
            </label>
            <Payment :numberPixels="counter"
                     :pixelsModified="pixelsModified"
                     :pixelColors="pixelColors"
                     :urlInput="urlInput"/>
          </div>


          <div class="flex flex-row justify-between align-center absolute bottom-0 w-full">
            <a class="p-2"
               href="https://paulmarniquet.fr" aria-label="portfolio">
              <img
                  class="w-10 hover:animate-spin opacity-70 hover:opacity-100 transition-all duration-300"
                  src="../assets/logo/paul.svg" alt="">
            </a>
            <div class="flex flex-row items-center pr-3">
              <a href="https://johanncvl.com" aria-label="portfolio">
                <img class="w-10 hover:animate-spin opacity-70 hover:opacity-100 transition-all duration-300"
                     src="../assets/logo/johann.svg" alt="">
              </a>
            </div>
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
