<template>
  <main>
    <header class="header">
      <div class="header-inner">
        <p class="date">{{ date }}</p>
        <h1 class="title">{{ title }}</h1>
        <div class="edit">
          <nuxt-link
            :to="`/events/${token}/edit`"
            class="edit-tm-iconLink">E</nuxt-link>
          <!-- FIXME: @hiloki 編集ボタンをアイコンリンクにする -->
        </div>
      </div>
    </header>
    <div class="body">
      <div class="description">
        <p>{{ description }}</p>
      </div>
      <ul class="member">
        <li v-for="(member, i) in members" :key="i">{{ member.name }}</li>
      </ul>
      <div class="action">
        <tm-link
          :to="`/events/${token}/scores`"
          appearance="button"
          kind="primary"
          class="inputScore">Input scores</tm-link>
      </div>
    </div>
  </main>
</template>

<script>
import TolymerClient from '../../../lib/TolymerClient';
import tmLink from '../../../components/tm-link';

export default {
  components: {
    tmLink
  },
  async asyncData({ params }) {
    const token = params.token;
    const [event, members] = await Promise.all([
      TolymerClient.get(`/guest_events/${token}`),
      TolymerClient.get(`/guest_events/${token}/guest_members`)
    ]);
    return {
      token: event.token,
      title: event.title,
      date: event.date,
      description: event.description,
      members: members
    };
  }
};
</script>

<style scoped>
.header {
  background-color: #F9BF3B;
}

.header-inner {
  position: relative;
  margin-left: auto;
  margin-right: auto;
  padding: 16px;
  max-width: 640px;
}

.date {
  margin-bottom: 8px;
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
}

.member {}

.member > * {
  display: inline-block;
  margin-bottom: 8px;
}

.member > * + *::before {
  content: ',';
  margin-right: 0.5em;
  display: inline-block;
}

.action {
  margin-top: 24px;
  text-align: center;
}

.inputScore {
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
