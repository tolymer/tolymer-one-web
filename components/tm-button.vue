<template>
  <button
    :type="type"
    :kind="kind"
    :class="[k]"
    class="Button"
    @click="onClick">
    <slot />
  </button>
</template>

<script>
const types = ['button', 'submit'];
const kinds = ['normal', 'primary'];

export default {
  props: {
    type: {
      type: String,
      default: 'button',
      validator: t => types.indexOf(t) !== -1
    },
    kind: {
      type: String,
      default: 'normal',
      validator: k => kinds.indexOf(k) !== -1
    }
  },
  computed: {
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
  height: 48px;
  padding: 0 16px;
  border: 2px solid transparent;
  border-radius: 100em;
  background-color: transparent;
  line-height: 48px;
  font-weight: bold;
  transition: border-color 300ms ease-in-out, box-shadow 300ms ease-in-out;
  will-change: border-color, box-shadow;
}

.Button:hover {
}

.Button:active {
}

.Button:focus {
  outline: none;
}

.Button.-normal {
  border: spx solid #f2eeec;
  background-color: #f2eeec;
  color: #2E282A;
}

.Button.-normal:hover {
  border-color: #2E282A;
}

.Button.-normal:active {
}

.Button.-normal:focus {
  border-color: #2E282A;
  box-shadow: 0 0 0 3px #5dc0f6;
}
.Button.-primary {
  color: #2e282a;
  border: 2px solid #3de884;
  background-color: #3de884;
}

.Button.-primary:hover {
  border-color: #099f47;
}

.Button.-primary:active {
}

.Button.-primary:focus {
  border-color: #099f47;
  box-shadow: 0 0 0 3px #5dc0f6;
}
</style>
