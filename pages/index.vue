<template>
  <main>
    <div class="sticks"/>
    <h1 class="appname">tolymer</h1>
    <div class="Form">
      <h3>参加者（必須）</h3>
      <ul>
        <li>
          <tm-input type="text" v-model="participants[0]" placeholder="例: ほかむら"/>
        </li>
        <li>
          <tm-input type="text" v-model="participants[1]" placeholder="例: たに"/>
        </li>
        <li>
          <tm-input type="text" v-model="participants[2]" placeholder="例: せんすい"/>
        </li>
        <li>
          <tm-input type="text" v-model="participants[3]" placeholder="例: たなか"/>
        </li>
      </ul>
      <div class="Form-item" style="margin-top: 30px">
        <tm-input
          v-model="description"
          type="textarea"
          :rows="5"
          :cols="40"
          label="概要"
          placeholder="例）
場所: 渋谷 Zoo
日程: 2018/12/10"
        />
      </div>
      <div class="Form-action">
        <tm-button @click="submit()" class="Form-button" kind="primary">イベント作成</tm-button>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue';
import tmInput from '~/components/tm-input.vue';
import tmButton from '~/components/tm-button.vue';
import { createEvent } from '~/lib/TolymerGrpcClient';
import { alertError } from '~/lib/errorHandler';

export default Vue.extend({
  components: {
    tmInput,
    tmButton
  },
  data() {
    return {
      description: '',
      participants: []
    };
  },
  methods: {
    async submit() {
      const [err, event] = await createEvent({
        description: this.description,
        participants: this.participants
      });

      if (err) {
        alertError(err);
      } else {
        this.$router.push(`/events/${event.token}/table`);
      }
    }
  }
});
</script>

<style scoped>
.sticks {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 24px;
  width: 313px;
  height: 120px;
  background-image: url('/sticks.svg');
  background-size: 313px 214px;
  background-position: center bottom;
}

.appname {
  margin-bottom: 32px;
  text-align: center;
  font-size: 32px;
}

.Form {
  margin-left: auto;
  margin-right: auto;
  padding-left: 16px;
  padding-right: 16px;
  max-width: 640px;
}

.Form-item {
  margin-bottom: 16px;
}

.Form-action {
  margin-top: 24px;
  text-align: center;
}

.Form-button {
  min-width: 240px;
}
</style>
