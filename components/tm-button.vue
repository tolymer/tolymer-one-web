<template>
  <button :type="type" :appearance="appearance" :kind="kind" :class="[a, k]" class="Button" @click="onClick">
    <slot />
  </button>
</template>

<script lang="ts">
import Vue from 'vue';
const appearances = ['text', 'button'];
const types = ['button', 'submit'];
const kinds = ['normal', 'primary', 'modest', 'disabled'];

export default Vue.extend({
  props: {
    type: {
      type: String,
      default: 'button',
      validator: (t: string) => types.indexOf(t) !== -1
    },
    appearance: {
      type: String,
      default: 'button',
      validator: (a: string) => appearances.indexOf(a) !== -1
    },
    kind: {
      type: String,
      default: 'normal',
      validator: (k: string) => kinds.indexOf(k) !== -1
    }
  },
  computed: {
    a(): string {
      return `-${this.appearance}`;
    },
    k(): string {
      return `-${this.kind}`;
    }
  },
  methods: {
    onClick(e: any) {
      if (this.kind !== 'disabled') {
        this.$emit('click', e);
      }
    }
  }
});
</script>

<style scoped>
.Button {
  display: inline-block;
}

.Button:hover {
}

.Button:active {
}

.Button:focus {
  outline: none;
}

.Button.-text {
}

.Button.-button {
  padding: 0.75em 16px;
  border: 2px solid transparent;
  border-radius: 100em;
  background-color: transparent;
  text-align: center;
  line-height: 1.1;
  font-weight: bold;
  transition: border-color 300ms ease-in-out, box-shadow 300ms ease-in-out;
  will-change: border-color, box-shadow;
}

.Button.-button.-normal {
  border: 2px solid #f2eeec;
  background-color: #f2eeec;
  color: #2e282a;
}

.Button.-button.-normal:hover {
  border-color: #d3ccc9;
}

.Button.-button.-normal:active {
}

.Button.-button.-normal:focus {
  border-color: #d3ccc9;
  box-shadow: 0 0 0 3px #5dc0f6;
}

.Button.-button.-primary {
  color: #2e282a;
  border: 2px solid #3de884;
  background-color: #3de884;
}

.Button.-button.-primary:hover {
  border-color: #099f47;
}

.Button.-button.-primary:focus {
  border-color: #099f47;
  box-shadow: 0 0 0 3px #5dc0f6;
}

.Button.-button.-modest {
  border-radius: 0;
  padding: 0.5em 0;
  color: #099f47;
  border: 0;
  background-color: transparent;
  font-size: small;
}

.Button.-button.-modest:hover {
  border: 0;
}

.Button.-button.-modest:focus {
  border-color: #099f47;
  box-shadow: 0 0 0 3px #5dc0f6;
}

.Button.-disabled {
  border: 2px solid #f2eeec;
  background-color: #f2eeec;
  color: #d6d1d1;
  pointer-events: none;
}
</style>
