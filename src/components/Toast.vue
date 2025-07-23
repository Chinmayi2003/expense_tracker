<template>
  <div v-if="visible" class="snackbar-notification">
    <span>{{ message }}</span>
  </div>
</template>

<script>
export default {
  name: "Toast",
  props: {
    visible: Boolean,
    message: String
  }
};
</script>

<style scoped>
  .snackbar-notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    background-color: #78a55a;
    border-radius: 6px;
    font-weight: bold;
    color: white;
    z-index: 2;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
</style>
