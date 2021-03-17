<template>
  <div class="Button"><slot /></div>
</template>

<style scoped>
.Button {
  display: inline-grid;
  place-items: center;
  border-radius: 100px;
  padding: 0 16px;
  font-family: "Nunito Sans", sans-serif;
  font-size: 16px;
  font-weight: bold;
  height: 48px;
  background: none;
  outline: none;
  text-decoration: none;
  cursor: pointer;
  border: 2px solid var(--fg);
  background: var(--bg);
  color: var(--fg);
}
</style>
