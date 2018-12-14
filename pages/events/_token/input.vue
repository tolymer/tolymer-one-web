<template>
  <main>
    <header class="header">
      <div class="header-inner">
        <nuxt-link class="back" :to="`/events/${token}/results`">＜</nuxt-link>
        <h1>{{ isTipInput ? 'チップ' : 'スコア'}}入力</h1>
      </div>
    </header>
    <div class="body">
      <table class="FormTable">
        <thead>
          <th>名前</th>
          <th>スコア</th>
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
        <tm-button
          @click="save()"
          class="Form-button"
          :kind="isValidInput() ? 'primary' : 'disabled'">決定</tm-button>
      </div>
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
      inputResults: [],
      isTipInput: false,
      gameId: null
    };
  },
  async asyncData({ params, query, error }) {
    const token = params.token;
    const [err, event] = await client.getEvent(token);
    const isTipInput = query.type === 'tip';
    const gameId = query.game_id;

    if (err) {
      error({ statusCode: err.isNotFound() ? 404 : 500, message: err.message });
      return;
    }

    const data = {
      token: event.token,
      participants: event.participantsList,
      inputResults: event.participantsList.map(() => null),
      isTipInput,
      gameId
    };

    const calcInputResult = ({ participants, resultsList }) => {
      const topResult = Math.max(...resultsList.map(s => s.score));
      return participants.map(participant => {
        const result = resultsList.find(s => s.participantId === participant.id);
        return result.score === topResult ? 'top' : result.score;
      });
    };

    if (isTipInput && event.tip) {
      data.inputResult = calcInputResult({ participants: data.participants, resultsList: event.tip.resultsList });
    } else if (gameId) {
      const game = event.gamesList.find(g => g.id === Number(gameId));
      if (game) {
        data.inputResult = calcInputResult({ participants: data.participants, resultsList: game.resultsList });
      }
    }

    return data;
  },
  methods: {
    async save() {
      if (!this.isValidInput()) return console.error('Invalid input');

      const results = this.inputResults.map((result, i) => {
        const score = result === 'top' ? this.topResult() : Number(result);
        return { participantId: this.participants[i].id, score };
      });

      if (this.isTipInput) {
        const [err] = await client.postTip({ token: this.token, results });
        if (err) return alertError(err);
      } else if (this.gameId) {
        const [err] = await client.updateGame({ token: this.token, gameId: this.gameId, results });
        if (err) return alertError(err);
      } else {
        const [err] = await client.createGame({ token: this.token, results });
        if (err) return alertError(err);
      }

      this.$router.push(`/events/${this.token}/results`);
    },
    isValidInput() {
      const existingResults = this.inputResults.filter(s => s === 0 || (s && s !== 'top'));
      if (existingResults.length !== 3) return false;

      const topResult = this.topResult();
      const secondResult = Math.max(...existingResults.map(Number));

      // 1位より2位のほうが点数が大きい場合はinvalid
      return topResult && topResult > secondResult;
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
    topResult() {
      const amount = this.inputResults.map(s => Number(s) || 0).reduce((acc, v) => acc.plus(v), new Big(0));
      return amount < 0 ? -amount : null;
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

.FormTable {
  margin: 0 auto;
  font-size: 20px;
  border-collapse: collapse;
}

.FormTable th {
  border-bottom: 2px solid #333;
  padding: 10px;
}

.FormTable td {
  padding: 30px 10px 0 10px;
}

.FormTable input[type='text'] {
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

.FormTable input[type='text'][disabled] {
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
