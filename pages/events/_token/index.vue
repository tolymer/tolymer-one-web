<template>
  <main>
    <header class="header">
      <div class="header-inner">
        <h1 class="title"><nuxt-link :to="`/events/${token}`">{{ title }}</nuxt-link></h1>
        <p class="date">{{ date }}</p>
      </div>
    </header>
    <div class="body">
      <div>{{ description }}</div>
      <ul>
        <li v-for="(member, i) in members" :key="i">{{ member.name }}</li>
      </ul>
    </div>
    <div class="action">
      <tm-link :to="`/events/${token}/scores`" appearance="button">Input Scores</tm-link>
      <tm-link :to="`/events/${token}/edit`">Edit</tm-link>
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
.body {
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
