<script lang="ts" setup>
import { ref, reactive } from "vue";
import {
  FormComponents,
  ComponentOptions,
  FormComponentConfig,
} from "./FormControls";
import FormRenderer from "./FormRenderer.vue";
import ConfigPanel from "./ConfigPanel.vue";

const selectedComponent = ref("");
const componentOptions = ComponentOptions;

const formComponents = reactive([]);
const formData = reactive({});
const activeComponentIndex = ref<number | null>(null);

/**
 * 保存表单配置
 */
const saveFormConfig = () => {
  const configJSON = JSON.stringify(formComponents, null, 2);
  console.log("保存的表单配置：", configJSON);
};
const addComponent = () => {
  if (selectedComponent.value) {
    const key = `field_${formComponents.length + 1}`;
    const defaultConfig: FormComponentConfig = {
      type: selectedComponent.value,
      key,
      label: `${selectedComponent.value} 标签`,
      placeholder: "请输入内容",
      defaultValue: "",
      required: false,
      width: "100%",
    };

    // 根据组件类型追加特定配置
    if (selectedComponent.value === "SelectControl") {
      defaultConfig.options = ["选项1", "选项2"];
    } else if (selectedComponent.value === "InputControl") {
      defaultConfig.minLength = 0;
      defaultConfig.maxLength = 50;
    }

    formComponents.push(defaultConfig);
    formData[key] = defaultConfig.defaultValue;

    // formComponents.push({
    //   type: selectedComponent.value,
    //   key,
    //   label: `${selectedComponent.value} 标签`,
    //   placeholder: `占位符`,
    //   required: false,
    //   selected: false,
    // });
    // formData[key] = "";
  }
};

const selectComponent = (index: number) => {
  if (activeComponentIndex.value !== null) {
    formComponents[activeComponentIndex.value].selected = false;
  }

  activeComponentIndex.value = index;
  formComponents[index].selected = true;
};
</script>

<template>
  <div>
    <h3>表单编辑器</h3>
    <div>
      <label>选择组件：</label>
      <select v-model="selectedComponent">
        <option
          v-for="option in componentOptions"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
      <button @click="addComponent">添加组件</button>
      <div class="toolbar">
        <button @click="saveFormConfig">保存配置</button>
      </div>
    </div>
    <div class="form-preview">
      <h4>表单预览</h4>
      <FormRenderer
        :components="formComponents"
        :data="formData"
        @select-component="selectComponent"
      />
    </div>

    <div class="config-area">
      <ConfigPanel
        :components="formComponents"
        :active-index="activeComponentIndex"
      />
      2
    </div>
  </div>
</template>

<style scoped>
.form-editor {
  display: flex;
  flex-direction: column;
}
.editor {
  display: flex;
}
.form-preview {
  flex: 1;
  margin-right: 16px;
}
.config-area {
  width: 300px;
}
</style>
