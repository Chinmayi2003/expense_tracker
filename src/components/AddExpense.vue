<template>
  <div class="new-expense">
    <div>
      <div class="header">
        <h1 class="page-title">New Transaction</h1>
        <img
          :src="require('@/assets/close.svg')"
          alt="Exit"
          class="header2"
          @click="$emit('close')"
        />
      </div>
      <p class="required-note">* Indicates Required Field</p>
    </div>

    <form @submit.prevent="submitExpense" class="expense-form">
      <div id="main-div">
        <div id="main-div1">
          <div class="form-group">
            <label class="labels transaction-label">Transaction*</label>
            <div class="radio-group">
              <label class="radio-option">
                <input
                  type="radio"
                  name="transactionType"
                  value="Credits"
                  :disabled="editData && editData.id"
                  v-model="form.transactionType"
                  required
                />
                <span class="custom-radio"></span>
                Credits
              </label>
              <label class="radio-option rd2">
                <input
                  type="radio"
                  name="transactionType"
                  value="Expense"
                  :disabled="editData && editData.id"
                  v-model="form.transactionType"
                  required
                />
                <span class="custom-radio"></span>
                Debits
              </label>
            </div>
          </div>

          <div class="form-group select-wrapper">
            <label class="labels cat">Category*</label>
            <input type="text" v-model="form.category" class="cat-inp" required tabindex="-1" />
            <span :class="categoryClass"></span>
            <v-select
              v-model="form.category"
              :options="currentCategoryOptions"
              class="vue-select custom-input category-select dropdown-icon scroll-select"
              :searchable="false"
              placeholder="Select your category"
              required
            />
          </div>

          <div class="form-group">
            <label class="labels mod">Mode</label>
            <v-select
              v-model="form.mode"
              :options="modeOptions"
              class="vue-select custom-input mode-select dropdown-icon"
              :searchable="false"
              placeholder="Mode"
              required
            />
          </div>

          <div class="form-group">
            <label class="labels dat">Date*</label>
            <div class="date-wrapper">
              <input
                v-model="form.date"
                type="date"
                class="inp date custom-date"
                required
                :max="todayDate"
              />
              <img :src="require('@/assets/datepic.svg')" alt="Calendar Icon" class="calendar-icon" />
            </div>
          </div>

          <div class="form-group">
            <label class="labels total">Amount*</label>
            <input
              v-model="form.total"
              type="number"
              @keydown="preventInvalidKeys"
              class="inp tot1 amount1 no-spinner"
              required
            />
            <input
              type="text"
              placeholder="Rupees"
              readonly
              tabindex="-1"
              class="inp amount1 amount-inp"
            />
          </div>

          <div class="form-group">
            <label class="labels desc">Description</label>
            <textarea v-model="form.description" class="inp-desc"></textarea>
          </div>
        </div>

        <label for="fileInput" class="uploadlabel">
          <div class="form-group upload" tabindex="0">
            <img v-if="previewUrl" :src="previewUrl" alt="Preview" class="Vector vect2" />
            <img v-else :src="require('@/assets/Vector.svg')" alt="Upload" class="Vector" />
            <p class="invoice-para">{{ filename }}</p>
            <input
              type="file"
              id="fileInput"
              @change="handleFileUpload"
              ref="fileInput"
              accept=".jpg, .jpeg, .png, .pdf"
            />
          </div>
        </label>
      </div>
      <button type="submit" class="my-button">Save</button>
    </form>
  </div>
</template>

<script>
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { mapActions } from "vuex";

const CREDIT_CATEGORIES = [
  "Salary",
  "Freelance",
  "Business Income",
  "Interest",
  "Investment Income",
  "Gifts",
  "Other"
];

const DEBIT_CATEGORIES = [
  "Travel",
  "Food",
  "Rent",
  "Utilities",
  "Entertainment",
  "Shopping",
  "Health",
  "Education",
  "Insurance",
  "Taxes",
  "Subscriptions",
  "Other"
];

const CREDIT_MODES = ["Business Transaction", "Online", "Cash", "Other"];
const DEBIT_MODES = [
  "Debit card",
  "Business Transaction",
  "UPI",
  "Cash",
  "Other"
];

export default {
  components: { vSelect },
  props: {
    editData: {
      type: Object,
      default: () => ({})
    },
    show: Boolean
  },
  watch: {
    show(value) {
      if (!value) {
        this.resetForm();
      }
    },
    "form.transactionType"() {
      if (!this.currentCategoryOptions.includes(this.form.category)) {
        this.form.category = "";
      }
      if (!this.modeOptions.includes(this.form.mode)) {
        this.form.mode = "";
      }
    },
    editData: {
      immediate: true,
      handler(newVal) {
        if (newVal && Object.keys(newVal).length > 0) {
          this.isEditing = true;
          this.form.transactionType = newVal.price > 0 ? "Credits" : "Expense";
          this.form.category = newVal.category;
          this.form.mode = newVal.mode;
          this.form.date = this.reverseFormattedDate(newVal.date);
          this.form.total = Math.abs(newVal.price);
          this.form.description = newVal.description;
          if (newVal.invoiceUrl) {
            this.previewUrl = newVal.invoiceUrl.endsWith(".pdf")
              ? require("@/assets/pdf-icon.png")
              : newVal.invoiceUrl;
            const fileName = newVal.invoiceUrl.split("/").pop();
            this.filename =
              fileName.length > 10
                ? fileName.substring(0, 10) + "..." + fileName.slice(-4)
                : fileName;
          } else {
            this.isEditing = false;
          }
        }
      }
    }
  },
  data() {
    return {
      isEditing: false,
      filename: "Upload an invoice",
      previewUrl: null,
      form: {
        transactionType: "Credits",
        category: "",
        mode: "",
        date: "",
        total: "",
        currency: "Rupee",
        description: ""
      }
    };
  },
  computed: {
    categoryClass() {
      return this.getCategoryClass(this.form.category);
    },
    currentCategoryOptions() {
      return this.form.transactionType === "Credits"
        ? CREDIT_CATEGORIES
        : DEBIT_CATEGORIES;
    },
    modeOptions() {
      return this.form.transactionType === "Credits"
        ? CREDIT_MODES
        : DEBIT_MODES;
    },
    todayDate() {
      const today = new Date();
      return today.toISOString().split("T")[0];
    }
  },
  methods: {
    ...mapActions(["addTransaction", "updateTransaction"]),
    preventInvalidKeys(event) {
      if (["+", "-", "e", "E"].includes(event.key)) {
        event.preventDefault();
      }
    },
    handleClose() {
      this.resetForm();
      this.$emit("close");
      this.$emit("clearEditData");
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      this.filename =
        file.name.length > 10
          ? file.name.substring(0, 10) + "..." + file.name.slice(-4)
          : file.name;

      const fileType = file.type;
      if (fileType.includes("image")) {
        const reader = new FileReader();
        reader.onload = e => {
          this.previewUrl = e.target.result;
        };
        reader.readAsDataURL(file);
      } else if (fileType === "application/pdf") {
        this.previewUrl = require("@/assets/pdf-icon.png");
      } else {
        this.previewUrl = null;
      }
    },
    async submitExpense() {
      const priceValue = parseFloat(this.form.total);
      const formattedDate = this.getFormattedDate(this.form.date);
      const file = this.$refs.fileInput?.files[0];
      let localFileData = null;

      if (file) {
        const reader = new FileReader();
        localFileData = await new Promise(resolve => {
          reader.onload = e => {
            resolve({
              name: file.name,
              type: file.type,
              dataUrl: e.target.result
            });
          };
          reader.readAsDataURL(file);
        });
      }
      const updatedTransaction = {
        id: this.editData?.id ?? Date.now().toString(),
        category: this.form.category,
        icon: this.getIcon(this.form.category),
        currency: "Rupees",
        mode: this.form.mode,
        date: formattedDate,
        price:
          this.form.transactionType === "Credits" ? priceValue : -priceValue,
        priceClass:
          this.form.transactionType === "Credits" ? "positive" : "negative",
        description: this.form.description,
        categoryClass: this.getCategoryClass(this.form.category),
        iconClass: this.getCategoryClass(this.form.category)
      };
      if (file && localFileData) {
        updatedTransaction.invoiceUrl = localFileData.dataUrl;
      }

      if (this.editData && this.editData.id) {
        updatedTransaction.id = this.editData.id;
        this.updateTransaction(updatedTransaction);
      } else {
        updatedTransaction.id = Date.now().toString();
        this.addTransaction(updatedTransaction);
      }
      this.resetForm();
      this.$emit("close");
      this.$emit("clearEditData");
    },

    getFormattedDate(dateInput) {
      const date = new Date(dateInput);
      return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      });
    },
    getIcon(category) {
      const iconMap = {
        Food: "foodlogo.svg",
        Travel: "travelicon.svg",
        Rent: "renticon.svg",
        Salary: "salary.svg",
        Education: "education.svg",
        Shopping: "shopping.svg",
        Health: "health.svg",
        Entertainment: "entertainment.svg",
        Utilities: "utilities.svg",
        Interest: "interest.svg",
        "Business Income": "businessincome.svg",
        Freelance: "freelance.svg",
        Investment: "profit.svg",
        Taxes: "tax.svg",
        Insurance: "insurance.svg",
        Gifts: "gift.svg",
        Subscriptions: "subscription.svg",
        Other: "other.svg"
      };
      return iconMap[category] || "other.svg";
    },
    getCategoryClass(category) {
      const classMap = {
        Food: "food-category-icons",
        Travel: "travel-category-icons",
        Rent: "rent-category-icons",
        Salary: "salary-category-icons",
        Education: "education-category-icons",
        Shopping: "shopping-category-icons",
        Health: "health-category-icons",
        Entertainment: "entertainment-category-icons",
        Utilities: "utilities-category-icons",
        Interest: "interest-category-icons",
        "Business Income": "business-income-category-icons",
        Freelance: "freelance-category-icons",
        Investment: "investment-category-icons",
        Taxes: "tax-category-icons",
        Insurance: "insurance-category-icons",
        Gifts: "gifts-category-icons",
        Subscriptions: "subscriptions-category-icons",
        Other: "other-category-icons"
      };
      return classMap[category] || "";
    },
    reverseFormattedDate(formattedDate) {
      const parts = formattedDate.split(" ");
      const day = parts[0];
      const monthMap = {
        Jan: "01",
        Feb: "02",
        Mar: "03",
        Apr: "04",
        May: "05",
        Jun: "06",
        Jul: "07",
        Aug: "08",
        Sep: "09",
        Oct: "10",
        Nov: "11",
        Dec: "12"
      };
      const month = monthMap[parts[1]];
      const year = parts[2];
      return `${year}-${month}-${day}`;
    },
    resetForm() {
      this.form = {
        transactionType: "Credits",
        category: "",
        mode: "",
        date: "",
        total: "",
        currency: "Rupee",
        description: ""
      };
      this.filename = "Upload an invoice";
      this.previewUrl = null;
      this.localFileData = null;
      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = null;
      }
    }
  }
};
</script>
<style scoped>
* {
  font-family: "Roboto", sans-serif;
}
 
::v-deep(.vs__dropdown-menu) {
  max-height: 100px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #2e2e2e transparent;
}
 
::v-deep(.vs__dropdown-menu::-webkit-scrollbar-track) {
  background: transparent;
}
 
::v-deep(.vs__dropdown-menu::-webkit-scrollbar-thumb) {
  background-color: #2e2e2e;
  border-radius: 3px;
}
 
::v-deep(.vs__dropdown-menu::-webkit-scrollbar-thumb:hover) {
  background-color: #3a3a3a;
}
 
.cat-inp {
  position: absolute;
  opacity: 0;
  height: 70;
  pointer-events: none;
  margin-left: 150px;
}
 
.amount-inp {
  position: absolute;
  margin-left: 347px;
  height: 25px;
  padding-left: 11px;
  width: 66px;
}
 
.radio-group {
  display: flex;
  align-items: center;
  margin-left: 50px;
}
 
.radio-option {
  display: flex;
  align-items: center;
  color: #c1bfd9;
  font-size: 13px;
  position: relative;
  cursor: pointer;
}
 
.rd2 {
  margin-left: 30px;
}
 
.radio-option input[type="radio"] {
  opacity: 0;
  position: absolute;
}
 
.radio-option .custom-radio {
  width: 16px;
  height: 16px;
  border: 2px solid #565564;
  border-radius: 50%;
  margin-right: 6px;
  position: relative;
}
 
.radio-option input[type="radio"]:checked + .custom-radio::after {
  content: "";
  position: absolute;
  top: 4px;
  left: 4px;
  width: 8px;
  height: 8px;
  background-color: #78a55a;
  border-radius: 50%;
}
 
.no-spinner::-webkit-outer-spin-button,
.no-spinner::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
 
.expense-form {
  margin-top: 40px;
}
 
.category-select {
  margin-left: 74px;
  width: 285px;
}
 
.mode-select {
  margin-left: 104px;
  width: 285px;
}
 
.currency-select {
  margin-left: 10px;
  width: 110px;
  height: 30px;
}
 
.uploadlabel {
  margin: 0px;
  margin-left: 70px;
}
 
.Vector {
  width: 60px;
  height: 60px;
  margin-top: 100px;
  caret-color: transparent;
}
 
.vect2 {
  border-radius: 10px;
  margin-top: 24px;
  width: 90%;
  height: 78%;
}
 
#fileinput {
  height: 286px;
  display: none;
}
 
.vue-select,
.labels,
.required-note,
.header,
.header2,
.invoice-para,
.page-title,
.mode,
.date,
.amount-inp,
.my-button {
  caret-color: transparent;
  cursor: default;
  user-select: none;
}
 
.header {
  display: flex;
  align-items: center;
  margin-bottom: 0%;
}
 
.required-note {
  color: #c05f5f;
  font-size: 10px;
  margin: 0px;
  padding: 0px;
  margin-left: 35px;
}
 
.inp:hover,
.inp-desc:hover,
.amount-inp:hover {
  border: 1.5px solid #78a55a;
}
 
.inp:focus,
.inp-desc:focus,
.amount-inp:focus {
  outline: none;
  border: 1.5px solid #78a55a;
}
 
.date::-webkit-calendar-picker-indicator {
  width: 100%;
  opacity: 0;
}
 
.header2 {
  cursor: pointer;
  height: "25px";
  width: "25px";
  margin-left: 553px;
}
 
.date {
  text-transform: uppercase;
}
 
.page-title {
  color: #78a55a;
  font-size: 28px;
  padding-left: 35px;
  margin-bottom: 0%;
}
 
#main-div1 {
  margin-left: 35px;
}
 
.tot1 {
  margin-left: 80px;
  height: 25px;
  padding-left: 11px;
  width: 180px;
}
 
#main-div {
  display: flex;
}
 
.new-expense {
  position: absolute;
  top: 50%;
  left: 58%;
  transform: translate(-50%, -50%);
  background: #1b1919;
  border: 1px solid #78a55a;
  padding: 32px;
  border-radius: 8px;
  width: 850px;
  height: 500px;
  z-index: 999;
}
 
.form-group {
  margin-bottom: 16px;
  display: flex;
  align-items: center;
}
 
.labels {
  color: #c1bfd9;
}
 
.amount1,
.date,
.inp-desc {
  color: #565564;
  border-radius: 6px;
  border: 1px solid #565564;
  background-color: #1b1919;
  appearance: none;
}
 
.amount-inp::placeholder {
  color: #565564;
}
 
.date {
  height: 30px;
  width: 285px;
}
 
.drop {
  background-image: url("/src/assets/dropdown.svg");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 10px;
}
 
.date::-webkit-calendar-picker-indicator {
  height: 10px;
  width: 10px;
  filter: invert(91%) sepia(6%) saturate(509%) hue-rotate(207deg)
    brightness(70%) contrast(95%);
  padding-right: 10px;
}
 
.inp-desc {
  margin-left: 63px;
  resize: none;
  padding-left: 11px;
  padding-top: 8px;
  height: 88px;
  width: 270px;
  text-align: start;
  font-size: 13px;
}
 
.my-button {
  background-color: #0d0d0d;
  color: white;
  border: 1px solid #565564;
  cursor: pointer;
  margin-top: 40px;
  margin-left: 700px;
  border-radius: 6px;
  width: 110px;
  height: 32px;
  align-items: center;
}
 
.my-button:hover {
  background-color: #78a55a;
}
 
.upload {
  display: flex;
  margin-top: 36px;
  flex-direction: column;
  border: 1px solid #565564;
  border-radius: 10px;
  background: #1b1919;
  color: #565564;
  height: 283px;
  width: 280px;
  position: relative;
  cursor: pointer;
}
 
.upload input[type="file"] {
  display: none;
  position: absolute;
  cursor: pointer;
  opacity: 0;
}
 
.upload:hover {
  border: 1.5px solid #78a55a;
}
 
.upload img {
  object-fit: cover;
}
 
.upload input {
  width: 20px;
}
 
.date-wrapper {
  margin-left: 104px;
  position: relative;
  width: 285px;
}
 
.custom-date {
  padding-left: 8px;
  font-size: 13px;
  box-sizing: border-box;
  cursor: pointer;
}
 
.calendar-icon {
  position: absolute;
  top: 6px;
  right: 10px;
  width: 20px;
  height: 20px;
  pointer-events: none;
  cursor: pointer;
  caret-color: transparent;
}
 
::v-deep(.dropdown-icon .vs__dropdown-toggle) {
  background-image: url("/src/assets/dropdown.svg");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 12px;
}
 
::v-deep(.custom-input .vs__dropdown-option--highlight) {
  background-color: #78a55a !important;
  color: black;
}
 
::v-deep(.custom-input .vs__dropdown-toggle) {
  background-color: #1b1919 !important;
  color: #565564 !important;
  border: 1px solid #565564 !important;
  height: 30px;
  border-radius: 6px;
}
 
::v-deep(.category-select .vs__search),
::v-deep(.category-select .vs__dropdown-option),
::v-deep(.category-select .vs__dropdown-toggle),
::v-deep(.mode-select .vs__search),
::v-deep(.mode-select .vs__dropdown-option),
::v-deep(.mode-select .vs__dropdown-toggle),
::v-deep(.currency-select .vs__search),
::v-deep(.currency-select .vs__dropdown-option),
::v-deep(.currency-select .vs__dropdown-toggle) {
  font-size: 13px !important;
}
 
::v-deep(.custom-input .vs__selected) {
  background-color: #1b1919 !important;
  color: #565564 !important;
}
 
::v-deep(.custom-input .vs__actions) {
  display: none !important;
}
 
::v-deep(.custom-input .vs__dropdown-menu) {
  background-color: #1b1919 !important;
  color: #c1bfd9 !important;
  border: 1px solid #565564 !important;
}
 
::v-deep .currency-select .vs__dropdown-menu {
  width: 110px !important;
  min-width: unset !important;
  max-width: unset !important;
}
 
::v-deep(.custom-input:hover .vs__dropdown-toggle) {
  border: 1.5px solid #78a55a !important;
}
 
@media (max-width: 600px) {
  .new-expense {
    padding: 10px;
    width: 310px;
    height: 454px;
  }
 
  .header2 {
    height: 15px;
    width: 15px;
    margin-left: 110px;
    padding-top: 20px;
  }
 
  .page-title {
    font-size: 18px;
    padding-top: 10px;
    padding-left: 15px;
  }
 
  .required-note {
    margin-left: 17px;
    font-size: 9px;
  }
 
  .radio-group {
    margin-left: 15px;
  }
 
  .radio-option {
    font-size: 11px;
  }
 
  .labels {
    font-size: 13px;
  }
 
  #main-div1 {
    margin-left: 16px;
  }
 
  .rd2 {
    margin-left: 10px;
  }
 
  .radio-option .custom-radio {
    width: 12px;
    height: 12px;
  }
 
  .radio-option input[type="radio"]:checked + .custom-radio::after {
    width: 6px;
    height: 6px;
    top: 3px;
    left: 3px;
  }
 
  .category-select {
    width: 178px;
    margin-left: 30px;
  }
 
  .mode-select {
    width: 113px;
    margin-left: 54px;
  }
 
  .inp-desc {
    margin-left: 22px;
    padding-left: 11px;
    padding-top: 8px;
    height: 48px;
    width: 163px;
    font-size: 10px;
  }
 
  .date-wrapper {
    margin-left: 41px;
    position: relative;
    width: 290px;
  }
 
  .date {
    width: 112px;
    margin-left: 14px;
    height: 21px;
    font-size: 10px;
    padding-left: 5px;
  }
 
  .date::placeholder {
    font-size: 4px;
  }
 
  .calendar-icon {
    position: relative;
    top: 2px;
    right: 18px;
    width: 10px;
    height: 10px;
  }
 
  .tot1 {
    margin-left: 36px;
    height: 18px;
    width: 104px;
  }
 
  input[type="number"] {
    font-size: 10px;
    padding-left: 5px;
  }
 
  .upload {
    margin-top: 61px;
    margin-left: -225px;
    height: 53px;
    width: 55px;
    position: absolute;
    border-radius: 5px;
  }
 
  .Vector {
    width: 20px;
    height: 20px;
    margin-top: 15px;
    caret-color: transparent;
  }
 
  .vect2 {
    border-radius: 10px;
    margin-top: 2px;
    width: 90%;
    height: 78%;
  }
 
  .invoice-para {
    font-size: 5px;
    margin-top: 2px;
  }
 
  .amount-inp {
    font-size: 10px;
    position: absolute;
    margin-left: 208px;
    height: 19px;
    padding-left: 8px;
    width: 45px;
  }
 
  .my-button {
    margin-top: 17px;
    margin-left: 212px;
    border-radius: 6px;
    width: 70px;
    height: 25px;
    font-size: 10px;
    align-items: center;
  }
 
  ::v-deep .category-select .vs__dropdown-menu {
    width: 175px !important;
    min-width: unset !important;
    max-width: unset !important;
  }
 
  ::v-deep .mode-select .vs__dropdown-menu {
    width: 110px !important;
    min-width: unset !important;
    max-width: unset !important;
  }
 
  ::v-deep(.category-select .vs__search),
  ::v-deep(.category-select .vs__dropdown-option),
  ::v-deep(.category-select .vs__dropdown-toggle),
  ::v-deep(.mode-select .vs__search),
  ::v-deep(.mode-select .vs__dropdown-option),
  ::v-deep(.mode-select .vs__dropdown-toggle),
  ::v-deep(.currency-select .vs__search),
  ::v-deep(.currency-select .vs__dropdown-option),
  ::v-deep(.currency-select .vs__dropdown-toggle) {
    font-size: 8px !important;
  }
 
  ::v-deep(.custom-input .vs__dropdown-toggle) {
    height: 21px;
  }
 
  ::v-deep(.dropdown-icon .vs__dropdown-toggle) {
    background-position: right 6px center;
    background-size: 7px;
  }
 
  .form-group {
    margin-bottom: 12px;
  }
}
 
@media (min-width: 601px) and (max-width: 1024px) {
  .new-expense {
    padding: 15px;
    width: 450px;
    height: 500px;
  }
 
  .header2 {
    height: 28px;
    width: 28px;
    margin-left: 156px;
    padding-top: 35px;
  }
 
  .page-title {
    font-size: 26px;
    padding-top: 15px;
    padding-left: 25px;
  }
 
  .required-note {
    margin-left: 25px;
    font-size: 11px;
  }
 
  .radio-group {
    margin-left: 25px;
  }
 
  .radio-option {
    font-size: 13px;
  }
 
  .labels {
    font-size: 15px;
  }
 
  #main-div1 {
    margin-left: 25px;
  }
 
  .rd2 {
    margin-left: 15px;
  }
 
  .radio-option .custom-radio {
    width: 15px;
    height: 15px;
  }
 
  .radio-option input[type="radio"]:checked + .custom-radio::after {
    width: 8px;
    height: 8px;
    top: 4px;
    left: 4px;
  }
 
  .category-select {
    width: 269px;
    margin-left: 40px;
  }
 
  .mode-select {
    width: 182px;
    margin-left: 68px;
  }
 
  .inp-desc {
    margin-left: 30px;
    padding-left: 15px;
    padding-top: 10px;
    height: 55px;
    width: 249px;
    font-size: 12px;
  }
 
  .date-wrapper {
    margin-left: 50px;
    position: relative;
    width: 350px;
  }
 
  .date {
    width: 182px;
    margin-left: 19px;
    height: 28px;
    font-size: 12px;
    padding-left: 8px;
  }
 
  .date::placeholder {
    font-size: 8px;
  }
 
  .calendar-icon {
    position: relative;
    top: 3px;
    right: 22px;
    width: 15px;
    height: 15px;
  }
 
  .tot1 {
    margin-left: 47px;
    height: 24px;
    width: 168px;
  }
 
  input[type="number"] {
    font-size: 12px;
    padding-left: 8px;
  }
 
  .upload {
    margin-top: 77px;
    margin-left: -209px;
    height: 70px;
    width: 75px;
    position: absolute;
    border-radius: 5px;
  }
 
  .Vector {
    width: 28px;
    height: 28px;
    margin-top: 20px;
    caret-color: transparent;
  }
 
  .vect2 {
    border-radius: 10px;
    margin-top: 3px;
    width: 90%;
    height: 78%;
  }
 
  .invoice-para {
    font-size: 8px;
    margin-top: 3px;
  }
 
  .amount-inp {
    font-size: 12px;
    position: absolute;
    margin-left: 297px;
    height: 25px;
    padding-left: 10px;
    width: 63px;
  }
 
  .my-button {
    margin-top: 25px;
    margin-left: 310px;
    border-radius: 6px;
    width: 90px;
    height: 30px;
    font-size: 12px;
    align-items: center;
  }
 
  ::v-deep .category-select .vs__dropdown-menu {
    width: 269px !important;
    min-width: unset !important;
    max-width: unset !important;
  }
 
  ::v-deep .mode-select .vs__dropdown-menu {
    width: 182px !important;
    min-width: unset !important;
    max-width: unset !important;
  }
 
  ::v-deep(.category-select .vs__search),
  ::v-deep(.category-select .vs__dropdown-option),
  ::v-deep(.category-select .vs__dropdown-toggle),
  ::v-deep(.mode-select .vs__search),
  ::v-deep(.mode-select .vs__dropdown-option),
  ::v-deep(.mode-select .vs__dropdown-toggle),
  ::v-deep(.currency-select .vs__search),
  ::v-deep(.currency-select .vs__dropdown-option),
  ::v-deep(.currency-select .vs__dropdown-toggle) {
    font-size: 10px !important;
  }
 
  ::v-deep(.custom-input .vs__dropdown-toggle) {
    height: 28px;
  }
 
  ::v-deep(.dropdown-icon .vs__dropdown-toggle) {
    background-position: right 8px center;
    background-size: 10px;
  }
 
  .form-group {
    margin-bottom: 15px;
  }
}
</style>
 