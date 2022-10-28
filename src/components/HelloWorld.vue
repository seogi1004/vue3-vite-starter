<template>
  <h1>{{ props.msg }}</h1>
  <button type="button" @click="count++">count is: {{ count }}</button>
  <canvas ref="canvas" width="400" height="200"></canvas>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const props = defineProps<{
  msg: string;
}>();

const count = ref(0)
const canvas = ref<HTMLCanvasElement>();

onMounted(() => {
  if (!canvas.value) return;

  const offscreen = canvas.value?.transferControlToOffscreen();
  const worker = new Worker(
      new URL('../workers/HelloWorld.ts', import.meta.url),
      { type: 'module' }
  );
  worker.postMessage(
      {canvas: offscreen, width: canvas.value.width, height: canvas.value.height}, [offscreen]);
});
</script>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
