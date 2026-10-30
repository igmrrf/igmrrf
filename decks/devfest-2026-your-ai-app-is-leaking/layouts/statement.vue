<template>
  <div class="slidev-layout df-statement">
    <div class="df-statement__body"><slot /></div>
    <SlideFooter />
  </div>
</template>

<style scoped>
/* One claim, set large and centred on white. */
.df-statement {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.df-statement__body {
  width: 100%;
}
.df-statement__body :deep(h1) {
  font-size: 2.7rem;
  line-height: 1.14;
  max-width: 24ch;
  margin: 0 auto 1.4rem;
}
.df-statement__body :deep(p) {
  font-size: 1.05rem;
  max-width: 56ch;
  margin: 1.1rem auto 0;
}
</style>
