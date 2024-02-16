<script setup>
import {createClient} from "@liveblocks/client";
import WebSocket from "ws";

const config = useRuntimeConfig();

const client = createClient({
  polyfills: {
    fetch,
    WebSocket,
  },
  publicApiKey: config.public.LIVEBLOCKS_API_KEY,
});

const {room, leave} = client.enterRoom("my-room", {
  initialPresence: {}
});

const others = ref(room.getOthers());
const myPresence = ref(room.getPresence());

const unsubscribeOthers = room.subscribe("others", (updatedOthers) => {
  others.value = updatedOthers;
});

const unsubscribePresence = room.subscribe("my-presence", (updatedPresence) => {
  myPresence.value = updatedPresence;
});

onUnmounted(() => {
  unsubscribePresence();
  unsubscribeOthers();
});

function handlePointerMove(event) {
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

<template>
  <main @pointerleave="handlePointerLeave" @pointermove="handlePointerMove" class="relative h-full w-full bg-gray-100">
    <div class="text">
      {{
        myPresence?.cursor
            ? `${myPresence.cursor.x} × ${myPresence.cursor.y}`
            : "Move your cursor to broadcast its position to other people in the room."
      }}
    </div>

    <template v-for="{ connectionId, myPresence } in others">
      <Cursor
          v-if="myPresence.cursor"
          :color="COLORS[connectionId % COLORS.length]"
          :x="myPresence.cursor.x"
          :y="myPresence.cursor.y"
      />
    </template>
  </main>
</template>

<style scoped>

</style>