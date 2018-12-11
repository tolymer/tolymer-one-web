<template>
  <main>
    <header class="header">
      <div class="header-inner">
        <h1 class="title">
          <nuxt-link :to="`/events/${token}`">{{ title }}</nuxt-link>
        </h1>
      </div>
    </header>

    <div
      v-if="viewMode === 'list'"
      class="body">
      <div class="nav">
        <tm-button
          appearance="text"
          class="new"
          @click="toNewResult()">New</tm-button>
        <tm-button
          appearance="text"
          class="tip"
          @click="toTip()">Tip</tm-button>
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
              <span @click="toEditResult(game)">✏️</span>
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
            <th></th>
            <td v-for="(totalResult, i) in calcTotalResults()" :key="i">{{totalResult.valueOf()}}</td>
            <th></th>
          </tr>
        </tfoot>
      </table>
      <div v-if="!games.length > 0">
        <tm-button
          @click="toNewResult()">New</tm-button>
      </div>
    </div>

    <div v-if="viewMode === 'form'">
      <div class="nav">
        <span @click="cancel()">❌</span>
        <span v-if="isInputTip">Input Tip</span>
      </div>
      <table class="formTable">
        <thead>
          <th>Name</th>
          <th>Result</th>
        </thead>
        <tbody>
          <tr v-for="(inputResult, i) in inputResults" :key="i">
            <td>{{participants[i].name}}</td>
            <td>
              <span v-if="inputResult === 'top'">
                <input type="text" disabled v-bind:value="topResult()">
              </span>
              <span v-if="inputResult !== 'top'">
                <input v-model="inputResults[i]" v-on:input="onInputResult()" type="text">
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="btns">
        <span v-on:click="save()" :class="{ btn: true, inActive: !isValidInput() }">Save</span>
      </div>
    </div>
  </main>
</template>

<script>
import tmButton from '../../../components/tm-button';
import * as client from '../../../lib/TolymerGrpcClient';
import Big from 'big.js';

export default {
  components: {
    tmButton
  },
  data() {
    return {
      token: null,
      title: '',
      viewMode: 'list',
      participants: [],
      games: [],
      tip: null,
      inputResults: [],
      updateGame: null,
      isInputTip: false
    };
  },
  async asyncData({ params }) {
    const token = params.token;
    const event = await client.getEvent(token);
    return {
      token: event.token,
      title: event.title,
      participants: event.participantsList,
      games: event.gamesList,
      tip: event.tip,
      inputResults: event.participantsList.map(() => null)
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
    toNewResult() {
      this.switchViewTo('form');
    },
    toTip() {
      this.switchViewTo('form');
      this.isInputTip = true;
    },
    toEditResult(game) {
      this.switchViewTo('form');
      this.updateGame = game;
      const topResult = Math.max(...game.resultsList.map(s => s.score));
      this.inputResults = this.participants.map(participant => {
        const result = game.resultsList.find(s => s.participantId === participant.id);
        return result.score === topResult ? 'top' : result.score;
      });
    },
    toEditTip() {
      this.switchViewTo('form');
      this.isInputTip = true;
      const topResult = Math.max(...this.tip.resultsList.map(s => s.score));
      this.inputResults = this.participants.map(participant => {
        const result = this.tip.resultsList.find(s => s.participantId === participant.id);
        return result.score === topResult ? 'top' : result.score;
      });
    },
    switchViewTo(view) {
      this.inputResults = this.participants.map(() => null);
      this.updateGame = null;
      this.isInputTip = false;
      this.viewMode = view;
    },
    async save() {
      if (!this.isValidInput()) return;

      const results = this.inputResults.map((result, i) => {
        const score = result === 'top' ? this.topResult() : Number(result);
        return { participantId: this.participants[i].id, score };
      });

      if (this.isInputTip) {
        await client.postTip({ token: this.token, results });
        this.tip = { resultsList: results };
      } else if (this.updateGame) {
        const game = this.games.find(g => g.id === this.updateGame.id);
        await client.updateGame({ token: this.token, gameId: game.id, results });
        game.resultsList = results;
      } else {
        const game = await client.createGame({ token: this.token, results });
        this.games.push({ id: game.id, resultsList: results });
      }

      this.switchViewTo('list');
    },
    cancel() {
      this.switchViewTo('list');
    },
    onInputResult() {
      // 'top'という値は入力されていないとみなす
      // 0 は入力されているとみなす
      const isExistResult = result => result === 0 || (result && result !== 'top');

      // 入力されているフィールドの値だけを抽出
      const existingResults = this.inputResults.filter(isExistResult);

      if (existingResults.length < 3) {
        // 入力が3未満の場合はまだ不完全
        // 全部入力済みの状態でどこかが消された場合は'top'がある状態でここにくるので'top'をnullに戻す
        this.inputResults = this.inputResults.map(s => (isExistResult(s) ? s : null));
      } else if (existingResults.length === 3) {
        // 入力が3以上の場合はトップ以外入力済み
        this.inputResults = this.inputResults.map(s => (s === 0 || s ? s : 'top'));
      } else {
        throw new Error('Invalid input');
      }
    },
    async reload() {
      const event = await client.getEvent(this.token);
      this.title = event.title;
      this.participants = event.participantsList;
      this.games = event.gamesList;
      this.tip = event.tip;
      this.inputResults = event.participantsList.map(() => null);
    },
    async deleteGame(game) {
      if (!window.confirm('削除します。よろしいですか？')) return;
      await client.deleteGame({ token: this.token, gameId: game.id });
      await this.reload();
    },
    async deleteTip() {
      if (!window.confirm('削除します。よろしいですか？')) return;
      await client.deleteTip({ token: this.token });
      await this.reload();
    },
    topResult() {
      const amount = this.inputResults.map(s => Number(s) || 0).reduce((acc, v) => acc.plus(v), new Big(0));
      return amount < 0 ? -amount : null;
    },
    isValidInput() {
      const existingResults = this.inputResults.filter(s => s === 0 || (s && s !== 'top'));
      if (existingResults.length !== 3) return false;

      const topResult = this.topResult();
      const secondResult = Math.max(...existingResults.map(Number));

      // 1位より2位のほうが点数が大きい場合はinvalid
      return topResult && secondResult && topResult > secondResult;
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
