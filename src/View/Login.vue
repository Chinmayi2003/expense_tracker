<template>
  <div class="login-container">
    <div class="login-box">
      <h2 class="heading">Login</h2>

      <div class="input-wrapper">
        <input
          type="email"
          placeholder="Email"
          v-model="email"
          class="input_box"
        />
      </div>

      <div class="password-wrapper input-wrapper">
        <input
          :type="showPassword ? 'text' : 'password'"
          placeholder="Password"
          v-model="password"
          autocomplete="off"
          class="input_box"
        />
        <span class="toggle" @click="togglePassword">
          <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
        </span>
      </div>

      <a href="#" class="forgot-password">Forgot Password?</a>

      <button class="login-btn rotating-border" @click="loginHandler">Login</button>

      <div class="separator">or continue with</div>

      <button class="google-btn">
        <img
          :src="require('@/assets/googlelogo.png')"
          alt="Google logo"
          class="google-logo"
        />
        <p>Sign in with Google</p>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
    };
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
   loginHandler() {
      this.$router.push({ name: 'dashboard' });
    }
  },
};
</script>

<style scoped>
.login-container {
  background-image: url("@/assets/wallpaper_expense.png");
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-box {
  background-color: #161a20;
  padding: 2rem;
  border-radius: 30px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);
  width: 330px;
  opacity: 0.9;
  color: #fff;
  text-align: center;
}

.heading {
  margin-top: 0.1rem;
  margin-bottom: 3rem;
  font-size: 46px;
  font-weight: 700;
}

.input_box {
  width: 90%;
  padding: 13px;
  margin-bottom: 0.8rem;
  cursor: text;
}

.input-wrapper {
  position: relative;
  margin-bottom: 1rem;
  border-radius: 8px;
  overflow: hidden;
}

.input-wrapper::before {
  content: "";
  position: absolute;
  inset: -2px;
  background: conic-gradient(from 0deg, #5dd1c0, #401d50, #354a4c, #2c8f87);
  border-radius: 10px;
  z-index: 1;
  opacity: 0;
}

.input-wrapper:hover::before,
.input-wrapper:focus-within::before {
  animation: rotateBorder 1s linear;
  opacity: 1;
}

.input-wrapper::after {
  content: "";
  position: absolute;
  inset: 2px;
  background: #1d2b3b;
  border-radius: 6px;
  z-index: 2;
}

.input-wrapper input {
  position: relative;
  z-index: 3;
  width: 100%;
  padding: 18px 14px 5px 14px;
  border: none;
  background: transparent;
  color: white;
  outline: none;
  font-size: 14px;
  border-radius: 6px;
}

@keyframes rotateBorder {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.toggle {
  position: absolute;
  right: 16px;
  top: 15px;
  cursor: pointer;
  color: #999;
  z-index: 100;
}

.forgot-password {
  display: block;
  font-size: 12px;
  color: #5dd1c0;
  text-align: right;
  margin-bottom: 1rem;
  text-decoration: none;
  padding-right: 7px;
  z-index: 3;
}

.login-btn {
  background-color: #354a4c;
  color: white;
  border: none;
  padding: 12px;
  width: 99%;
  border-radius: 6px;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 1rem;
  transition: box-shadow 0.3s ease, transform 0.2s ease;
}

.login-btn:hover {
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 5px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
}

.separator {
  font-size: 14px;
  margin-bottom: 1rem;
  color: #888;
  padding-top: 10px;
}

.google-btn {
  background-color: transparent;
  color: #fff;
  border: none;
  padding: 10px;
  width: 98%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 2px;
  margin-bottom: 2rem;
  padding-top: 5px;
  cursor: default;
}

.google-btn img,
.google-btn p {
  cursor: pointer;
}

.google-btn img {
  height: 25px;
  margin-right: 10px;
}
</style>
