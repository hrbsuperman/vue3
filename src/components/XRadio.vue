<template>
  <div class="x-radio">
    <label class="x-radio-input">
      <input type="radio" name="radio" />
      {{ label }}
    </label></div>
</template>

<script setup lang="ts">
const props = defineProps({
  label: { type: String || Object, default: null }
});

</script>

<style scoped lang="less">
.x-radio {
  display: inline-block;
  margin-right: 1em;

  .x-radio-input {
    height: var(--FormElementHeight);
    display: flex;
    align-items: center;
    gap: 0.35em;
    font-size: var(--fontsize);
    user-select: none;
  }


  input[type="radio"] {
    /* Add if not using autoprefixer */
    -webkit-appearance: none;
    /* Remove most all native input styles */
    appearance: none;
    /* For iOS < 15 */
    background-color: rgb(var(--theme-color));
    /* Not removed via appearance */
    margin: 0;
    color: currentColor;
    border: 2px solid rgb(var(--gray-7));
    border-radius: 50%;
    display: grid;
    place-content: center;
    width: 1.4em;
    height: 1.4em;
  }

  input[type="radio"]::before {
    content: "";
    width: 0.8em;
    height: 0.8em;
    border-radius: 50%;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em var(--theme-color);
  }

  input[type="radio"]:checked::before {
    transform: scale(1);
  }

}
</style>
