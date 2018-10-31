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
import tmInput from '../../../components/tm-input';
import tmButton from '../../../components/tm-button';
import { getEvent, updateEvent } from '../../../lib/TolymerGrpcClient';

export default {
  components: {
    tmInput,
    tmButton
  },
  async asyncData({ params }) {
    const token = params.token;
    const event = await getEvent(token);
    const pad = n => (n.toString().length === 1 ? `0${n}` : n);
    return {
      token: event.token,
      title: event.title,
      date: `${event.date.year}-${pad(event.date.month)}-${pad(event.date.day)}`,
      description: event.description
    };
  },
  methods: {
    async submit() {
      await updateEvent({
        token: this.token,
        title: this.title,
        date: this.date,
        description: this.description
      });
      this.$router.push(`/events/${this.token}`);
    }
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
