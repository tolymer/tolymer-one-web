<template>
  <main>
    <div class="sticks" />
    <h1 class="appname">tolymer</h1>
    <section class="Form participants">
      <header class="participants__header">
        <h3>参加者（必須）</h3>
        <tm-button
          v-if="this.previousParticipants.length"
          @click="setPreviousParticipants()"
          class="participants__headerButton"
          kind="modest"
          >前回の参加者を設定</tm-button
        >
      </header>
      <ul>
        <li>
          <tm-input type="text" v-model="participants[0]" placeholder="例: ほかむら" />
        </li>
        <li>
          <tm-input type="text" v-model="participants[1]" placeholder="例: たに" />
        </li>
        <li>
          <tm-input type="text" v-model="participants[2]" placeholder="例: せんすい" />
        </li>
        <li>
          <tm-input type="text" v-model="participants[3]" placeholder="例: たなか" />
        </li>
      </ul>
      <div class="Form-item" style="margin-top: 30px">
        <tm-input v-model="eventDate" type="date" label="開催日" />
      </div>
      <div class="Form-action">
        <tm-button @click="submit()" class="Form-button" kind="primary">イベント作成</tm-button>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import Vue from 'vue';
import tmInput from '~/components/tm-input.vue';
import tmButton from '~/components/tm-button.vue';
import { createEvent } from '~/lib/TolymerGrpcClient';
import { alertError } from '~/lib/errorHandler';

export default Vue.extend({
  components: {
    tmInput,
    tmButton
  },
  data() {
    return {
      eventDate: new Date().toISOString().slice(0, 10),
      participants: [] as string[],
      previousParticipants: [] as string[]
    };
  },
  mounted: function() {
    this.previousParticipants = (() => {
      if (this.canUseStorage() === false) return [];
      const val = localStorage.getItem('participants') || '[]';
      try {
        return JSON.parse(val) as string[];
      } catch (err) {
        console.warn(`JSON parse Error: ${val}`);
        return [];
      }
    })();
  },
  methods: {
    canUseStorage() {
      try {
        const key = '__test__';
        localStorage.setItem(key, key);
        localStorage.removeItem(key);

        return true;
      } catch (e) {
        return false;
      }
    },
    setPreviousParticipants() {
      if (this.previousParticipants) {
        try {
          this.participants = this.previousParticipants;
        } catch (e) {
          return false;
        }
      }
    },
    async submit() {
      const [err, event] = await createEvent({
        eventDate: this.eventDate,
        participants: this.participants
      });

      if (this.canUseStorage()) {
        localStorage.setItem('participants', JSON.stringify(this.participants));
      }

      if (err) {
        alertError(err);
      } else {
        this.$router.push(`/events/${event.token}/table`);
      }
    }
  }
});
</script>

<style scoped>
.sticks {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 24px;
  width: 313px;
  height: 120px;
  background-image: url('/sticks.svg');
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

.participants__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.participants__headerButton {
  margin-bottom: -0.5em;
}
</style>
