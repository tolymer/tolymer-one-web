<template>
  <main>
    <header class="header">
      <div class="header-inner">
        <h1 class="title">Tolymer</h1>
        <div class="edit">
          <nuxt-link
            :to="`/events/${token}/edit`"
            class="edit-tm-iconLink">編集</nuxt-link>
          <!-- FIXME: @hiloki 編集ボタンをアイコンリンクにする -->
        </div>
      </div>
    </header>
    <div class="body">
      <div class="description">{{ description }}</div>
      <h2>参加者</h2>
      <ul class="participant">
        <li v-for="(partipant, i) in participants" :key="i">{{ partipant.name }}</li>
      </ul>
      <div class="action">
        <tm-link
          :to="`/events/${token}/results`"
          appearance="button"
          kind="primary"
          class="inputResult">点数表</tm-link>
      </div>
    </div>
  </main>
</template>

<script>
import tmLink from '../../../components/tm-link';
import { getEvent } from '../../../lib/TolymerGrpcClient';

export default {
  components: {
    tmLink
  },
  async asyncData({ params }) {
    const token = params.token;
    const event = await getEvent(token);
    return {
      token: event.token,
      description: event.description,
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

.title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 52px;
  font-size: 24px;
  font-weight: bold;
}

.edit {
  position: absolute;
  right: 8px;
  bottom: 4px;
}

.edit-tm-iconLink {
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

.body {
  margin-left: auto;
  margin-right: auto;
  padding: 16px;
  max-width: 640px;
}

.description {
  margin-bottom: 16px;
  white-space: pre-wrap;
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
