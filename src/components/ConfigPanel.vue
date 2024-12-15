<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps<{
  components: any[];
  activeIndex: number | null;
}>();

const activeComponent = computed(() => {
  return props.activeIndex !== null
    ? props.components[props.activeIndex]
    : null;
});

const optionsInput = ref("");
const updateOptions = () => {
  if (activeComponent.value && optionsInput.value) {
    activeComponent.value.options = optionsInput.value
      .split("\n")
      .map((opt) => opt.trim());
  }
};
</script>
<template>
  <div v-if="activeComponent" class="config-panel">
    <h4>配置面板</h4>
    <div>
      <label>标签名称：</label>
      <input v-model="activeComponent.label" type="text" />
    </div>
    <div>
      <label>占位符：</label>
      <input v-model="activeComponent.placeholder" type="text" />
    </div>
    <div>
      <label>默认值：</label>
      <input v-model="activeComponent.defaultValue" type="text" />
    </div>
    <div>
      <label>宽度：</label>
      <input
        v-model="activeComponent.width"
        type="text"
        placeholder="例如：50% 或 300px"
      />
    </div>
    <div>
      <label>是否必填：</label>
      <input v-model="activeComponent.required" type="checkbox" />
    </div>

    <!-- 特定属性 -->
    <div v-if="activeComponent.type === 'InputControl'">
      <h5>输入框属性</h5>
      <div>
        <label>最小长度：</label>
        <input v-model="activeComponent.minLength" type="number" />
      </div>
      <div>
        <label>最大长度：</label>
        <input v-model="activeComponent.maxLength" type="number" />
      </div>
    </div>

    <div v-if="activeComponent.type === 'SelectControl'">
      <h5>下拉框属性</h5>
      <div>
        <label>选项列表：</label>
        <textarea v-model="optionsInput" rows="3"></textarea>
        <button @click="updateOptions">更新选项</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.config-panel {
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
}
</style>
