<template>
  <div class="form-card" @click.stop>
    <input
      v-for="(field, index) in fields"
      :key="index"
      :type="field.type"
      :placeholder="field.placeholder"
      v-model="localValues[index]"
    />
    <div class="form-actions">
      <button @click.stop="$emit('cancel')">Cancel</button>
      <button @click.stop.prevent="emitSave">Save</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SettingsFormCard",
  props: {
    fields: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      localValues: []
    };
  },
  mounted() {
    this.localValues = this.fields.map(() => "");
  },
  methods: {
    emitSave() {
      this.$emit("save", this.localValues);
    }
  }
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

.form-card input {
  padding: 0.5rem;
  background-color: #222;
  border: 1px solid #444;
  border-radius: 4px;
  color: white;
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
</style>
