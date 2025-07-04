<template>
  <div class="login-container">
    <div class="login-box">
      <h2 class="heading">Login</h2>

      <!-- Show error message -->
      <p v-if="error" class="error-msg">{{ error }}</p>
      <p v-if="success" class="success-msg">{{ success }}</p>

      <div class="input-wrapper">
        <input
          type="email"
          placeholder="Email"
          v-model="email"
          class="input_box"
          required
        />
      </div>

      <div class="password-wrapper input-wrapper">
        <input
          :type="showPassword ? 'text' : 'password'"
          placeholder="Password"
          v-model="password"
          class="input_box"
          required
        />
        <span class="toggle" @click="togglePassword">
          <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
        </span>
      </div>

      <a href="#" class="forgot-password" @click.prevent="handleForgotPassword">
        Forgot Password?
      </a>

      <button type="submit" class="login-btn rotating-border" @click="loginHandler">
        Login
      </button>

      <div class="separator">or continue with</div>

      <button class="google-btn" @click="loginWithGoogle">
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
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail
} from "firebase/auth";
import { auth } from "@/firebase";
export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
      error: "",
      success: ""
    };
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    async loginHandler() {
      this.error = "";
      this.success = "";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(this.email)) {
        this.error = "Invalid email format.";
        return;
      }

      if (this.password.length < 6) {
        this.error = "Password must be at least 6 characters.";
        return;
      }

      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
     await this.$store.dispatch('setUser', userCredential.user.uid);
     await this.$store.dispatch('fetchTransactions');
        console.log("Logged in user:", userCredential.user);
        this.$router.push({ name: "dashboard" });
      } catch (err) {
        switch (err.code) {
          case 'auth/user-not-found':
            this.error = "No user found with this email.";
            break;
          case 'auth/invalid-email':
            this.error = "Invalid email address.";
            break;
          case 'auth/wrong-password':
            this.error = "Wrong password. Please try again.";
            break;
          case 'auth/user-disabled':
            this.error = "This user has been disabled.";
            break;
          default:
            this.error = "Login failed. Please try again.";
        }
      }
    },
    async loginWithGoogle() {
      this.error = "";
      this.success = "";
      const provider = new GoogleAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider);
        console.log("Google user:", result.user);
        this.$router.push({ name: "dashboard" });
      } catch (err) {
        this.error = "Google sign-in failed. Please try again.";
        console.error(err);
      }
    },
    async handleForgotPassword() {
      this.error = "";
      this.success = "";

      if (!this.email) {
        this.error = "Please enter your email to reset your password.";
        return;
      }

      try {
        await sendPasswordResetEmail(auth, this.email);
        this.success = "Password reset email sent. Please check your inbox.";
      } catch (err) {
        switch (err.code) {
          case 'auth/user-not-found':
            this.error = "No user found with this email.";
            break;
          case 'auth/invalid-email':
            this.error = "Invalid email address.";
            break;
          default:
            this.error = "Failed to send reset email. Try again.";
        }
        console.error(err);
      }
    }
  }
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

.error-msg {
  color: #ff6b6b;
  margin-bottom: 1rem;
  font-size: 14px;
}

.success-msg {
  color: #6eff6b;
  margin-bottom: 1rem;
  font-size: 14px;
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