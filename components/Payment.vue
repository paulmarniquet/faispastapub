<template>
  <div>
    <button @click="openPaymentForm" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Payer
    </button>
  </div>
</template>

<script setup="ts">
import {defineProps, defineEmits} from 'vue';
import {loadStripe} from "@stripe/stripe-js";

const emits = defineEmits(['payment-successful']);
const config = useRuntimeConfig();
const props = defineProps({
  numberPixels: Number,
  pixelsModified: Array,
  pixelColors: Array,
  urlInput: String,
});

async function openPaymentForm() {
  const finalArrayPixels = props.pixelsModified.map(i => ({
    id: i,
    color: props.pixelColors[i],
    url: props.urlInput || 'https://www.paulmarniquet.com',
  }));

  const pid = Math.floor(Math.random() * 10000000);
  localStorage.setItem('pixels', JSON.stringify(finalArrayPixels));

  const stripe = await loadStripe(config.public.STRIPE_SECRET_KEY);
  const response = await stripe.redirectToCheckout({
    lineItems: [{
      price: config.public.PRICE_ID,
      quantity: props.numberPixels,
    }],
    successUrl: config.public.API_URL + '?payment=success?pid=' + pid,
    cancelUrl: config.public.API_URL + '?payment=cancel',
    clientReferenceId: pid.toString(),
    mode: 'payment',
    locale: 'fr',
  });
}
</script>
