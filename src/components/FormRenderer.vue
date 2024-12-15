<template>
  <div>
    <component
      v-for="(component, index) in components"
      :key="index"
      :is="componentMap[component.type]"
      :config="component"
      :data="data"
      class="form-item"
      :class="{ active: component.selected }"
      @click.stop="selectComponent(index)"
    />
  </div>
</template>

<script lang="ts" setup>
import { FormComponents } from "./FormControls";

const props = defineProps({
  components: { type: Array, required: true },
  data: { type: Object, required: true },
});

const emits = defineEmits(["selectComponent"]);
const componentMap = FormComponents;

const selectComponent = (index: number) => {
  emits("selectComponent", index);
};
</script>
<style scoped>
.form-item {
  padding: 8px;
  margin: 4px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}
.form-item.active {
  border-color: #007bff;
  background-color: #f0f8ff;
}
</style>
