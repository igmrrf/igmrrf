<template>
  <div class="slidev-layout df-cover">
    <div class="df-cover__glow" />
    <div class="df-cover__inner"><slot /></div>
    <Rail />
  </div>
</template>

<style scoped>
.df-cover {
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}
/* One soft bloom behind the title. Keeps the cover from reading as a flat slab
   without adding anything the projector has to resolve. */
.df-cover__glow {
  position: absolute;
  inset: -20% -10% auto -25%;
  height: 130%;
  background:
    radial-gradient(46% 52% at 22% 34%, rgba(234, 67, 53, 0.2), transparent 70%),
    radial-gradient(40% 46% at 68% 62%, rgba(66, 133, 244, 0.16), transparent 72%);
  filter: blur(6px);
  pointer-events: none;
}
.df-cover__inner {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
