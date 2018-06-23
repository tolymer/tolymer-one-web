<template>
  <main>
    <div class="sticks"/>
    <h1 class="appname">tolymer</h1>
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
          kind="primary">Create event</tm-button>
      </div>
    </div>
  </main>
</template>

<script>
import TolymerClient from '../lib/TolymerClient';
import tmInput from '../components/tm-input';
import tmButton from '../components/tm-button';

export default {
  components: {
    tmInput,
    tmButton
  },
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

<style scoped>
.sticks {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 24px;
  width: 313px;
  height: 120px;
  background-image: url('/static/sticks.svg');
  background-size: 313px 214px;
  background-position: center bottom;
}

.appname {
  margin-bottom: 32px;
  text-align: center;
  font-size: 32px;
}

.Form {
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
