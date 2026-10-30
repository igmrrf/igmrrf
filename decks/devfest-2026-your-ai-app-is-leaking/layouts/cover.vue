<template>
  <div class="slidev-layout df-cover df-dark-scope">
    <Rail position="top" />
    <div class="df-cover__inner"><slot /></div>
    <Rail position="bottom" />
  </div>
</template>

<style scoped>
/* Template cover: #202124 ground, Google four-colour bars top and bottom,
   centred DevFest lock-up. */
.df-cover {
  position: relative;
  overflow: hidden;
  background: var(--df-dark) !important;
  color: var(--df-on-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2.5rem 4rem;
}
.df-cover__inner {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.df-cover :deep(h1) {
  color: var(--df-on-dark);
  font-size: 3.6rem;
  margin: 0;
}
.df-cover :deep(p) {
  color: var(--df-on-dark-muted);
}
.df-cover :deep(strong) {
  color: var(--df-on-dark);
}
</style>
