<template>
  <main>
    <p><nuxt-link :to="`/events/${token}`">Back</nuxt-link></p>
    <h2>Title</h2>
    <input type="text" v-model="title">

    <h2>Description</h2>
    <input type="text" v-model="description">

    <h3>Date</h3>
    <input type="date" v-model="date">

    <h3>Members</h3>
    <textarea rows="5" cols="40" v-model="members"></textarea>

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
      members: members.map(m => m.name).join('\n'),
    };
  },
  methods: {
    async submit() {
      const p1 = TolymerClient.patch(`/guest_events/${this.token}`, {
        title: this.title,
        date: this.date,
        description: this.description,
      });
      const p2 = TolymerClient.post(`/guest_events/${this.token}/guest_members`, {
        names: this.members.split('\n')
      });
      await Promise.all([p1, p2]);
      this.$router.push(`/events/${this.token}`);
    },
  },
};
</script>
