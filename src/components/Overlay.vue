<template>
  <div class="Overlay">
    <div>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.Overlay {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: var(--bgdark);
  opacity: 0.9;
  padding: 24px;
}
.Overlay > * {
  display: grid;
  gap: 16px;
  text-align: center;
  justify-content: center;
  grid-auto-columns: 320px;
}
</style>
