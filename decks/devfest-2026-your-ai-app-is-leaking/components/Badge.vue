<script setup lang="ts">
withDefaults(defineProps<{ tone?: 'blue' | 'red' | 'green' | 'yellow' | 'ghost' }>(), {
  tone: 'ghost',
})
</script>

<template>
  <span class="df-badge" :class="`df-badge--${tone}`"><slot /></span>
</template>
