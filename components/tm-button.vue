<template>
  <button
    :type="type"
    :appearance="appearance"
    :kind="kind"
    :class="[a,k]"
    class="Button"
    @click="onClick">
    <slot />
  </button>
</template>

<script>
const appearances = ['text', 'button'];
const types = ['button', 'submit'];
const kinds = ['normal', 'primary'];

export default {
  props: {
    type: {
      type: String,
      default: 'button',
      validator: t => types.indexOf(t) !== -1
    },
    appearance: {
      type: String,
      default: 'button',
      validator: a => appearances.indexOf(a) !== -1
    },
    kind: {
      type: String,
      default: 'normal',
      validator: k => kinds.indexOf(k) !== -1
    }
  },
  computed: {
    a() {
      return `-${this.appearance}`;
    },
    k() {
      return `-${this.kind}`;
    }
  },
  methods: {
    onClick(e) {
      this.$emit('click', e);
    }
  }
};
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
  height: 48px;
  padding: 0 16px;
  border: 2px solid transparent;
  border-radius: 100em;
  background-color: transparent;
  text-align: center;
  line-height: 48px;
  font-weight: bold;
  transition: border-color 300ms ease-in-out, box-shadow 300ms ease-in-out;
  will-change: border-color, box-shadow;
}

.Button.-button.-normal {
  border: 2px solid #f2eeec;
  background-color: #f2eeec;
  color: #2E282A;
}

.Button.-button.-normal:hover {
  border-color: #D3CCC9;
}

.Button.-button.-normal:active {
}

.Button.-button.-normal:focus {
  border-color: #D3CCC9;
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

.Button.-button.-primary:active {
}

.Button.-button.-primary:focus {
  border-color: #099f47;
  box-shadow: 0 0 0 3px #5dc0f6;
}
</style>
