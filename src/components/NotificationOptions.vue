<template>
  <div class="notif-item">
    <div class="left-content">
      <img :src="leftIcon" :alt="leftIconAlt" class="Icon" />
      <p>{{ label_name }}</p>
    </div>
    <span class="btn1">
      <label class="switch">
        <input type="checkbox" />
        <span class="slider round"></span>
      </label>
    </span>
  </div>
</template>

<script>
export default {
  name: "NotificationOptions",
  props: {
    leftIcon: {
      type: String,
      default: "",
    },
    leftIconAlt: {
      type: String,
      default: "",
    },
    label_name: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.notif-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding-left: 30px;
  color: #c1bfd9;
}

.switch {
  position: relative;
  display: inline-block;
  width: 36px;
  height: 18px;
}

.left-content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.slider {
  position: absolute;
  cursor: pointer;
  border-radius: 34px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: 0.4s;
  background-color: white;
}

.slider:before {
  position: absolute;
  content: "";
  height: 14px;
  width: 14px;
  left: 2px;
  bottom: 2px;
  background-color: #000000;
  border-radius: 50%;
  transition: 0.2s;
}

input:checked + .slider {
  background-color: #78a55a;
}

input:checked + .slider:before {
  transform: translateX(18px);
  background-color: white;
}
</style>
 
 