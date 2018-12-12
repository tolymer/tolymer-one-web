<template>
  <main>
    <header class="header">
      <div class="header-inner">
        <h1 class="title">
          <nuxt-link :to="`/events/${token}`">Event Top</nuxt-link>
        </h1>
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
            kind="primary">Edit event</tm-button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import tmInput from '../../../components/tm-input';
import tmButton from '../../../components/tm-button';
import { getEvent, updateEvent, updateParticipants } from '../../../lib/TolymerGrpcClient';

export default {
  components: {
    tmInput,
    tmButton
  },
  async asyncData({ params }) {
    const token = params.token;
    const event = await getEvent(token);
    const pad = n => (n.toString().length === 1 ? `0${n}` : n);
    return {
      token: event.token,
      description: event.description,
      participants: event.participantsList
    };
  },
  methods: {
    async submit() {
      await updateEvent({
        token: this.token,
        description: this.description
      });
      await updateParticipants({ token: this.token, renamingParticipants: this.participants });
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

.title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 52px;
  font-size: 16px;
  font-weight: bold;
}

.title a {
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
