<template>
  <main>
    <header class="header">
      <div class="header-inner">
        <h1 class="title">
          <nuxt-link :to="`/events/${token}`">{{ title }}</nuxt-link>
        </h1>
      </div>
    </header>

    <div class="body">
      <div class="Form">
        <div class="Form-item">
          <tm-input
            v-model="title"
            label="Title"
            placeholder="例）渋谷ZOO バスケ通り店"/>
        </div>
        <div class="Form-item">
          <tm-input
            v-model="description"
            label="Description"
            placeholder="例）ワンツー、アリアリ"/>
        </div>
        <div class="Form-item">
          <tm-input
            v-model="date"
            type="date"
            label="Date"/>
        </div>
        <div class="Form-item">
          <tm-input
            v-model="members"
            type="textarea"
            :rows=5
            :cols=40
            label="Member"
            placeholder="hokaccha
    1000ch
    hiloki
    tan_yuki"/>
        </div>
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
import TolymerClient from '../../../lib/TolymerClient';
import tmInput from '../../../components/tm-input';
import tmButton from '../../../components/tm-button';

export default {
  components: {
    tmInput,
    tmButton
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
      members: members.map(m => m.name).join('\n')
    };
  },
  methods: {
    async submit() {
      const p1 = TolymerClient.patch(`/guest_events/${this.token}`, {
        title: this.title,
        date: this.date,
        description: this.description
      });
      const p2 = TolymerClient.post(`/guest_events/${this.token}/guest_members`, {
        names: this.members.split('\n')
      });
      await Promise.all([p1, p2]);
      this.$router.push(`/events/${this.token}`);
    }
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
