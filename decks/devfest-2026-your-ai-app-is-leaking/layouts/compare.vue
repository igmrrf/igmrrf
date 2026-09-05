<template>
  <div class="slidev-layout df-compare df-compare-scope">
    <div class="df-compare__head">
      <slot name="head" />
    </div>
    <div class="df-compare__grid">
      <div class="df-compare__col df-compare__col--left"><slot name="left" /></div>
      <div class="df-compare__col df-compare__col--right"><slot name="right" /></div>
    </div>
    <Rail />
  </div>
</template>

<style scoped>
.df-compare {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.df-compare__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.4rem;
  min-height: 0;
  margin-top: 1.1rem;
}
/* A hairline seam between the two halves so the comparison reads as one object
   split in two, rather than two unrelated cards sitting near each other. */
.df-compare__col {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}
.df-compare__col--left { padding-right: 1.4rem; border-right: 1px solid var(--df-border); }
.df-compare__col--right { padding-left: 0; }
.df-compare :deep(h1) { font-size: 2.2rem; }
</style>
