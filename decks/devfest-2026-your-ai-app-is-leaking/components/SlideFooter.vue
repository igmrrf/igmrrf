<script setup lang="ts">
// Content-slide furniture: slide number bottom-left (so the room can say
// "go back to 13" during the hands-on), DevFest mark bottom-right.
import { useSlideContext } from '@slidev/client'

const { $page } = useSlideContext()
</script>

<template>
  <div class="df-footer">
    <span class="df-footer__no">{{ $page }}</span>
    <DevFestLogo size="sm" on="light" />
  </div>
</template>

<style scoped>
.df-footer {
  position: absolute;
  left: 3.25rem;
  right: 2rem;
  bottom: 0.85rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  pointer-events: none;
}
.df-footer__no {
  font-family: 'Roboto Mono', monospace;
  font-size: 0.7rem;
  font-weight: 500;
  color: #5f6368;
}
</style>
