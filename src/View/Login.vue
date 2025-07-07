<template>
  <div class="login-container">
    <div class="login-box">
      <h2 class="heading">Login</h2>

      <!-- Reserved space for error/success messages -->
      <div class="message-container">
        <p v-show="error" class="error-msg">{{ error }}</p>
        <p v-show="success" class="success-msg">{{ success }}</p>
      </div>

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

      <div class="separator">or</div>

      <button class="google-btn" @click="loginWithGoogle">
        <img :src="require('@/assets/googlelogo.png')" alt="Google logo" class="google-logo" />
        <p>Sign in with Google</p>
      </button>
    </div>

    <!-- Password Reset modal -->
    <div class="modal-overlay" v-if="showResetPopup">
      <div class="reset-popup-card">
        <h3>Reset Password</h3>
        <p class="popup-info">Enter your email to receive a reset link.</p>
        <input
          type="email"
          v-model="resetEmail"
          placeholder="Enter email"
          class="input_box popup-input"
        />
        <div class="message-container">
        <p v-if="popupError" class="error-msg">{{ popupError }}</p>
        <p v-if="popupSuccess" class="success-msg">{{ popupSuccess }}</p>
        </div>
        <div class="popup-buttons">
          <button @click="sendResetEmail" class="reset-btn">Send Reset Link</button>
          <button @click="closeResetPopup" class="reset-btn">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";

export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
      error: "",
      success: "",
      showResetPopup: false,
      resetEmail: "",
      popupError: "",
      popupSuccess: ""
    };
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    async loginHandler() {
      const auth=getAuth();
      this.error = "";
      this.success = "";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if(this.email=='' && this.password=='') {
        this.error="Enter login credentials.";
        return
      }

      if(this.email=='') {
        this.error="Enter email.";
        return
      }

      if (!emailRegex.test(this.email)) {
        this.error = "Invalid email format.";
        return;
      }
      
      if(this.password=='') {
        this.error="Enter password.";
        return;
      }

      if (this.password.length < 6) {
        this.error = "Password must be at least 6 characters.";
        return;
      }

      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          this.email.trim(),
          this.password.trim()
        );
        console.log("Logged in user:", userCredential.user);
        this.$router.push({ name: "dashboard" });
      } catch (err) {
        console.error("Login error code:", err.code, err.message);
        switch (err.code) {
          case 'auth/invalid-credential':
            this.error = "Invalid Credential.";
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
      const auth=getAuth();
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
    handleForgotPassword() {
      this.resetEmail = "";
      this.popupError = "";
      this.popupSuccess = "";
      this.showResetPopup = true;
    },
    closeResetPopup() {
      this.showResetPopup = false;
    },
    async sendResetEmail() {
      const auth=getAuth();
      this.popupError = "";
      this.popupSuccess = "";

      if (!this.resetEmail) {
        this.popupError = "Email is required.";
        return;
      }

      try {
        await sendPasswordResetEmail(auth, this.resetEmail);
        this.popupSuccess = "Reset link sent! Check your email.";
      } catch (err) {
        switch (err.code) {
          case 'auth/user-not-found':
            this.popupError = "No user found with this email.";
            break;
          case 'auth/invalid-email':
            this.popupError = "Invalid email address.";
            break;
          default:
            this.popupError = "Something went wrong. Try again.";
        }
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
  margin-bottom: 2rem;
  font-size: 46px;
  font-weight: 700;
}

.message-container {
  min-height: 24px;
}

.error-msg,
.success-msg {
  font-size: 14px;
  margin: 0;
  transition: opacity 0.2s ease;
}

.error-msg {
  color: #ff6b6b;
}

.success-msg {
  color: #6eff6b;
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
  background: conic-gradient(from 0deg, #478a80, #401d50, #354a4c, #2c8f87);
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

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(13, 13, 13, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 101;
}

.reset-popup-card {
  background-color: #161a20;
  padding: 16px;
  border-radius: 16px;
  width: 354px;
  color: #fff;
  text-align: center;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);
}

.reset-popup-card h3 {
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 0.5rem;
}

.popup-info {
  font-size: 14px;
  margin-bottom: 1rem;
  color: #ccc;
}

.popup-input {
  width: 90%;
  margin-bottom: 1rem;
  background: #1d2b3b;
  border-radius: 5px;
  outline: none;
  cursor: text;
  color: white;
  border: none;
}

.popup-input:hover {
  border: 1px solid #aaa;
}

.popup-buttons {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.reset-btn {
  background-color: #1d2b3b;
  padding: 10px;
  color: white;
  outline: none;
  border-radius: 5px;
  border: none;
}

.reset-btn:hover {
  border: 1px solid #aaa;
}
</style>
