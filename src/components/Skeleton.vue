<script setup>
</script>

<template>
  <div class="skeleton">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
@keyframes skeleton-blink {
  50% {
    opacity: .6
  }
}

.skeleton {
  position: relative;
  background: var(--meng-inverse-color);
  animation: skeleton-blink 1.2s ease-in-out infinite;
}
</style>
