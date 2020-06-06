<template>
  <main>
    <header class="header">
      <div class="header-inner">
        <h1>イベント情報変更</h1>
        <nuxt-link :to="`/events/${token}/info`" class="tm-iconLink back">
          <i class="fas fa-angle-left"></i>
        </nuxt-link>
      </div>
    </header>

    <div class="body">
      <div class="Form">
        <h3>参加者</h3>
        <ul>
          <li v-for="(participant, i) in participants" :key="i">
            <tm-input type="text" v-model="participant.name" />
          </li>
        </ul>
        <div class="Form-item" style="margin-top: 30px">
          <tm-input v-model="eventDate" type="date" label="開催日" />
        </div>
        <div class="Form-action">
          <tm-button @click="submit()" class="Form-button" kind="primary">変更</tm-button>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue';
import tmInput from '~/components/tm-input.vue';
import tmButton from '~/components/tm-button.vue';
import { getEvent, updateEvent, updateParticipants } from '~/lib/TolymerGrpcClient';
import { alertError } from '~/lib/errorHandler';
import { protoToDate } from '~/lib/ProtobufType';

export default Vue.extend({
  components: {
    tmInput,
    tmButton
  },
  data() {
    return {
      token: '',
      eventDate: '',
      participants: []
    };
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
      eventDate: protoToDate(event.eventDate).format('YYYY-MM-DD'),
      participants: event.participantsList
    };
  },
  methods: {
    async submit(): Promise<void> {
      const [err1] = await updateEvent({ token: this.token, eventDate: this.eventDate });
      if (err1) return alertError(err1);

      const [err2] = await updateParticipants({ token: this.token, renamingParticipants: this.participants });
      if (err2) return alertError(err2);

      this.$router.push(`/events/${this.token}/info`);
    }
  }
});
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

.header-inner h1 {
  text-align: center;
}

.tm-iconLink {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  border: 2px solid transparent;
  border-radius: 100em;
  background-color: transparent;
  color: inherit;
  text-decoration: none;
  transition: border-color 300ms ease-in-out, box-shadow 300ms ease-in-out;
  will-change: border-color, box-shadow;
}

.back {
  position: absolute;
  font-size: 24px;
  left: 0px;
  top: 0px;
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
