<template>
  <div class="slidev-layout df-compare df-compare-scope">
    <div class="df-compare__head"><slot name="head" /></div>
    <div class="df-compare__grid">
      <div class="df-compare__col"><slot name="left" /></div>
      <div class="df-compare__col"><slot name="right" /></div>
    </div>
    <div class="df-compare__foot"><slot /></div>
    <SlideFooter />
  </div>
</template>

<style scoped>
/* Two-column comparison (e.g. vulnerable vs hardened), template style. */
.df-compare {
  position: relative;
  display: flex;
  flex-direction: column;
}
.df-compare__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  min-height: 0;
  margin-top: 0.4rem;
}
.df-compare__col {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
</style>
