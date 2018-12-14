<template>
  <main>
    <header class="header">
      <div class="header-inner">
        <nuxt-link class="back" :to="`/events/${token}`">＜</nuxt-link>
        <h1>スコア一覧</h1>
      </div>
    </header>

    <div class="body">
      <div class="nav">
        <tm-button
          class="new"
          kind="primary"
          @click="toInputGame()">スコア入力</tm-button>
        <tm-button
          class="tip"
          @click="toInputTip()">チップ入力</tm-button>
      </div>
      <table class="resultTable">
        <thead>
          <tr>
            <th></th>
            <th v-for="(participant, i) in participants" :key="i">{{participant.name}}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(game, i) in games" :key="i">
            <th>{{i + 1}}</th>
            <td
              v-for="(participant, j) in participants"
              :key="j"
            >{{game.resultsList.find(s => s.participantId === participant.id).score}}</td>
            <th>
              <span @click="toInputGame(game)">✏️</span>
              /
              <span @click="deleteGame(game)">🗑</span>
            </th>
          </tr>
          <tr v-if="tip" class="tipRow">
            <th>Tip</th>
            <td
              v-for="(participant, j) in participants"
              :key="j"
            >{{tip.resultsList.find(s => s.participantId === participant.id).score}}</td>
            <th>
              <span @click="toEditTip()">✏️</span>
              /
              <span @click="deleteTip()">🗑</span>
            </th>
          </tr>
        </tbody>
        <tfoot v-if="games.length > 0 || tip">
          <tr class="totalRow">
            <th>合計</th>
            <td v-for="(totalResult, i) in calcTotalResults()" :key="i">{{totalResult.valueOf()}}</td>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  </main>
</template>

<script>
import Big from 'big.js';
import tmButton from '../../../components/tm-button';
import * as client from '../../../lib/TolymerGrpcClient';
import { alertError } from '../../../lib/errorHandler';

export default {
  components: {
    tmButton
  },
  data() {
    return {
      token: null,
      participants: [],
      games: [],
      tip: null
    };
  },
  async asyncData({ params, error }) {
    const token = params.token;
    const [err, event] = await client.getEvent(token);

    if (err) {
      error({ statusCode: err.isNotFound() ? 404 : 500, message: err.message });
      return;
    }

    return {
      token: event.token,
      participants: event.participantsList,
      games: event.gamesList,
      tip: event.tip
    };
  },
  methods: {
    calcTotalResults() {
      const total = this.games.reduce((acc, game) => {
        this.participants.forEach((participant, i) => {
          const result = game.resultsList.find(s => s.participantId === participant.id);
          if (acc[i] == null) {
            acc[i] = new Big(0);
          }
          acc[i] = acc[i].plus(result.score);
        });
        return acc;
      }, []);
      if (this.tip) {
        this.participants.forEach((participant, i) => {
          const result = this.tip.resultsList.find(s => s.participantId === participant.id);
          if (total[i] == null) {
            total[i] = new Big(0);
          }
          total[i] = total[i].plus(result.score);
        });
      }
      return total;
    },
    toInputGame(game) {
      const query = game ? `?game_id=${game.id}` : '';
      this.$router.push(`/events/${this.token}/input${query}`);
    },
    toInputTip() {
      this.$router.push(`/events/${this.token}/input?type=tip`);
    },
    async deleteGame(game) {
      if (!window.confirm('削除します。よろしいですか？')) return;
      const [err] = await client.deleteGame({ token: this.token, gameId: game.id });
      if (err) return alertError(err);
      this.games = this.games.filter(g => g.id !== game.id);
    },
    async deleteTip() {
      if (!window.confirm('削除します。よろしいですか？')) return;
      const [err] = await client.deleteTip({ token: this.token });
      if (err) return alertError(err);
      this.tip = null;
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

.header-inner h1 {
  text-align: center;
}

.back {
  font-size: 16px;
  font-weight: bold;
  color: inherit;
  text-decoration: none;
  position: absolute;
  left: 10px;
  top: 16px;
}

.body {
  margin-left: auto;
  margin-right: auto;
  padding: 16px 0;
  max-width: 640px;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 0 16px;
}

.nav .fa-times-circle {
  font-size: 28px;
  color: #666;
}

.resultTable {
  border-collapse: collapse;
  width: 100%;
}

.resultTable td,
.resultTable th {
  border: 1px solid #333;
  padding: 5px;
}

.resultTable td {
  text-align: right;
  width: 60px;
}

.totalRow td,
.totalRow th {
  background-color: #ffc490;
}

.tipRow td,
.tipRow th {
  background-color: #90dfff;
}

.resultTable .fa-edit {
  color: #398439;
}

.formTable {
  margin: 0 auto;
  font-size: 20px;
  border-collapse: collapse;
}

.formTable th {
  border-bottom: 2px solid #333;
  padding: 10px;
}

.formTable td {
  padding: 30px 10px 0 10px;
}

.formTable input[type='text'] {
  border: none;
  border-bottom: 1px solid #999;
  width: 80px;
  font-size: 20px;
  outline: none;
  text-align: right;
  padding: 3px 10px;
  border-radius: 0;
  -webkit-appearance: none;
  color: #333;
}

.formTable input[type='text'][disabled] {
  background-color: #fff566;
  color: #333;
  -webkit-text-fill-color: #333;
  opacity: 1;
  border-bottom: none;
}

.btns {
  margin-top: 60px;
  text-align: center;
}

.btns .btn {
  font-size: 22px;
  margin: 10px;
}
</style>
