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
            <div class="radio-group" style="margin-left: 50px">
              <label class="radio-option">
                <input
                  type="radio"
                  name="transactionType"
                  value="Credits"
                  v-model="form.transactionType"
                  required
                />
                <span class="custom-radio"></span>
                Credits
              </label>
              <label class="radio-option" style="margin-left: 30px">
                <input
                  type="radio"
                  name="transactionType"
                  value="Expense"
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
            <input
              type="text"
              v-model="form.category"
              class="cat-inp"
              required
              tabindex="-1"
            />
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
              />
              <img
                :src="require('@/assets/datepic.svg')"
                alt="Calendar Icon"
                class="calendar-icon"
              />
            </div>
          </div>

          <div class="form-group">
            <label class="labels total">Amount*</label>
            <input
              v-model="form.total"
              type="number"
              class="inp tot1 amount1 no-spinner"
              required
            />
            <input
              type="text"
              placeholder="Rupee"
              v-model="form.tot2"
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
            <img
              :src="require('@/assets/Vector.svg')"
              alt="Upload"
              class="Vector"
            />
            <p class="invoice-para">{{ filename }}</p>
            <input
              type="file"
              id="fileInput"
              @change="handleFileUpload"
              ref="fileInput"
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

export default {
  components: { vSelect },
  data() {
    return {
      filename: "Upload an invoice",
      form: {
        transactionType: "Credits",
        category: "",
        mode: "",
        date: "",
        total: "",
        currency: "Rupee",
        description: "",
      },
      CategoriesOptions: [
        "Travel",
        "Food",
        "Rent",
        "Salary",
        "Freelance",
        "Business Income",
        "Interest",
        "Investment Income",
        "Utilities",
        "Entertainment",
        "Shopping",
        "Health",
        "Education",
        "Gifts",
        "Subscriptions",
        "Insurance",
        "Taxes",
        "Other",
      ],
      ModeOptions: ["Debit card", "Credit card", "UPI", "Cash", "Other"],
      currencyOptions: ["Rupee", "Dollar", "Euro"],
    };
  },
  computed: {
    currentCategoryOptions() {
      if (this.form.transactionType === "Credits") {
        return [
          "Salary",
          "Freelance",
          "Business Income",
          "Interest",
          "Investment Income",
          "Gifts",
          "Other",
        ];
      } else {
        return this.CategoriesOptions.filter(
          (cat) =>
            cat !== "Salary" &&
            cat !== "Freelance" &&
            cat !== "Business Income" &&
            cat !== "Interest" &&
            cat !== "Investment Income" &&
            cat !== "Gifts"
        );
      }
    },
    modeOptions() {
      if (this.form.transactionType === "Credits") {
        return ["Credit card", "Online", "Other"];
      } else {
        return this.ModeOptions.filter(
          (mode) => mode !== "Credit card" && mode !== "Online"
        );
      }
    },
  },
  watch: {
    "form.transactionType"(newVal, oldVal) {
      if (
        this.form.category &&
        !this.currentCategoryOptions.includes(this.form.category)
      ) {
        this.form.category = "";
      }
      if (this.form.mode && !this.modeOptions.includes(this.form.mode)) {
        this.form.mode = "";
      }
    },
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      this.filename = file ? `${file.name}` : "Upload an invoice";
    },
    submitExpense() {
      const priceValue = parseFloat(this.form.total);
      const formattedDate = this.getFormattedDate(this.form.date);
      const currencySymbol = this.getCurrencySymbol(this.form.tot2);

      const newTransaction = {
        category: this.form.category,
        icon: this.getIcon(this.form.category),
        currency: this.form.tot2 || "Rupee",
        mode: this.form.mode,
        date: formattedDate,
        price:
          this.form.transactionType === "Credits" ? priceValue : -priceValue,
        priceClass:
          this.form.transactionType === "Credits" ? "positive" : "negative",
        description: this.form.description,
      };

      this.$store.dispatch("addTransaction", newTransaction);
      this.form.transactionType = "Credits";
      this.form.category = "";
      this.form.mode = "";
      this.form.date = "";
      this.form.total = "";
      this.form.tot2 = "";
      this.form.description = "";
      this.filename = "Upload an invoice";

      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = null;
      }
      this.$emit("close");
    },

    getFormattedDate(dateInput) {
      const date = new Date(dateInput);
      return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    },
    getCurrencySymbol(currency) {
      return "₹"[currency] || "";
    },
    getIcon(category) {
      const iconMap = {
        Food: "Food logo.svg",
        Travel: "Travel icon.svg",
        Rent: "Rent Icon.svg",
        Salary: "Salary Icon.svg",
      };
      return iconMap[category] || "default-icon.svg";
    },
    getCategoryClass(category) {
      const classMap = {
        Food: "food-category-icons",
        Travel: "travel-category-icons",
        Rent: "rent-category-icons",
        Salary: "salary-category-icons",
      };
      return classMap[category] || "";
    },
  },
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
}

.radio-option {
  display: flex;
  align-items: center;
  color: #c1bfd9;
  font-size: 13px;
  position: relative;
  cursor: pointer;
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

.no-spinner {
  -moz-appearance: textfield;
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
  left: 12%;
  top: 1%;
  background: #1b1919;
  border: 1px solid #78a55a;
  padding: 32px;
  border-radius: 8px;
  width: 850px;
  height: 500px;
  z-index: 1000;
  margin: 42px 0px 5px 145px;
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
  height: 16px;
  width: 16px;
  filter: invert(91%) sepia(6%) saturate(509%) hue-rotate(207deg)
    brightness(70%) contrast(95%);
  padding-right: 10px;
}

.inp-desc {
  margin-left: 63px;
  resize: none;
  padding-left: 11px;
  padding-top: 8px;
  font-family: "Roboto", sans-serif;
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
</style>
