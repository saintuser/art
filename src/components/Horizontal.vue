<template>
  <div class="Horizontal">
    <slot />
  </div>
</template>

<style>
.Horizontal {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(8px, 5vw, 64px);
}

@media (max-width: 800px) {
  .Horizontal {
    grid-template-columns: 1fr;
  }
}
</style>
