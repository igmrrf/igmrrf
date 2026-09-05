<script setup lang="ts">
withDefaults(
  defineProps<{ value: string; label: string; tone?: 'blue' | 'red' | 'green' | 'yellow' }>(),
  { tone: 'blue' },
)
</script>

<template>
  <div class="df-card" style="padding: 1rem 1.15rem">
    <div
      class="df-mono"
      style="font-size: 2.1rem; font-weight: 800; letter-spacing: -0.04em; line-height: 1"
      :style="{ color: `var(--df-${tone})` }"
    >
      {{ value }}
    </div>
    <div style="font-size: 0.74rem; color: var(--df-muted); margin-top: 0.45rem; line-height: 1.4">
      {{ label }}
    </div>
  </div>
</template>
