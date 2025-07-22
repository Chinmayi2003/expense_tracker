<template>
  <div v-if="visible" :class="['snackbar', type]">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: "SnackBar",
  props: {
    message: String,
    type: {
      type: String,
      default: "success",
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      visible: this.show,
    };
  },
  watch: {
    show(val) {
      if (val) {
        this.visible = true;
        setTimeout(() => {
          this.visible = false;
          this.$emit("hide");
        }, 3000);
      }
    },
  },
};
</script>

<style scoped>
.snackbar {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 1rem 1.5rem;
  border-radius: 6px;
  font-weight: bold;
  color: white;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease-in-out;
}
.snackbar.success {
  background-color: #78a55a;
}
.snackbar.error {
  background-color: #f44336;
}
</style>
