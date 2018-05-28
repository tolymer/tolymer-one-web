<template>
  <main>
    <p><nuxt-link :to="`/events/${token}`">Back</nuxt-link></p>
    <h2>Title</h2>
    <input type="text" v-model="title">

    <h2>Description</h2>
    <input type="text" v-model="description">

    <h3>Date</h3>
    <input type="date" v-model="date">

    <p>
      <button @click="submit()">Edit</button>
    </p>
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
      members: members,
    };
  },
  methods: {
    async submit() {
      await TolymerClient.patch(`/guest_events/${this.token}`, {
        title: this.title,
        date: this.date,
        description: this.description,
      });
      this.$router.push(`/events/${this.token}`);
    },
  },
};
</script>
