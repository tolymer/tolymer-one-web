<template>
  <main>
    <header class="header">
      <div class="header-inner">
        <nuxt-link class="back" :to="`/events/${token}`">＜</nuxt-link>
      </div>
    </header>

    <div class="body">
      <div class="Form">
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

        <h3>参加者</h3>
        <ul>
          <li v-for="(participant, i) in participants" :key="i">
            <tm-input type="text" v-model="participant.name" />
          </li>
        </ul>
        <div class="Form-action">
          <tm-button
            @click="submit()"
            class="Form-button"
            kind="primary">変更</tm-button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import tmInput from '../../../components/tm-input';
import tmButton from '../../../components/tm-button';
import { getEvent, updateEvent, updateParticipants, GrpcError } from '../../../lib/TolymerGrpcClient';
import { alertError } from '../../../lib/errorHandler';

export default {
  components: {
    tmInput,
    tmButton
  },
  async asyncData({ params, error }) {
    const token = params.token;
    const [err, event] = await getEvent(token);

    if (err) {
      error({ statusCode: err.isNotFound() ? 404 : 500, message: err.message });
      return;
    }

    return {
      token: event.token,
      description: event.description,
      participants: event.participantsList
    };
  },
  methods: {
    async submit() {
      const [err1] = await updateEvent({ token: this.token, description: this.description });
      if (err1) return alertError(err1);

      const [err2] = await updateParticipants({ token: this.token, renamingParticipants: this.participants });
      if (err2) return alertError(err2);

      this.$router.push(`/events/${this.token}`);
    }
  }
};
</script>

<style scoped>
.header {
  background-color: #f9bf3b;
}

.header-inner {
  position: relative;
  margin-left: auto;
  margin-right: auto;
  padding: 16px;
  max-width: 640px;
}

.back {
  font-size: 16px;
  font-weight: bold;
  color: inherit;
  text-decoration: none;
}

.body {
  margin-left: auto;
  margin-right: auto;
  padding: 16px;
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
