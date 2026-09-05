<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{ src: string; caption?: string; size?: number }>(),
  { size: 132 },
)

/**
 * The deck is built with a `--base` prefix when it is served from the
 * portfolio (`/decks/<slug>/`), so a root-absolute `/qr-talk.svg` 404s there
 * even though it resolves fine in `slidev dev`. Resolve against Vite's
 * BASE_URL so the same slide works in dev, in the standalone build, and under
 * the portfolio — the QR codes are the one asset that must not be broken on
 * stage.
 */
const resolved = computed(() => {
  if (/^(https?:)?\/\//.test(props.src) || props.src.startsWith('data:')) return props.src
  const base = import.meta.env.BASE_URL || '/'
  return `${base.replace(/\/$/, '')}/${props.src.replace(/^\//, '')}`
})
</script>

<template>
  <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem">
    <img
      :src="resolved"
      :width="size"
      :height="size"
      alt=""
      style="border-radius: 8px; background: #fff; padding: 6px; display: block"
    />
    <span
      v-if="caption"
      class="df-mono"
      style="font-size: 0.62rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--df-dim)"
    >
      {{ caption }}
    </span>
  </div>
</template>
