<template>
  <label class="Input">
    <p class="Input-label">{{ label }}</p>
    <input
      v-if="type !== 'textarea'"
      :type="type"
      :value="value"
      :placeholder="placeholder"
      :minlength="minlength"
      :maxlength="maxlength"
      :disabled="disabled"
      :readonly="readonly"
      class="Input-field"
      @input="onInput"
    >
    <textarea
      v-if="type === 'textarea'"
      :value="value"
      :placeholder="placeholder"
      :rows="rows"
      :cols="cols"
      :minlength="minlength"
      :maxlength="maxlength"
      :disabled="disabled"
      :readonly="readonly"
      :resize="resize"
      class="Input-field"
      @input="onInput"
    ></textarea>
  </label>
</template>

<script lang="ts">
import Vue from 'vue';
const types = ['text', 'search', 'email', 'date', 'password', 'textarea'];

export default Vue.extend({
  props: {
    type: {
      type: String,
      default: 'text',
      validator: (t: string) => types.indexOf(t) !== -1
    },
    label: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: null
    },
    rows: {
      type: Number,
      default: null
    },
    cols: {
      type: Number,
      default: null
    },
    minlength: {
      type: Number,
      default: null
    },
    maxlength: {
      type: Number,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    resize: {
      type: Boolean,
      default: false
    },
    mode: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onInput(e: any) {
      this.$emit('input', e.target.value);
    }
  }
});
</script>

<style>
.Input {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.Input-label {
  margin-bottom: 8px;
}

.Input-field {
  outline: none;
  padding: 8px 12px;
  border-width: 0 0 2px 0;
  border-bottom-style: solid;
  border-bottom-color: #2e282a;
  background-color: #f2eeec;
  transition: border-color 300ms ease-in-out, box-shadow 300ms ease-in-out;
  will-change: border-color, box-shadow;
}

.Input-field:focus {
  border-color: #099f47;
  border-color: #5dc0f6;
  /*box-shadow: 0 0 0 3px #3DE884;*/
  /*box-shadow: 0 0 0 3px #F2EEEC;*/
}
</style>
