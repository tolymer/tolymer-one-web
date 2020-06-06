<template>
  <main>
    <header class="header">
      <div class="header-inner">
        <h1>イベント情報</h1>
        <nuxt-link :to="`/events/${token}/table`" class="tm-iconLink back">
          <i class="fas fa-angle-left"></i>
        </nuxt-link>
        <nuxt-link :to="`/events/${token}/edit`" class="tm-iconLink edit">
          <i class="fas fa-edit"></i>
        </nuxt-link>
      </div>
    </header>
    <div class="body">
      <h2>参加者</h2>
      <ul class="participant">
        <li v-for="(partipant, i) in participants" :key="i">{{ partipant.name }}</li>
      </ul>
    </div>
  </main>
</template>

<script lang="ts">
import { getEvent } from '~/lib/TolymerGrpcClient';

export default {
  async asyncData({ params, error }) {
    const token = params.token;
    const [err, event] = await getEvent(token);

    if (err) {
      error({ statusCode: err.isNotFound() ? 404 : 500, message: err.message });
      return;
    }

    return {
      token: event.token,
      participants: event.participantsList
    };
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

.edit {
  position: absolute;
  font-size: 16px;
  right: 0px;
  top: 0px;
}

.body {
  margin-left: auto;
  margin-right: auto;
  padding: 16px;
  max-width: 640px;
}

.participant {
  margin-top: 10px;
}

.participant > * {
  display: inline-block;
  margin-bottom: 8px;
}

.participant > * + *::before {
  content: ',';
  margin-right: 0.5em;
  display: inline-block;
}

.action {
  margin-top: 24px;
  text-align: center;
}

.inputResult {
  min-width: 240px;
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
