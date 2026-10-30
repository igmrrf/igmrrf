<script setup lang="ts">
withDefaults(
  defineProps<{ value: string; label: string; tone?: 'blue' | 'red' | 'green' | 'yellow' }>(),
  { tone: 'blue' },
)
</script>

<template>
  <div class="df-card" :class="`df-card--${tone}`" style="padding: 0.9rem 1.1rem">
    <div
      class="df-head"
      style="font-size: 2.2rem; font-weight: 800; letter-spacing: -0.03em; line-height: 1"
      :style="{ color: `var(--df-${tone}-ink)` }"
    >
      {{ value }}
    </div>
    <div style="font-size: 0.8rem; color: var(--df-muted); margin-top: 0.4rem; line-height: 1.4">
      {{ label }}
    </div>
  </div>
</template>
