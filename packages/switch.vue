<template>
  <div class="hm-switch" :class="{ 'is-checked': value }" @click="handleClick">
    <input class="hm-switch__input" type="checkbox" :name="name" ref="input" />
    <span class="hm-switch__core" ref="core">
      <span class="hm-switch__button"></span>
    </span>
  </div>
</template>

<script>
import {ref, nextTick, onmounted} from "vue";
export default {
  name: "XhhSwitch",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    activeColor: {
      type: String,
      default: "",
    },
    inactiveColor: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const input = ref(null);
    const core = ref(null)
    const handleClick = async () => {
      emit("input", props.value);
      // 点击的时候，还需要修改背景色
      // console.log(this.value)
      // 等待value发生了改变，在setColor
      // 数据修改后，等待DOM更新，在修改按钮的颜色
      await nextTick();
      setColor();
      input.value.checked = props.value;
    };
    const setColor = () => {
      if (props.activeColor || props.inactiveColor) {
        let color = props.value ? props.activeColor : props.inactiveColor;
        // console.log(color)
        core.value.style.borderColor = color;
        core.value.style.backgroundColor = color;
      }
    };
    onmounted(() => {
       // 修改开关的颜色
    setColor();
    // 控制checkbox的checkbox
    input.value.checked = props.value;
    })
    return {
      handleClick,
      input,
      setColor,
    };
  },
};
</script>

<style lang="scss">
.hm-switch {
  display: inline-flex;
  align-items: center;
  position: relative;
  font-size: 14px;
  line-height: 20px;
  height: 20px;
  vertical-align: middle;
  .hm-switch__input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    margin: 0;
  }
  .hm-switch__core {
    margin: 0;
    display: inline-block;
    position: relative;
    width: 40px;
    height: 20px;
    border: 1px solid #dcdfe6;
    outline: none;
    border-radius: 10px;
    box-sizing: border-box;
    background: #dcdfe6;
    cursor: pointer;
    transition: border-color 0.3s, background-color 0.3s;
    vertical-align: middle;
    .hm-switch__button {
      position: absolute;
      top: 1px;
      left: 1px;
      border-radius: 100%;
      transition: all 0.3s;
      width: 16px;
      height: 16px;
      background-color: #fff;
    }
  }
}
.hm-switch.is-checked {
  .hm-switch__core {
    border-color: #409eff;
    background-color: #409eff;
    .hm-switch__button {
      transform: translateX(20px);
    }
  }
}
</style>
