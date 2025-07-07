<template>
  <div class="app-container">
    <div class="settings-content">
      <div v-if="popup.show" :class="['popup', popup.type]">
        {{ popup.message }}
      </div>

      <h2 class="section-title">Settings</h2>

      <div class="user-info">
        <img class="userlogo" src="@/assets/user_profile.svg" alt="Logo" />
        <div class="user-label">
          <p>{{ userName }}</p>
          <a :href="`mailto:${userEmail}`" class="email">{{ userEmail }}</a>
        </div>
      </div>

      <section class="account-settings">
        <p>Account Settings</p>
        <ul>
          <li>
            <div
              class="list-item"
              :class="{ disabled: isGoogleUser }"
              @click="!isGoogleUser && toggleForm('password')"
            >
              <img src="@/assets/key.svg" alt="key" />
              <p style="margin-left: -19px">Change Password</p>
              <span class="arrow1" :class="{ rotated: showPasswordForm }">
                <img src="@/assets/rightarrow.svg" alt="arrow" />
              </span>
            </div>
            <SettingsFormCard
              v-if="showPasswordForm && !isGoogleUser"
              :fields="[
                { type: 'password', placeholder: 'Current Password' },
                { type: 'password', placeholder: 'New Password' },
                { type: 'password', placeholder: 'Confirm Password' },
              ]"
              @cancel="closeForm('password')"
              @save="saveForm('password', $event)"
            />
          </li>

          <li>
            <div
              class="list-item"
              :class="{ disabled: isGoogleUser }"
              @click="!isGoogleUser && toggleForm('email')"
            >
              <img src="@/assets/mail.svg" alt="" style="width: 16px" />
              <p style="margin-left: -18px">Change Email</p>
              <span class="arrow2" :class="{ rotated: showEmailForm }">
                <img src="@/assets/rightarrow.svg" alt="arrow" />
              </span>
            </div>
            <SettingsFormCard
              v-if="showEmailForm && !isGoogleUser"
              :fields="[
                { type: 'email', placeholder: 'Current Email' },
                { type: 'email', placeholder: 'New Email' },
              ]"
              @cancel="closeForm('email')"
              @save="saveForm('email', $event)"
            />
          </li>

          <li>
            <div class="list-item list-item3" @click="toggleForm('phone')">
              <img src="@/assets/phone.svg" alt="" width="22px" />
              <p style="margin-left: -31px">Change Phone Number</p>
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
            <label class="switch">
              <input type="checkbox" />
              <span class="slider round"></span>
            </label>
          </span>
        </div>

        <div class="notif-item">
          <img src="@/assets/alert.svg" alt="alert" />
          <p style="margin-left: 7px">Budget Alerts</p>
          <span class="btn2">
            <label class="switch">
              <input type="checkbox" />
              <span class="slider round"></span>
            </label>
          </span>
        </div>

        <div class="notif-item">
          <img src="@/assets/bill.svg" alt="bill" />
          <p style="margin-left: 3px">Bill Reminders</p>
          <span class="btn3">
            <label class="switch">
              <input type="checkbox" />
              <span class="slider round"></span>
            </label>
          </span>
        </div>
      </section>

      <section class="support">
        <p>Contact Us</p>
        <ul class="details">
          <li>+91 4567880000</li>
          <li><a href="#">admin@gmail.com</a></li>
        </ul>
      </section>
    </div>

    <PasswordPopup
      :show="showPasswordPrompt"
      @cancel="cancelPasswordPrompt"
      @confirm="confirmEmailChange"
    />
  </div>
</template>
<script>
import SettingsFormCard from "@/components/FormCard.vue";
import PasswordPopup from "@/components/PasswordPopup.vue";
// import { doc, getFirestore, updateDoc } from "firebase/firestore";
import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  verifyBeforeUpdateEmail,
  fetchSignInMethodsForEmail,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

export default {
  name: "SettingsPage",
  components: { SettingsFormCard, PasswordPopup },
  data() {
    return {
      userName: "",
      userEmail: "",
      showPasswordForm: false,
      showEmailForm: false,
      showPhoneForm: false,
      showPasswordPrompt: false,
      pendingEmailChange: null,
      isGoogleUser: false,
      popup: {
        show: false,
        message: "",
        type: "success",
      },
    };
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.userEmail = user.email;
        this.userName = user.displayName || "User";
        this.isGoogleUser = user.providerData.some(
          (provider) => provider.providerId === "google.com"
        );
        this.$emit("changeUserName", this.userName);
      }
    });
  },
  methods: {
    showPopup(message, type = "success") {
      this.popup.message = message;
      this.popup.type = type;
      this.popup.show = true;
      setTimeout(() => {
        this.popup.show = false;
      }, 3000);
    },

    async saveForm(type, values) {
      const auth = getAuth();
      const user = auth.currentUser;

      try {
        switch (type) {
          case "password": {
            const [currentPassword, newPassword, confirmPassword] = values.map(v => v?.trim() || "");

            if (!currentPassword || !newPassword || !confirmPassword) {
              this.showPopup("All password fields are required.", "error");
              return;
            }

            if (currentPassword === newPassword) {
              this.showPopup("Enter a different password.", "error");
              return;
            }

            if (newPassword !== confirmPassword) {
              this.showPopup("New passwords do not match.", "error");
              return;
            }

            if (newPassword.length < 6) {
              this.showPopup("New password must be at least 6 characters long.", "error");
              return;
            }

            const credential = EmailAuthProvider.credential(user.email, currentPassword);

            try {
              await reauthenticateWithCredential(user, credential);
              await updatePassword(user, newPassword);
              this.showPopup("Password updated successfully.");
              this.showPasswordForm = false;
            } catch (error) {
              if (error.code === "auth/wrong-password") {
                this.showPopup("Current password is incorrect.", "error");
              } else {
                this.showPopup("An error occurred. Please try again.", "error");
              }
            }
            break;
          }

          case "email": {
            const [currentEmail, newEmail] = values;
            
            if(currentEmail=="" && newEmail=="" ) {
              this.showPopup("Enter Email", "error");
              return;
            }

            if (user.email !== currentEmail) {
              this.showPopup("Current email doesn't match your profile.", "error");
              return;
            }
            
            if(currentEmail === newEmail) {
              this.showPopup("Please enter different mail","error");
              return;
            }

            try {
              const methods = await fetchSignInMethodsForEmail(getAuth(), newEmail);
              if (methods.length > 0) {
                this.showPopup("This email is already registered.", "error");
                return;
              }
            } catch (err) {
              console.error("Error checking email existence:", err);
              this.showPopup("Failed to validate new email.", "error");
              return;
            }

            this.pendingEmailChange = { currentEmail, newEmail };
            this.showPasswordPrompt = true;
            break;
          }

          case "phone": {
            this.showPopup("Phone number update logic not implemented.", "error");
            this.showPhoneForm = false;
            break;
          }

          default:
            this.showPopup("Unknown form type.", "error");
        }
      } catch (error) {
        console.error(error);
        this.showPopup(error.message, "error");
      }
    },

    async confirmEmailChange(password) {
      const auth = getAuth();
      const user = auth.currentUser;
      const { currentEmail, newEmail } = this.pendingEmailChange;

      try {
        const credential = EmailAuthProvider.credential(currentEmail, password);
        await reauthenticateWithCredential(user, credential);
        await verifyBeforeUpdateEmail(user, newEmail);
        this.showPopup("Verification email sent. Please confirm and log in again.");
        this.showEmailForm = false;
        this.showPasswordPrompt = false;

        setTimeout(() => {
          signOut(auth).then(() => {
            this.$router.push("/login");
          });
        }, 2000);
      } catch (error) {
        console.error(error);
        this.showPopup("Incorrect password or error occurred.", "error");
        this.showPasswordPrompt = false;
      }
    },

    cancelPasswordPrompt() {
      this.showPasswordPrompt = false;
    },

    toggleForm(formType) {
      switch (formType) {
        case "password":
          this.showPasswordForm = !this.showPasswordForm;
          this.showEmailForm = false;
          this.showPhoneForm = false;
          break;
        case "email":
          this.showEmailForm = !this.showEmailForm;
          this.showPasswordForm = false;
          this.showPhoneForm = false;
          break;
        case "phone":
          this.showPhoneForm = !this.showPhoneForm;
          this.showPasswordForm = false;
          this.showEmailForm = false;
          break;
        default:
          break;
      }
    },

    closeForm(formType) {
      switch (formType) {
        case "password":
          this.showPasswordForm = false;
          break;
        case "email":
          this.showEmailForm = false;
          break;
        case "phone":
          this.showPhoneForm = false;
          break;
        default:
          break;
      }
    },
  },
};
</script>


<style scoped>
.list-item.disabled {
  pointer-events: none;
  opacity: 0.5;
  cursor: not-allowed;
}

.popup {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 1rem 1.5rem;
  border-radius: 6px;
  font-weight: bold;
  color: white;
  z-index: 2;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: opacity 0.3s ease;
}

.popup.success {
  background-color: #78a55a;
}

.popup.error {
  background-color: #f44336;
}

button {
  width: 200px;
}

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
  padding-top: 6px;
}

.notif-item .btn2 {
  padding-left: 140px;
  padding-top: 7px;
}

.notif-item .btn3 {
  padding-left: 137px;
  padding-top: 6px;
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
  background-color: #78a55a;
}

input:checked + .slider:before {
  transform: translateX(18px);
  background-color: white;
}

.support P {
  margin-bottom: 0.2rem;
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
