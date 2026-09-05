<template>
  <div class="slidev-layout df-statement">
    <div class="df-statement__body"><slot /></div>
    <Rail />
  </div>
</template>

<style scoped>
.df-statement {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
}
/* One sentence, set large. Used for the three or four moments in the talk that
   should land as a claim rather than as information. */
.df-statement__body :deep(h1),
.df-statement__body :deep(h2) {
  font-size: 2.9rem;
  line-height: 1.16;
  max-width: 20ch;
  margin: 0 auto;
  letter-spacing: -0.035em;
}
.df-statement__body :deep(p) {
  font-size: 1rem;
  max-width: 52ch;
  margin: 1.25rem auto 0;
}
</style>
