<template>
  <div class="Centered">
    <slot />
  </div>
</template>

<style>
.Centered {
  display: grid;
  gap: 16px;
  text-align: center;
  justify-content: center;
  align-content: center;
  grid-auto-rows: min-content;
}
.Centered > * {
  justify-self: center;
}
</style>
