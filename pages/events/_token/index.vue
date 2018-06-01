<template>
  <main>
    <h1><nuxt-link :to="`/events/${token}`">{{ title }}</nuxt-link></h1>
    <h2>{{ date }}</h2>
    <div>{{ description }}</div>

    <ul>
      <li v-for="(member, i) in members" :key="i">{{ member.name }}</li>
    </ul>

    <hr>

    <nuxt-link :to="`/events/${token}/scores`">Input Scores</nuxt-link>
    |
    <nuxt-link :to="`/events/${token}/edit`">Edit</nuxt-link>
  </main>
</template>

<script>
import TolymerClient from '../../../lib/TolymerClient';

export default {
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
