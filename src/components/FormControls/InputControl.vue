<template>
  <div>
    <label>{{ config.label }}</label>
    <input
      v-model="data[config.key]"
      type="text"
      :placeholder="config.placeholder"
      :maxlength="config.maxLength"
      :style="{ width: '100%' }"
    />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  config: { type: Object, required: true },
  data: { type: Object, required: true },
});
</script>
