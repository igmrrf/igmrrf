<template>
  <div class="slidev-layout df-titled">
    <div class="df-titled__body"><slot /></div>
    <SlideFooter />
  </div>
</template>

<style scoped>
/* White content slide: heading top-left, content below, footer mark. */
.df-titled {
  position: relative;
  display: flex;
  flex-direction: column;
}
.df-titled__body {
  min-height: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
