<template>
  <div class="form-card" @click.stop>
    <div v-for="(field, index) in fields" :key="index" class="input-wrapper">
      <input
        :type="getInputType(field.type, index)"
        :placeholder="field.placeholder"
        v-model="localValues[index]"
        required
      />
      <span
        v-if="field.type === 'password'"
        class="toggle-visibility"
        @click="toggleVisibility(index)"
      >
        <i :class="showPassword[index] ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
      </span>
    </div>

    <div class="form-actions">
      <button class="cancel-btn" @click.stop="$emit('cancel')">Cancel</button>
      <button class="save-btn" @click.stop.prevent="emitSave">Save</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SettingsFormCard",
  props: {
    fields: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      localValues: [],
      showPassword: [],
    };
  },
  mounted() {
    this.localValues = this.fields.map(() => "");
    this.showPassword = this.fields.map(() => false);
  },
  methods: {
    emitSave() {
      this.$emit("save", this.localValues);
    },
    toggleVisibility(index) {
      this.$set(this.showPassword, index, !this.showPassword[index]);
    },
    getInputType(type, index) {
      if (type === "password") {
        return this.showPassword[index] ? "text" : "password";
      }
      return type;
    },
  },
};
</script>

<style scoped>
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

.input-wrapper {
  position: relative;
}

.input-wrapper input {
  outline: none;
}

.input-wrapper input:focus {
  border-color: #78a55a;
}

.form-card input {
  width: 83%;
  padding: 0.5rem;
  padding-right: 2rem;
  background-color: #222;
  border: 1px solid #444;
  border-radius: 4px;
  color: white;
}

.toggle-visibility {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #aaa;
  cursor: pointer;
}

.form-card input:focus {
  border:  1px solid #78a55a;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.form-actions button {
  background-color: transparent;
  border: 1px solid #444;
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
}

.save-btn:hover {
  background-color: #78a55a;
  color: white;
}

.cancel-btn:hover {
  background: #b22222;
}
</style>
