<template>
  <main class="room opacity-80 hover:opacity-0 transition-opacity duration-300">
    <div class="relative bg-white rounded-full p-2 text-center text-xs text-gray-700 pointer-events-none">
      <p class="pointer-events-none">
        Il y a {{ others.length }} personne{{ others.length > 1 ? 's' : '' }} ici
      </p>
    </div>
  </main>
</template>

<script setup lang="ts">
import {createClient} from "@liveblocks/client";

const config = useRuntimeConfig();
const client = createClient({
  publicApiKey: config.public.LIVEBLOCKS_API_KEY,
});
const {room} = client.enterRoom("my-room", {initialPresence: {}});
const others = ref(room.getOthers());
const unsubscribeOthers = room.subscribe("others", (updatedOthers) => {
  others.value = updatedOthers as any;
});

onUnmounted(() => {
  unsubscribeOthers();
});

</script>

<style scoped>
main {
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 1;
}

main div {
  min-width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #3182ce;
  border-radius: 9999px;
}

main p {
  margin: 0;
  color: white;
  font-size: 12px;
}
</style>
