<script setup lang="ts">
// Four-colour Google bar used top and bottom on the cover and thank-you slides.
withDefaults(defineProps<{ position?: 'top' | 'bottom' }>(), { position: 'bottom' })
</script>

<template>
  <div class="df-rail" :class="`df-rail--${position}`" aria-hidden="true">
    <span /><span /><span /><span />
  </div>
</template>

<style scoped>
.df-rail {
  position: absolute;
  left: 0;
  right: 0;
  height: 8px;
  display: flex;
}
.df-rail--top { top: 0; }
.df-rail--bottom { bottom: 0; }
.df-rail span { flex: 1; }
.df-rail span:nth-child(1) { background: #4285f4; }
.df-rail span:nth-child(2) { background: #ea4335; }
.df-rail span:nth-child(3) { background: #fbbc04; }
.df-rail span:nth-child(4) { background: #34a853; }
</style>
