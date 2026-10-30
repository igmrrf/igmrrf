<template>
  <div class="slidev-layout df-thanks df-dark-scope">
    <Rail position="top" />
    <div class="df-thanks__inner"><slot /></div>
    <Rail position="bottom" />
  </div>
</template>

<style scoped>
.df-thanks {
  position: relative;
  overflow: hidden;
  background: var(--df-dark) !important;
  color: var(--df-on-dark);
  display: flex;
  align-items: center;
  padding: 2.5rem 4rem;
  --df-qr-caption: var(--df-on-dark-muted);
}
.df-thanks__inner {
  width: 100%;
}
.df-thanks :deep(h1) {
  color: var(--df-on-dark);
  font-size: 3.2rem;
}
.df-thanks :deep(p),
.df-thanks :deep(li) {
  color: var(--df-on-dark-muted);
}
.df-thanks :deep(strong) {
  color: var(--df-on-dark);
}
</style>
