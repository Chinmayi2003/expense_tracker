<template>
  <div class="app-container">
    
    <!-- side bar -->
    <aside class="sidebar">
    <!-- <div class="app-icon">
    <template >
      <img
        :src="require('@/assets/expense_tracker_logo.png')"
        alt="Dashboard Icon"
        style="color: aliceblue; height: 50px; width: 50px; fill: #C1BFD9;" class="icon"
      />
    </template>
    
    <h2 class="logo"> John</h2>
    </div>
    <ul>
      <div class="dashboard-icon">
    <template >
      <img
        :src="require('@/assets/dashboard_icon.svg')"
        alt="Dashboard Icon"
        style="color: aliceblue; height: 20px; width: 20px; fill: #C1BFD9;" class="icon"
      />
    </template>
      <li class="dashboard-name">Dashboard</li>
      </div>
 
      <div class="dashboard-icon">
    <template >
      <img
        :src="require('@/assets/analytics_icon.svg')"
        alt="Dashboard Icon"
        style="color: aliceblue; height: 20px; width: 20px; fill: #C1BFD9;" class="icon"
      />
    </template>
      <li class="dashboard-name">Analytics</li>
      </div>
 
      <div class="dashboard-icon">
    <template >
      <img
        :src="require('@/assets/settings_icon.svg')"
        alt="Dashboard Icon"
        style="color: aliceblue; height: 20px; width: 20px; fill: #C1BFD9;" class="icon"
      />
    </template>
      <li class="dashboard-name">Settings</li>
      </div>
 
      <div class="dashboard-icon">
    <template >
      <img
        :src="require('@/assets/logout_icon.svg')"
        alt="Dashboard Icon"
        style="color: aliceblue; height: 20px; width: 20px; fill: #C1BFD9;" class="icon"
      />
    </template>
      <li class="dashboard-name">Log out</li>
      </div>
 
    </ul>
    <img 
        :src="require('@/assets/LOGO.svg')"
        alt="Dashboard Icon"
        style="color: aliceblue; height: 70px; width: 70px; margin-top: 240px;  fill: #C1BFD9;" class="icon"
      /> -->
  </aside>


    <main class="settings-content">
      <h2 class="section-title">Settings</h2>

      <div class="user-info">
        <img  class="userlogo" src="@/assets/Group.svg" alt="Logo" />
        <div>
          <div class="user-label">John</div>
          <a href="mailto:username@gmail.com" class="email">John@gmail.com</a>
        </div>
      </div>

      <section class="account-settings">
        <p>Account Settings</p>
        <ul>
          <li @click="toggleForm('password')">
            <div class="list-item" >
              <img src="@/assets/key.svg" alt="key">
              <p style="margin-left: -6px;">Change Password</p>
              <span class="arrow1"  :class="{ rotated: showPasswordForm }">
              <img src="@/assets/rightarrow.svg" alt="arrow">
              </span>
            </div>
            <div v-if="showPasswordForm" class="form-card" @click.stop>
              <input type="password" placeholder="Current Password" />
              <input type="password" placeholder="New Password" />
              <input type="password" placeholder="Confirm Password" />
              <div class="form-actions">
                <button @click.stop="closeForm('password')">Cancel</button>
                <button @click.stop.prevent="saveForm('password')">Save</button>
              </div>
            </div>
          </li>

          <li @click="toggleForm('email')">
            <div class="list-item" >
               <img src="@/assets/mail.svg" alt="" style="width: 16px;"> 
               <p>Change Email</p>
              <span class="arrow2"  :class="{ rotated: showEmailForm }"><img src="@/assets/rightarrow.svg" alt="arrow"></span>
            </div>
            <div v-if="showEmailForm" class="form-card" @click.stop>
              <input type="email" placeholder="Current Email" />
              <input type="email" placeholder="New Email" />
              <div class="form-actions">
                <button @click.stop="closeForm('email')">Cancel</button>
                <button @click.stop.prevent="saveForm('email')">Save</button>
              </div>
            </div>
          </li>

          <li @click="toggleForm('phone')">
            <div class="list-item list-item3" @click.stop="toggleForm('phone')" >
              <img src="@/assets/phone.svg" alt="" width="22px">
               <p style="margin-left: -11px;">Change Phone Number</p>
              <span class="arrow3"  :class="{ rotated: showPhoneForm }"><img src="@/assets/rightarrow.svg" alt="arrow"></span>
            </div>
            <div v-if="showPhoneForm" class="form-card" @click.stop>
              <input type="text" placeholder="Current Number" />
              <input type="text" placeholder="New Number" />
              <div class="form-actions">
                <button @click.stop="closeForm('phone')">Cancel</button>
                <button @click.stop.prevent="saveForm('phone')">Save</button>
              </div>
            </div>
          </li>
        </ul>
      </section>

      <section class="notifications">
        <p>Notification</p>

            <div class="notif-item">
              <img src="@/assets/bell.svg" alt="bell">
              <p style="margin-left: 3px;">Weekly Summary</p>
              <span class="btn1"><label class="switch"><input type="checkbox" /><span class="slider round"></span></label></span>
            </div>

        <div class="notif-item">
              <img src="@/assets/alert.svg" alt="alert">
              <p style="margin-left: 7px;">Budget Alerts</p>
              <span class="btn2"><label class="switch"><input type="checkbox" /><span class="slider round"></span></label></span>
          </div>


        <div class="notif-item">
              <img src="@/assets/bill.svg" alt="bill">
              <p style="margin-left: 3px;">Bill Reminders</p>
              <span class="btn3"><label class="switch"><input type="checkbox" /><span class="slider round"></span></label></span>
            </div>

      </section>

      <section class="support">
        <p>Help & Support</p>
        <div class="suppt">
          <img  class="contactus" src="@/assets/contactus.svg" alt="contactus">
        <p >Contact Us</p> 
        </div>
        <div class="details">
        <ul>
          <!-- <li>+91 4567880000<li> -->
          <li><a href="#">admin@gmail.com</a></li>
        </ul>
       </div>
      </section>
    </main>
  </div>


</template>

<script>
export default {
  name: "SettingsPage",
  data() {
    return {
      showPasswordForm: false,
      showEmailForm: false,
      showPhoneForm: false
    };
  },
  methods: {
    toggleForm(type) {
      if (type === "password") {
        this.showPasswordForm = !this.showPasswordForm;
        this.showEmailForm = false;
        this.showPhoneForm = false;
      } else if (type === "email") {
        this.showEmailForm = !this.showEmailForm;
        this.showPasswordForm = false;
        this.showPhoneForm = false;
      } else if (type === "phone") {
        this.showPhoneForm = !this.showPhoneForm;
        this.showPasswordForm = false;
        this.showEmailForm = false;
      }
    },
    closeForm(type) {
      if (type === "password") this.showPasswordForm = false;
      if (type === "email") this.showEmailForm = false;
      if (type === "phone") this.showPhoneForm = false;
    },
    saveForm(type) {
      alert(`${type.charAt(0).toUpperCase() + type.slice(1)} updated successfully!`);
    }
  }
};

</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

body {
  margin: 0;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.app-container {
  display: flex;
  height: 100%;
  width: 100%;
  background-color: #141414;
  color: #C1BFD9;
}

.sidebar {
  width: 150px;
  height: 100%;
  /* background: #0D0D0D; */
  padding: 20px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color:#FFFFFF;
}
 
.app-icon {
  display: flex;
}
 
.icon {
  padding-top: 15px;
}
.dashboard-icon {
  display: flex;
  padding-top: 0px;
}
.dashboard-name {
  padding-left: 10px;
 
}
.logo {
  margin-bottom: 30px;
  font-size: 20px;
  padding-left: 20px;
  padding-top: 25px;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  margin: 15px 0;
}

 .sidebar.icon {
  align-items: end;
  justify-content: end;
}
.settings-content {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  padding: 2rem 0 0 2.8rem;
}

.section-title {
  font-size: 30px;
  color: #78A55A;
  margin-bottom: 1rem;
  margin-top: 0rem;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}

.user-label {
  font-size: 14px;
  color: #aaa;
  padding: 15px;
}

.email {
  font-size: 14px;
  color: #4fc3f7;
  text-decoration: none;
  padding: 0 0 0 15px;
}

.account-settings, .notifications, .support {
  margin-bottom: 1.5rem;
}

.account-settings p,
.notifications p,
.support p {
  font-size: 16px;
  margin-bottom: 0rem;
  color: #C1BFD9;
}

.account-settings ul {
  list-style: none;
  padding: 0;
  padding-left: 2rem;
}

.list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap:20px ;
  cursor: pointer;
}

.list-item p{
  margin: 0;
}
.list-item .arrow1 {
  padding-left: 100px;
}

.list-item .arrow2 {
  padding-left: 130px;
}

.list-item .arrow3 {
  padding-left: 55px;
}

.list-item3 p{
  gap: 0px;
  margin: 0;
}

.account-settings li p {
  margin-right: 0.5rem;
}

.arrow {
  font-size: 18px;
  color: #C1BFD9;
}

.arrow1 img,
.arrow2 img,
.arrow3 img {
  transition: transform 0.3s ease;
}

.rotated img {
  transform: rotate(90deg); /* or 180deg for downward */
}


.form-card {
  background-color: #1a1a1a;
  padding: 1rem;
  margin-top: 0.5rem;
  border: 1px solid #333;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-card input {
  padding: 0.5rem;
  background-color: #222;
  border: 1px solid #444;
  color: #C1BFD9;
  border-radius: 4px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.form-actions button {
  background-color: transparent;
  border: 1px solid #88ff88;
  color: #88ff88;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
}

.form-actions button:hover {
  background-color: #88ff88;
  color: #000;
}

.notifications P{
  margin-bottom: 0.5rem;
}

.notif-item {
  display: flex;
  gap: 20px;
  padding-left: 2rem;
}


.notif-item .btn1{
  padding-left: 115px;
}

.notif-item .btn2{
  padding-left: 140px;
}

.notif-item .btn3{
  padding-left: 138px;
}

.support-link {
  text-decoration: none;
  color: #4fc3f7;
}

.support .contactus {
  margin-right: 20px;
  padding-top: 15px;
  width: 23px;
}

.notif-item p{
  margin-top: 0.4rem;
}

.switch {
  position: relative;
  display: inline-block;
  width: 36px;
  height: 18px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  /* background-color: #C1BFD9; */
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
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #4caf50;
}

input:checked + .slider:before {
  transform: translateX(18px);
  background-color: white;
}

.support P{
  margin-bottom: 0.2rem;
}
.suppt {
  display: flex;
 padding-left: 2rem;
  
}

.details li{
 margin: 0;
 padding-left: 2rem;
}
.details a{
  color:#439bc4 ;
}
</style>
