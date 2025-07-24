<template>
    <div class="setting-option" @click="$emit('toggle')">
        <div
        class="list-item"
        :class="{ disabled: isGoogleUser}"
          @click="!isGoogleUser && toggleForm(optionType)"
        >
          <div class="left-content">
            <img :src="leftIconPath" :alt="leftIconAttr" class="Icon"/>
            <p class="label">{{ label }}</p>
          </div>
          <div class="arrow" :class="{ rotated:  showForm}">
            <img src="@/assets/rightarrow.svg" alt="arrow" />
          </div>
      </div>
      <SettingsFormCard
          v-if="showForm && !isGoogleUser && isExapanded"
          :fields="inputFieldList"
          @cancel="showForm = false;"
          @save="$emit('saveFields', {type: `${optionType}`, value: $event })"
      />
    </div>
</template>

<script>
import SettingsFormCard from "@/components/FormCard.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
export default {
  name: "SettingsOptions",
  components: { SettingsFormCard },
  props: {
    isExapanded: {
      type: Boolean,
      default: false
    },
    isGoogleUser: {
        type: Boolean,
        default: false
    },
    optionType: {
        type: String,
        default: ''
    },
    leftIconPath: {
        type: String,
        default: ''
    },
    leftIconAttr: {
        type: String,
        default: ''
    },
    label: {
        type: String,
        default: ''
    },
    inputFieldList: {
        type: Array,
        default: function() {
            return []
        }
    }
  },
  data() {
    return {
      userName: "",
      userEmail: "",
      showForm: false,
      showPasswordPrompt: false,
      pendingEmailChange: null,
      // isGoogleUser: false,
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

     toggleForm(type) {
          this.showForm = !this.showForm;
      }
    },
};
</script>
 
<style scoped>
*{
  color: #c1bfd9;
}

.list-item.disabled {
  pointer-events: none;
  opacity: 0.5;
  cursor: not-allowed;
}

.list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}
 
.list-item p {
  margin: 6px;
}

.left-content {
  display: flex;
  align-items: center;
  gap: 12px; 
}
 
.rotated img {
  transform: rotate(90deg);
}
</style>
 