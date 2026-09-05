<template>
  <div class="slidev-layout df-titled">
    <slot />
    <Rail />
  </div>
</template>

<style scoped>
.df-titled {
  position: relative;
  display: flex;
  flex-direction: column;
  /* Centre the whole block. Top-aligned content leaves a dead band at the
     bottom of every slide, which reads as an unfinished layout on a 16:9 screen. */
  justify-content: center;
}
.df-titled :deep(h1) {
  font-size: 2.35rem;
  margin-bottom: 0.9rem;
}
.df-titled :deep(h2) {
  font-size: 1.5rem;
}
</style>
