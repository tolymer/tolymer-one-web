<template>
  <main>
    <h1>Create Event</h1>

    <h2>Title</h2>
    <input type="text" v-model="title">

    <h2>Description</h2>
    <input type="text" v-model="description">

    <h3>Date</h3>
    <input type="date" v-model="date">

    <h3>Members</h3>
    <textarea rows="5" cols="40" v-model="members" placeholder="hokaccha
1000ch
hiloki
tan_yuki"></textarea>

    <div>
      <button @click="submit()">Create</button>
    </div>
  </main>
</template>

<script>
import TolymerClient from '../lib/TolymerClient';

export default {
  data() {
    return {
      title: '',
      description: '',
      date: '',
      members: ''
    };
  },
  methods: {
    async submit() {
      const event = await TolymerClient.post('/guest_events', {
        title: this.title,
        description: this.description,
        date: this.date
      });
      await TolymerClient.post(`/guest_events/${event.token}/guest_members`, {
        names: this.members.split('\n')
      });
      this.$router.push(`/events/${event.token}`);
    }
  }
};
</script>

<style>
</style>
