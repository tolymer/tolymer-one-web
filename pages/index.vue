<template>
  <main>
    <div class="sticks"/>
    <h1 class="appname">tolymer</h1>
    <div class="Form">
      <div class="Form-item">
        <tm-input
          v-model="participants"
          type="textarea"
          :rows=4
          :cols=40
          label="参加者（必須）"
          placeholder="すずきさん
さとうくん
たなかさん
きむらくん"/>
      </div>
      <div class="Form-item">
        <tm-input
          v-model="description"
          type="textarea"
          :rows=5
          :cols=40
          label="概要"
          placeholder="例）
場所: 渋谷 Zoo
日程: 2018/12/10"/>
      </div>
      <div class="Form-action">
        <tm-button
          @click="submit()"
          class="Form-button"
          kind="primary">イベント作成</tm-button>
      </div>
    </div>
  </main>
</template>

<script>
import tmInput from '../components/tm-input';
import tmButton from '../components/tm-button';
import { createEvent } from '../lib/TolymerGrpcClient';
import { alertError } from '../lib/errorHandler';

export default {
  components: {
    tmInput,
    tmButton
  },
  data() {
    return {
      description: '',
      participants: ''
    };
  },
  methods: {
    async submit() {
      const [err, event] = await createEvent({
        description: this.description,
        participants: this.participants.split('\n')
      });

      if (err) {
        alertError(err);
      } else {
        this.$router.push(`/events/${event.token}`);
      }
    }
  }
};
</script>

<style scoped>
.sticks {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 24px;
  width: 313px;
  height: 120px;
  background-image: url('/static/sticks.svg');
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
