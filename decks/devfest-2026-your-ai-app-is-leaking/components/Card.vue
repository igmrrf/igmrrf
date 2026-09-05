<script setup lang="ts">
withDefaults(
  defineProps<{ tone?: 'blue' | 'red' | 'green' | 'yellow' | 'plain'; title?: string }>(),
  { tone: 'plain' },
)
</script>

<template>
  <div class="df-card" :class="tone !== 'plain' && `df-card--${tone}`">
    <div
      v-if="title"
      class="df-card__title"
      :style="{
        color: {
          red: 'var(--df-red-soft)',
          green: 'var(--df-green-soft)',
          yellow: 'var(--df-yellow-soft)',
          blue: 'var(--df-blue-soft)',
          plain: 'var(--df-text)',
        }[tone],
      }"
    >
      {{ title }}
    </div>
    <slot />
  </div>
</template>
