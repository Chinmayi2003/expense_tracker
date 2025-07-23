<template>
  <div class="app-container scroll">
    <div class="settings-content">
      <SnackBar
        :show="popup.show"
        :type="popup.type"
        :message="popup.message"
        @hide="popup.show = false"
      />

      <h2 class="section-title">Settings</h2>
 
      <div class="user-info">
        <img class="userlogo" src="@/assets/user_profile.svg" alt="Logo" />
        <div class="user-label">
          <p>{{ userName }}</p>
          <a :href="`mailto:${userEmail}`" class="email">{{ userEmail }}</a>
        </div>
      </div>
 
      <section class="account-settings">
        <p class="sub-title">Account Settings</p>
        <ul>
          <li>
            <SettingOptions :optionType="'password'" 
            :leftIconPath="require('@/assets/key.svg')" :leftIconAttr="'key'" :label="'Change Password'" :inputFieldList="[
                { type: 'password', placeholder: 'Current Password' },
                { type: 'password', placeholder: 'New Password' },
                { type: 'password', placeholder: 'Confirm Password' },
              ]" :isGoogleUser="isGoogleUser" @saveFields="({ type, value }) => saveForm(type, value)"
              :isExapanded="activeForm==='password'"
              @toggle="toggleForm('password')" />
          </li>
 
          <li>
            <SettingOptions :optionType="'email'"
            :leftIconPath="require('@/assets/mail.svg')" :leftIconAttr="'mail'"
            :label="'Change Email'" :inputFieldList="[
              { type: 'email', placeholder: 'Current Email'},
              { type: 'email', placeholder: 'New Email'}
            ]" :isGoogleUser="isGoogleUser" @saveFields="({type, value}) => saveForm(type, value)"
              :isExapanded="activeForm === 'email'"
              @toggle="toggleForm('email')"/>
          </li>

          <li>
            <SettingOptions :optionType="'Phone'"
            :leftIconPath="require('@/assets/phone.svg')" :leftIconAttr="'phone'"
            :label="'Change Phone Number'" :inputFieldList="[
              { type: 'text', placeholder: 'Current Phone number'},
              { type: 'text', placeholder: 'New Phone Number'}
            ]" :isGoogleUser="isGoogleUser" @saveFields="({type, value}) => saveForm(type, value)"
              :isExapanded="activeForm === 'phone'"
              @toggle="toggleForm('phone')"/>
          </li>
        </ul>
      </section>
 
      <section class="notifications">
        <p class="sub-title">Notification</p>
        <NotificationOptions :leftIcon="require('@/assets/bell.svg')" :leftIconAlt="'bell'" :label_name="'Weekly Summary'"/>

        <NotificationOptions :leftIcon="require('@/assets/alert.svg')" :leftIconAlt="'alert'" :label_name="'Budget Alerts'"/>

        <NotificationOptions :leftIcon="require('@/assets/bill.svg')" :leftIconAlt="'bill'" :label_name="'Bill Reminders'"/>
      </section>
 
      <section class="support">
        <p class="sub-title">Contact Us</p>
        <ul class="details">
          <li>+91 4567880000</li>
          <li><a href="#" class="email-address">admin@gmail.com</a></li>
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
import SnackBar from '@/components/SnackBar.vue'
import NotificationOptions from '@/components/NotificationOptions.vue'
import SettingsFormCard from "@/components/FormCard.vue";
import PasswordPopup from "@/components/PasswordPopup.vue";
import SettingOptions from "@/components/SettingOptions.vue";
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
  components: { SettingsFormCard, PasswordPopup, SettingOptions, NotificationOptions, SnackBar },
  data() {
    return {
      userName: "",
      userEmail: "",
      activeForm: null,
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
        this.userName = user.displayName || user.email.slice(0,4);
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
        console.log(type,"type");
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
    this.activeForm = this.activeForm === formType ? null : formType;
  }

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

.scroll {
  max-height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 4px;
  scrollbar-width: thin; 
  scrollbar-color: #888 transparent; 
}

.scroll::-webkit-scrollbar {
  width: 6px;
}

.scroll::-webkit-scrollbar-thumb {
  background-color: #888;  
  border-radius: 10px;
}

.scroll::-webkit-scrollbar-track {
  background: transparent;
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
 
.sub-title {
  color: #c1bfd9;
}

.account-settings ul {
  padding-left: 30px;
}
 
.list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}
 
.sub-title{
  margin-bottom: 0.5rem;
}
 
.details li {
  margin: 0;
  color: #c1bfd9;
  padding-left: 2rem;
}
 
.email-address {
  color: #439bc4;
}

@media (max-width:600px) {
  .app-container {
    padding: 1rem 0 0 1.5rem;
  }

  .section-title {
    display: none;
  }

  .userlogo {
    height: 90px;
  }

  .settings-content {
    width: 90%;
  }
}
</style>
 
 