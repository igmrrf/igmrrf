<script setup lang="ts">
/**
 * The "{ DevFest } Abuja 2026" lock-up from the DevFest Abuja 2026 template,
 * built in HTML/CSS so it stays crisp at any projector resolution and needs no
 * image asset. `size="lg"` stacks the pill under the wordmark (cover,
 * thank-you); `size="sm"` sets it on one line for the content-slide corner.
 * `on="dark"` for #202124 / blue grounds, `on="light"` for white slides.
 */
withDefaults(defineProps<{ size?: 'lg' | 'sm'; on?: 'dark' | 'light' }>(), {
  size: 'sm',
  on: 'light',
})
</script>

<template>
  <div class="dfl" :class="[`dfl--${size}`, `dfl--on-${on}`]" role="img" aria-label="DevFest Abuja 2026">
    <div class="dfl__mark">
      <span class="dfl__brace">{</span>
      <span class="dfl__word">DevFest</span>
      <span class="dfl__brace">}</span>
    </div>
    <span class="dfl__pill">Abuja 2026</span>
  </div>
</template>

<style scoped>
.dfl {
  display: inline-flex;
  align-items: center;
  font-family: 'Outfit', 'Roboto', sans-serif;
  line-height: 1;
  user-select: none;
}
.dfl__mark {
  display: inline-flex;
  align-items: center;
}
.dfl__brace {
  color: #fbbc04;
  font-weight: 600;
}
.dfl__word {
  font-weight: 700;
  letter-spacing: -0.01em;
}
.dfl__pill {
  display: inline-block;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  border-radius: 9999px;
  white-space: nowrap;
}

/* Colourways */
.dfl--on-dark .dfl__word { color: #ffffff; }
.dfl--on-dark .dfl__pill { background: #ffffff; color: #202124; }
.dfl--on-light .dfl__word { color: #202124; }
.dfl--on-light .dfl__pill { background: #202124; color: #ffffff; }

/* Large: stacked, centred */
.dfl--lg {
  flex-direction: column;
  gap: 0.9rem;
}
.dfl--lg .dfl__mark { font-size: 3.6rem; gap: 0.35rem; }
.dfl--lg .dfl__pill { font-size: 1rem; padding: 0.4rem 1.1rem; letter-spacing: 0.04em; }

/* Small: one line, corner mark */
.dfl--sm {
  flex-direction: row;
  gap: 0.4rem;
}
.dfl--sm .dfl__mark { font-size: 0.95rem; gap: 0.15rem; }
.dfl--sm .dfl__pill { font-size: 0.58rem; padding: 0.18rem 0.5rem; letter-spacing: 0.04em; }
</style>
