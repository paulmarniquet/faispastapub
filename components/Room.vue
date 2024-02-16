<template>
  <main class="room" @pointerleave="handlePointerLeave" @pointermove="handlePointerMove">
    <template v-for="{ connectionId, presence } in others">
      <Cursor
          v-if="presence.cursor!"
          :color="COLORS[connectionId % COLORS.length]"
          :x="presence.cursor.x!"
          :y="presence.cursor.y!"
      />
    </template>
  </main>
</template>

<script setup lang="ts">
import {createClient} from "@liveblocks/client";
import {decode} from "base-64";

const config = useRuntimeConfig();

const client = createClient({
  throttle: 17,
  publicApiKey: config.public.LIVEBLOCKS_API_KEY,
  polyfills: {
    fetch: fetch as any,
    atob(base64: string) {
      return decode(base64);
    },
  },
});

const {room, leave} = client.enterRoom("my-room", {initialPresence: {}});

const presence = ref(room.getPresence());
const others = ref(room.getOthers());
const unsubscribeOthers = room.subscribe("others", (updatedOthers) => {
  others.value = updatedOthers as any;
});
const unsubscribePresence = room.subscribe("my-presence", (updatedPresence) => {
  presence.value = updatedPresence;
});

onUnmounted(() => {
  unsubscribePresence();
  unsubscribeOthers();
});

function handlePointerMove(event: MouseEvent) {
  room.updatePresence({
    cursor: {
      x: Math.round(event.clientX),
      y: Math.round(event.clientY),
    },
  });
}

function handlePointerLeave() {
  room.updatePresence({
    cursor: null,
  });
}

const COLORS = [
  "#E57373",
  "#9575CD",
  "#4FC3F7",
  "#81C784",
  "#FFF176",
  "#FF8A65",
  "#F06292",
  "#7986CB",
];

</script>

<style scoped>
main {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  place-content: center;
  place-items: center;
  touch-action: none;
  z-index: 0;
}
</style>