<!-- src/components/LogoutPopup.vue -->
<template>
  <div class="popup" v-show="show">
    <h3>Are you sure you want to logout?</h3>
    <div class="actions">
      <button class="no" @click="$emit('cancel')">No</button>
      <button @click="$emit('confirm')">Yes</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["show"]
};
</script>
<style scoped>
.popup {
  background: #1b1919; 
  padding: 25px 30px;
  border-radius: 10px;
  text-align: center;
  border: 1px solid #78a55a;
  min-width: 280px;
  z-index: 105; 
}

h3 {
  color: white;
  margin-bottom: 1rem;
  font-size: 15.5px;
  font-weight: 500;
  opacity: 0.9;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

button {
  padding: 6px 15px;
  color: white;
  background-color: transparent;
  border: 1px solid #aaa;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #78a55a;
    border-color: #78a55a;
}

.no:hover {
  background-color: #b22222;
  border-color: #b22222;
}
</style>
