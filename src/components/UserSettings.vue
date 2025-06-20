<template>
  <div class="app-container">
    <div class="settings-content">
      <h2 class="section-title">Settings</h2>

      <div class="user-info">
        <img class="userlogo" src="@/assets/Group.svg" alt="Logo" />

        <div class="user-label">
          <p>{{ userName }}</p>
          <a href="mailto:username@gmail.com" class="email">{{ userEmail }}</a>
        </div>
      </div>

      <section class="account-settings">
        <p>Account Settings</p>
        <ul>
          <li @click="toggleForm('password')">
            <div class="list-item">
              <img src="@/assets/key.svg" alt="key" />
              <p style="margin-left: -6px">Change Password</p>
              <span class="arrow1" :class="{ rotated: showPasswordForm }">
                <img src="@/assets/rightarrow.svg" alt="arrow" />
              </span>
            </div>
            <SettingsFormCard
              v-if="showPasswordForm"
              :fields="[
                { type: 'password', placeholder: 'Current Password' },
                { type: 'password', placeholder: 'New Password' },
                { type: 'password', placeholder: 'Confirm Password' },
              ]"
              @cancel="closeForm('password')"
              @save="saveForm('password', $event)"
            />
          </li>

          <li @click="toggleForm('email')">
            <div class="list-item">
              <img src="@/assets/mail.svg" alt="" style="width: 16px" />
              <p>Change Email</p>
              <span class="arrow2" :class="{ rotated: showEmailForm }"
                ><img src="@/assets/rightarrow.svg" alt="arrow" />
              </span>
            </div>
            <SettingsFormCard
              v-if="showEmailForm"
              :fields="[
                { type: 'email', placeholder: 'Current Email' },
                { type: 'email', placeholder: 'New Email' },
              ]"
              @cancel="closeForm('email')"
              @save="saveForm('email', $event)"
            />
          </li>

          <li @click="toggleForm('phone')">
            <div class="list-item list-item3" @click.stop="toggleForm('phone')">
              <img src="@/assets/phone.svg" alt="" width="22px" />
              <p style="margin-left: -11px">Change Phone Number</p>
              <span class="arrow3" :class="{ rotated: showPhoneForm }">
                <img src="@/assets/rightarrow.svg" alt="arrow" />
              </span>
            </div>
            <SettingsFormCard
              v-if="showPhoneForm"
              :fields="[
                { type: 'text', placeholder: 'Current Number' },
                { type: 'text', placeholder: 'New Number' },
              ]"
              @cancel="closeForm('phone')"
              @save="saveForm('phone', $event)"
            />
          </li>
        </ul>
      </section>

      <section class="notifications">
        <p>Notification</p>
        <div class="notif-item">
          <img src="@/assets/bell.svg" alt="bell" />
          <p style="margin-left: 3px">Weekly Summary</p>
          <span class="btn1">
            <label class="switch"
              ><input type="checkbox" /> <span class="slider round"></span
            ></label>
          </span>
        </div>

        <div class="notif-item">
          <img src="@/assets/alert.svg" alt="alert" />
          <p style="margin-left: 7px">Budget Alerts</p>
          <span class="btn2">
            <label class="switch"
              ><input type="checkbox" /> <span class="slider round"></span
            ></label>
          </span>
        </div>

        <div class="notif-item">
          <img src="@/assets/bill.svg" alt="bill" />
          <p style="margin-left: 3px">Bill Reminders</p>
          <span class="btn3">
            <label class="switch"
              ><input type="checkbox" /> <span class="slider round"></span
            ></label>
          </span>
        </div>
      </section>

      <section class="support">
        <p>Help & Support</p>
        <div class="support-item">
          <img src="@/assets/contactus.svg" alt="contactus" />
          <p>Contact Us</p>
        </div>
        <ul class="details">
          <li>+91 4567880000</li>
          <li><a href="#">admin@gmail.com</a></li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
import SettingsFormCard from "@/components/FormCard.vue";

export default {
  name: "SettingsPage",
  components: {
    SettingsFormCard,
  },
  data() {
    return {
      userName: "John",
      userEmail: "John@gmail.com",
      showPasswordForm: false,
      showEmailForm: false,
      showPhoneForm: false,
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
    saveForm(type, values) {
      console.log(`${type} values:`, values);
      alert(
        `${type.charAt(0).toUpperCase() + type.slice(1)} updated successfully!`
      );
    },
  },
};
</script>

<style scoped>
.app-container {
  display: flex;
  height: 93.9vh;
  width: 100%;
  background-color: #141414;
  padding: 2rem 0 0 2.8rem;
  overflow-y: scroll;
  overflow-x: hidden;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin: 15px 0;
}

.section-title {
  font-size: 30px;
  color: #78a55a;
  margin: 0.7rem 0 1rem;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  font-size: 15px;
}

.user-label {
  color: #aaa;
  padding-left: 15px;
}

.email {
  color: #4fc3f7;
  text-decoration: none;
}

.account-settings,
.notifications,
.support {
  margin-bottom: 1.5rem;
}

.account-settings p,
.notifications p,
.support p {
  color: #c1bfd9;
}

.account-settings ul {
  padding-left: 2rem;
}

.list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}

.list-item p {
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

.account-settings li p {
  margin-right: 0.5rem;
}

.rotated img {
  transform: rotate(90deg);
}

.notifications P {
  margin-bottom: 0.5rem;
}

.notif-item {
  display: flex;
  gap: 20px;
  padding-left: 2rem;
}

.notif-item .btn1 {
  padding-left: 115px;
}

.notif-item .btn2 {
  padding-left: 140px;
}

.notif-item .btn3 {
  padding-left: 138px;
}

.notif-item p {
  margin-top: 0.4rem;
}

.switch {
  position: relative;
  display: inline-block;
  width: 36px;
  height: 18px;
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
  background-color: #4caf50;
}

input:checked + .slider:before {
  transform: translateX(18px);
  background-color: white;
}

.support P {
  margin-bottom: 0.2rem;
}

.support-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  padding-left: 2rem;
}

.details li {
  margin: 0;
  color: #c1bfd9;
  padding-left: 2rem;
}

.details a {
  color: #439bc4;
}
</style>
