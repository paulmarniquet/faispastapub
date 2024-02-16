<script setup lang="ts">
import {createClient} from "@liveblocks/client";
import {onUnmounted, ref} from "vue";

const config = useRuntimeConfig();

const client = createClient({
  publicApiKey: config.public.LIVEBLOCKS_API_KEY as string,
});

const {room, leave} = client.enterRoom("my-room", {initialPresence: {}});

const others = ref(room.getOthers());

const unsubscribeOthers = room.subscribe("others", (updatedOthers) => {
  others.value = updatedOthers as any;
});

onUnmounted(() => {
  unsubscribeOthers();
});

</script>

<template>
  <div class="fixed bottom-0 right-0 bg-white p-2 rounded-lg shadow-md border border-inherit"
  >There are {{ others.length }} other user(s) online
  </div>
</template>

<style scoped>

</style>