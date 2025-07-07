<template>
  <div class="modal-overlay" v-if="show">
    <div class="modal">
      <h3>Verify Your Password</h3>
      
      <div class="input-container">
        <input
          :type="showPassword ? 'text' : 'password'"
          v-model="password"
          placeholder="Enter your password"
        />
        <span class="toggle" @click="togglePassword">
          <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
        </span>
      </div>

      <div class="actions">
        <button class="cancel-btn" @click="$emit('cancel')">Cancel</button>
        <button @click="$emit('confirm', password)">Confirm</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["show"],
  data() {
    return {
      password: "",
      showPassword: false
    };
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
}

.modal {
  background: #1a1a1a;
  padding: 30px;
  border-radius: 10px;
  min-width: 25%;
  border: 1px solid #78a55a;
}

.modal h3 {
  margin-top: 0;
  color: #aaa;
  font-size: 15px;
  font-weight: 400;
}

.input-container {
  position: relative;
  width: 100%;
  margin-top: 10px;
}

.input-container input {
  width: 87%;
  padding: 0.5rem;
  padding-right: 35px; /* space for eye icon */
  background: #222;
  border: 1px solid #444;
  border-radius: 4px;
  outline: none;
  cursor: text;
  color: white;
}

input:focus {
  border-color: #78a55a;
}

.toggle {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #999;
  font-size: 14px;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 5px;
  margin-top: 1rem;
}

button {
  background-color: transparent;
  padding: 6px 7px;
  cursor: pointer;
  color: white;
  border: 1px solid #aaa;
  border-radius: 4px;
}

button:hover {
  background-color: #78a55a;
}

.cancel-btn:hover {
  background-color: #b22222;
}
</style>
