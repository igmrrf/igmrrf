<script setup lang="ts">
// White card with a 3px coloured top border, per the DevFest template.
// `icon` takes an UnoCSS icon class, e.g. icon="i-ph-lock-key-bold".
withDefaults(
  defineProps<{ tone?: 'blue' | 'red' | 'green' | 'yellow' | 'plain'; title?: string; icon?: string }>(),
  { tone: 'plain' },
)

const ink: Record<string, string> = {
  red: 'var(--df-red-ink)',
  green: 'var(--df-green-ink)',
  yellow: 'var(--df-yellow-ink)',
  blue: 'var(--df-blue-ink)',
  plain: 'var(--df-muted)',
}
</script>

<template>
  <div class="df-card" :class="tone !== 'plain' && `df-card--${tone}`">
    <div v-if="title" class="df-card__title">
      <span v-if="icon" class="df-card__icon" :class="icon" :style="{ color: ink[tone] }" aria-hidden="true" />
      <span>{{ title }}</span>
    </div>
    <slot />
  </div>
</template>
