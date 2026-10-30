<script setup lang="ts">
// Slidev passes slide frontmatter to the layout as props, so `index: "01"`
// in the slide's frontmatter lands here.
defineProps<{ index?: string }>()
</script>

<template>
  <div class="slidev-layout df-section">
    <div class="df-section__body">
      <div v-if="index" class="df-section__index">Part {{ index }}</div>
      <slot />
      <div class="df-section__rule" />
    </div>
    <div class="df-section__logo"><DevFestLogo size="sm" on="dark" /></div>
  </div>
</template>

<style scoped>
/* Template section slide: solid Google blue, white centred title, short
   yellow rule. Ground is #1a73e8 so white body text clears WCAG AA. */
.df-section {
  position: relative;
  background: var(--df-section) !important;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.df-section__body {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 48rem;
}
.df-section__index {
  font-family: var(--df-sans);
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #fff;
  margin-bottom: 1rem;
}
.df-section :deep(h1) {
  color: #fff;
  font-size: 3.4rem;
  margin: 0;
}
.df-section :deep(p) {
  color: #fff;
  font-size: 1.15rem;
  margin-top: 1.4rem;
  max-width: 44ch;
}
.df-section__rule {
  order: 1;
  width: 72px;
  height: 5px;
  border-radius: 3px;
  background: var(--df-yellow);
  margin-top: 1.4rem;
}
.df-section__body :deep(h1) { order: 0; }
.df-section__body :deep(p) { order: 2; }
.df-section__logo {
  position: absolute;
  right: 2rem;
  bottom: 0.85rem;
}
</style>
