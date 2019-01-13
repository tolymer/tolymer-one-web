<template>
  <nuxt-link :to="to" :appearance="appearance" :kind="kind" :class="[a,k]" class="Link">
    <slot/>
  </nuxt-link>
</template>

<script lang="ts">
import Vue from 'vue';
const appearances = ['text', 'button'];
const kinds = ['normal', 'primary'];

export default Vue.extend({
  props: {
    to: {
      type: [String, Location],
      default: ''
    },
    appearance: {
      type: String,
      default: 'text',
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
  }
});
</script>

<style scoped>
.Link {
  display: inline-block;
}

.Link:hover {
}

.Link:active {
}

.Link.-button {
  height: 48px;
  padding: 0 16px;
  border: 2px solid transparent;
  border-radius: 100em;
  background-color: transparent;
  text-align: center;
  line-height: 48px;
  font-weight: bold;
  text-decoration: none;
  transition: border-color 300ms ease-in-out, box-shadow 300ms ease-in-out;
  will-change: border-color, box-shadow;
}

.Link.-button:focus {
  outline: none;
}

.Link.-button.-normal {
  border: 2px solid #f2eeec;
  background-color: #f2eeec;
  color: #2e282a;
}

.Link.-button.-normal:hover {
}

.Link.-button.-normal:active {
}

.Link.-button.-normal:focus {
  border-color: #d3ccc9;
  box-shadow: 0 0 0 3px #5dc0f6;
}

.Link.-button.-primary {
  color: #2e282a;
  border: 2px solid #3de884;
  background-color: #3de884;
}

.Link.-button.-primary:hover {
  border-color: #099f47;
}

.Link.-button.-primary:active {
}

.Link.-button.-primary:focus {
  border-color: #099f47;
  box-shadow: 0 0 0 3px #5dc0f6;
}
</style>
