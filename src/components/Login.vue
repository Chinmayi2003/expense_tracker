<template>
  <div class="login-container">
    <div class="login-box">
      <h2>Login</h2>
       

      <div  class="input-wrapper"  >
       <input   type="email" placeholder="Email" v-model="email" />
      </div>
      

      <div class=" password-wrapper input-wrapper">
        <input :type="showPassword ? 'text' : 'password'" placeholder="Password" v-model="password" autocomplete="off"   />
      
        <span class="toggle" @click="togglePassword">
          <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
        </span>
      </div>

      <a href="#" class="forgot-password">Forgot Password?</a>

      <button class="login-btn rotating-border" @click="login">Login</button>

      <div class="separator">or continue with</div>

      <button class="google-btn">
         <img :src="require('@/assets/googlelogo.png')" alt="Google logo" class="google-logo" />
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
      email: '',
      password: '',
      showPassword: false
    };
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    login() {
      // Handle login logic
      console.log("Logging in with", this.email, this.password);
    }
  }
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

.login-container {
  background-image: url('D:\OneDrive - EnerMAN Technologies Private Limited\Desktop\expense-tracker1\my-vue2-app\src\assets\wallpaper_expense.png');
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-box {
  background-color: #161A20;
  padding: 2rem;
  border-radius: 30px;
  box-shadow: 0 0 20px rgba(0,0,0,0.6);
  width: 330px;
  opacity: 0.9;
  color: #fff;
  text-align: center;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

h2 {
  margin-top: 0.1rem;
  margin-bottom: 3rem;
  font-size: 46px;
  font-weight: 700;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

input[type="email"],
input[type="password"],
input[type="text"] {
  width: 90%;
  padding: 13px;
  margin-bottom: 0.8rem;
  background-color: #1D2B3B;
  border: none;
  border-radius: 6px;
  color: #ffffff;
  outline: none;
  cursor: text;
  position: relative;
}
.input-wrapper {
  position: relative;
  width: 100%;
  margin-bottom: 1rem;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.input-wrapper::before {
  content: '';
  position: absolute;
  inset: -2px;
  background: conic-gradient(
    from 0deg,
    #5dd1c0,
    #401d50,
    #354A4C,
    #2c8f87
  );
  border-radius: 10px;
  z-index: 1;
  transform: rotate(0deg);
  animation: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.input-wrapper:hover::before,
.input-wrapper:focus-within::before {
  animation: rotateBorder 1s linear ;
  opacity: 1;
}

.input-wrapper::after {
  content: '';
  position: absolute;
  inset: 2px;
  background: #1D2B3B;
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

.password-wrapper {
  position: relative;
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
 
  background-color: #354A4C;
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
  background-color:transparent;
  color: #fff;
  border: none;
  padding: 10px;
  width: 98%;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 2px;
  margin-bottom: 2rem;
  padding-top: 5px;
  cursor: default;
}

.google-btn img ,
.google-btn p {
  cursor: pointer; 
}

.google-btn img {
  height: 25px;
  margin-right: 10px;
}
</style>
