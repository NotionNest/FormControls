// src/components/FormControls/index.ts
import InputControl from "./InputControl.vue";
// import SelectControl from "./SelectControl.vue";
// import CheckboxControl from "./CheckboxControl.vue";

export interface FormComponentConfig {
  type: string; // 组件类型
  key: string; // 组件唯一标识
  label: string; // 标签名称
  placeholder?: string; // 占位符
  defaultValue?: any; // 默认值
  required?: boolean; // 是否必填
  width?: string; // 宽度（如 50%，300px）
  options?: Array<string>; // 下拉框或复选框的选项
  minLength?: number; // 最小长度（输入框）
  maxLength?: number; // 最大长度（输入框）
}

export const FormComponents = {
  InputControl,
  // SelectControl,
  // CheckboxControl,
};

export const ComponentOptions = [
  { label: "输入框", value: "InputControl" },
  { label: "下拉框", value: "SelectControl" },
  { label: "复选框", value: "CheckboxControl" },
];
