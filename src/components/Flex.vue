<template>
  <div class="Flex"><slot /></div>
</template>

<style>
.Flex {
  display: inline-grid;
  gap: 8px;
  grid-auto-flow: column;
  align-items: center;
}
</style>
