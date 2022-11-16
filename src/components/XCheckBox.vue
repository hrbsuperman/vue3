<template>
  <div class="x-checkbox">
    <label class="x-checkbox-input">
      <input type="checkbox" name="checkbox" />
      {{ label }}
    </label>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  label: { type: String || Object, default: null }
});

</script>

<style lang="less" scoped>
.x-checkbox {
  display: inline-block;
  margin-right: 1em;

  .x-checkbox-input {
    display: flex;
    align-items: center;
    gap: 0.35em;
    user-select: none;
    height: var(--FormElementHeight);
    font-size: var(--fontsize);
  }

  .x-checkbox-input:disabled {
    color: var(--gray-4);
    cursor: not-allowed;
  }

  input[type="checkbox"] {
    /* Add if not using autoprefixer */
    -webkit-appearance: none;
    /* Remove most all native input styles */
    appearance: none;
    /* For iOS < 15 */
    background-color: rgb(var(--theme-color));
    /* Not removed via appearance */
    margin: 0;

    font: inherit;
    width: 1.15em;
    height: 1.15em;
    border: 2px solid var(--gray-6);
    border-radius: 0.15em;
    display: grid;
    place-content: center;

  }

  input[type="checkbox"]::before {
    content: "";
    width: 0.65em;
    height: 0.65em;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
    transform: scale(0);
    transform-origin: bottom left;
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em rgba(var(--theme),0.9);
  }

  input[type="checkbox"]:checked::before {
    transform: scale(1);
  }

  input[type="checkbox"]:disabled {
    color: var(--gray-4);
    cursor: not-allowed;
  }
}
</style>
