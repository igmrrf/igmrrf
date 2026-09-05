<script setup lang="ts">
// Slidev passes slide frontmatter to the layout as props, so `index: "01"`
// in the slide's frontmatter lands here.
defineProps<{ index?: string }>()
</script>

<template>
  <div class="slidev-layout df-section">
    <div v-if="index" class="df-section__index df-mono">{{ index }}</div>
    <div class="df-section__body"><slot /></div>
    <Rail />
  </div>
</template>

<style scoped>
.df-section {
  display: flex;
  align-items: center;
  gap: 3rem;
  position: relative;
}
/* Oversized numeral as a chapter marker — gives the audience a sense of
   position in a 45-minute talk without a progress bar they have to read. */
.df-section__index {
  font-size: 11rem;
  font-weight: 800;
  line-height: 0.8;
  letter-spacing: -0.06em;
  color: transparent;
  -webkit-text-stroke: 2px var(--df-accent);
  opacity: 0.8;
  flex: none;
}
.df-section__body {
  min-width: 0;
}
.df-section__body :deep(h1) {
  font-size: 3.2rem;
}
</style>
