<template>
  <main>
    <header class="header">
      <div class="header-inner">
        <h1>{{ isTipInput ? 'チップ' : 'スコア' }}入力</h1>
        <nuxt-link :to="`/events/${token}/table`" class="tm-iconLink back">
          <i class="fas fa-angle-left"></i>
        </nuxt-link>
        <nuxt-link v-if="!isTipInput && !isUpdate" class="tm-iconLink tip" :to="`/events/${token}/input?type=tip`"
          >Tip</nuxt-link
        >
        <span v-if="isUpdate" class="tm-iconLink remove" @click="remove()"> <i class="far fa-trash-alt"></i> </span>
      </div>
    </header>
    <div class="body">
      <table class="FormTable">
        <tbody>
          <tr v-for="(inputResult, i) in inputResults" :key="i">
            <td>{{ participants[i].name }}</td>
            <td>
              <span v-if="inputResult === 'top'"> <input type="number" disabled :value="topResult()" /> </span>
              <span v-if="inputResult !== 'top'">
                <input type="number" v-model="inputResults[i]" @input="onInputResult()" />
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="btns">
        <tm-button @click="save()" class="Form-button" :kind="isValidInput() ? 'primary' : 'disabled'">決定</tm-button>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue';
import Big from 'big.js';
import tmButton from '~/components/tm-button.vue';
import * as client from '~/lib/TolymerGrpcClient';
import { alertError } from '~/lib/errorHandler';

export default Vue.extend({
  components: {
    tmButton
  },
  watchQuery: ['type'],
  data() {
    return {
      token: null,
      participants: [],
      inputResults: [],
      isTipInput: false,
      gameId: null,
      isUpdate: false
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
      gameId,
      isUpdate: false
    };

    const calcInputResult = ({ participants, resultsList }) => {
      const topResult = Math.max(...resultsList.map(s => s.score));
      return participants.map(participant => {
        const result = resultsList.find(s => s.participantId === participant.id);
        return result.score === topResult ? 'top' : result.score;
      });
    };

    if (isTipInput && event.tip) {
      data.inputResults = calcInputResult({ participants: data.participants, resultsList: event.tip.resultsList });
      data.isUpdate = true;
    } else if (gameId) {
      const game = event.gamesList.find(g => g.id === Number(gameId));
      if (game) {
        data.inputResults = calcInputResult({ participants: data.participants, resultsList: game.resultsList });
        data.isUpdate = true;
      }
    }

    return data;
  },
  methods: {
    async save(): Promise<void> {
      if (!this.isValidInput()) return console.error('Invalid input');

      const results = this.inputResults.map((result, i) => {
        const score = result === 'top' ? this.topResult() : Number(result);
        const participant: any = this.participants[i];
        return { participantId: participant.id, score };
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

      this.$router.push(`/events/${this.token}/table`);
    },
    isValidInput(): boolean {
      const existingResults = this.inputResults.filter(s => s === 0 || (s && s !== 'top'));
      if (existingResults.length !== 3) return false;

      const topResult = this.topResult();
      const secondResult = Math.max(...existingResults.map(Number));

      // 1位より2位のほうが点数が大きい場合はinvalid
      return topResult !== null && topResult >= secondResult;
    },
    onInputResult(): void {
      // 'top'という値は入力されていないとみなす
      // 0 は入力されているとみなす
      const isExistResult = result => result === 0 || (result && result !== 'top');

      // 入力されているフィールドの値だけを抽出
      const existingResults = this.inputResults.filter(isExistResult);

      if (existingResults.length < 3) {
        // 入力が3未満の場合はまだ不完全
        // 全部入力済みの状態でどこかが消された場合は'top'がある状態でここにくるので'top'をnullに戻す
        this.inputResults = this.inputResults.map(s => (s === 'top' ? null : s)) as any;
      } else if (existingResults.length === 3) {
        // 入力が3以上の場合はトップ以外入力済み
        this.inputResults = this.inputResults.map(s => (s === 0 || s ? s : 'top')) as any;
      } else {
        throw new Error('Invalid input');
      }
    },
    topResult(): number | null {
      const amount = this.inputResults.map(s => Number(s) || 0).reduce((acc, v) => acc.plus(v), new Big(0));
      return amount < 0 ? -amount : null;
    },
    async remove(): Promise<void> {
      if (!window.confirm('削除します。よろしいですか？')) return;
      if (this.gameId) {
        const [err] = await client.deleteGame({ token: this.token, gameId: this.gameId });
        if (err) return alertError(err);
      } else if (this.isTipInput) {
        const [err] = await client.deleteTip({ token: this.token });
        if (err) return alertError(err);
      } else {
        throw new Error('Invalid input');
      }
      this.$router.push(`/events/${this.token}/table`);
    }
  }
});
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

.tm-iconLink {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  border: 2px solid transparent;
  border-radius: 100em;
  background-color: transparent;
  color: inherit;
  text-decoration: none;
  transition: border-color 300ms ease-in-out, box-shadow 300ms ease-in-out;
  will-change: border-color, box-shadow;
}

.back {
  position: absolute;
  font-size: 24px;
  left: 0px;
  top: 0px;
}

.remove {
  position: absolute;
  right: 0;
  top: 0;
  font-size: 16px;
  color: #d21b1b;
}

.tip {
  position: absolute;
  right: 0;
  top: 0;
  font-size: 18px;
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

.FormTable input[type='number'] {
  border: none;
  border-bottom: 1px solid #999;
  width: 80px;
  font-size: 24px;
  outline: none;
  text-align: right;
  padding: 3px 10px;
  border-radius: 0;
  -webkit-appearance: none;
  color: #333;
  background-color: transparent;
}

.FormTable input[type='number'][disabled] {
  color: #2b9018;
  -webkit-text-fill-color: #2b9018;
  font-weight: bold;
  opacity: 1;
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
