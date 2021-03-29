<template>
  <div class="Vertical">
    <slot />
  </div>
</template>

<style>
.Vertical {
  display: grid;
  gap: 16px;
  grid-auto-rows: min-content;
}
.Vertical > * {
  justify-self: flex-start;
}
</style>
