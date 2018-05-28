<template>
  <main>
    <h1>{{ title }}</h1>

    <div v-if="viewMode === 'list'">
      <div class="nav">
        <span class="btn" v-on:click="toNewScore()">
        <span>New</span>
        </span>
      </div>
      <table class="scoreTable">
        <thead>
          <tr>
            <th></th>
            <th v-for="(member, i) in members" :key="i">
              {{member.name}}
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(game, i) in games" :key="i">
            <th>{{i + 1}}</th>
            <td v-for="(member, j) in members" :key="j">
              {{game.scores.find(s => s.member_id === member.id).point}}
            </td>
            <th><span @click="toEditScore(game)">Edit</span></th>
          </tr>
        </tbody>
        <tfoot v-if="games.length > 0">
          <tr class="totalRow">
            <th></th>
            <td v-for="(totalScore, i) in calcTotalScores()" :key="i">
              {{totalScore}}
            </td>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
    <div v-if="viewMode === 'form'">
      <div class="nav">
        <span @click="cancel()">❌</span>
      </div>
      <table class="formTable">
        <thead>
          <th>Name</th>
          <th>Score</th>
        </thead>
        <tbody>
          <tr v-for="(inputScore, i) in inputScores" :key="i">
            <td>{{members[i].name}}</td>
            <td>
              <span v-if="inputScore === 'top'">
              <input type="text" disabled v-bind:value="topScore()">
            </span>
              <span v-if="inputScore !== 'top'">
              <input v-model="inputScores[i]" v-on:input="onInputScore()" type="text">
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
import TolymerClient from '../../../lib/TolymerClient';

export default {
  data() {
    return {
      token: null,
      title: '',
      viewMode: "list",
      members: [],
      games: [],
      inputScores: [],
      updateGame: null
    }
  },
  async asyncData({ params }) {
    const token = params.token;
    const [event, members, games] = await Promise.all([
      TolymerClient.get(`/guest_events/${token}`),
      TolymerClient.get(`/guest_events/${token}/guest_members`),
      TolymerClient.get(`/guest_events/${token}/guest_games`),
    ]);
    return {
      token: event.token,
      title: event.title,
      members,
      games,
      inputScores: members.map(() => null),
    };
  },
  methods: {
    calcTotalScores() {
      return this.games.reduce((acc, game) => {
        this.members.forEach((member, i) => {
          const score = game.scores.find(s => s.member_id === member.id);
          if (acc[i] == null) {
            acc[i] = 0;
          }
          acc[i] += score.point;
        });
        return acc;
      }, []);
    },
    toNewScore() {
      this.switchViewTo("form");
    },
    toEditScore(game) {
      this.switchViewTo("form");
      this.updateGame = game;
      const topScore = Math.max(...(game.scores.map(s => s.point)));
      this.inputScores = this.members.map(member => {
        const score = game.scores.find(s => s.member_id === member.id);
        return score.point === topScore ? "top" : score.point;
      });
    },
    switchViewTo(view) {
      this.inputScores = this.members.map(() => null);
      this.updateGame = null;
      this.viewMode = view;
    },
    async save() {
      if (!this.isValidInput()) return;

      const scores = this.inputScores.map((score, i) => {
        const point = (score === "top" ? this.topScore() : Number(score));
        return { member_id: this.members[i].id, point };
      });

      if (this.updateGame) {
        const game = this.games.find(g => g.id === this.updateGame.id);
        TolymerClient.patch(`/guest_games/${game.id}`, { scores });
        game.scores = scores;
      } else {
        const game = TolymerClient.post(`/guest_events/${this.token}/guest_games`, { scores });
        this.games.push({ id: game.id, scores });
      }

      this.switchViewTo("list");
    },
    cancel() {
      this.switchViewTo("list");
    },
    onInputScore() {
      // 'top'という値は入力されていないとみなす
      // 0 は入力されているとみなす
      const isExistScore = score => score === 0 || (score && score !== "top");

      // 入力されているフィールドの値だけを抽出
      const existingScores = this.inputScores.filter(isExistScore);

      if (existingScores.length < 3) {
        // 入力が3未満の場合はまだ不完全
        // 全部入力済みの状態でどこかが消された場合は'top'がある状態でここにくるので'top'をnullに戻す
        this.inputScores = this.inputScores.map(
          s => (isExistScore(s) ? s : null)
        );
      } else if (existingScores.length === 3) {
        // 入力が3以上の場合はトップ以外入力済み
        this.inputScores = this.inputScores.map(
          s => (s === 0 || s ? s : "top")
        );
      } else {
        throw new Error("Invalid input");
      }
    },
    topScore() {
      const amount = this.inputScores
        .map(s => Number(s) || 0)
        .reduce((acc, v) => acc + v, 0);
      return amount < 0 ? -amount : null;
    },
    isValidInput() {
      const existingScores = this.inputScores.filter(
        s => s === 0 || (s && s !== "top")
      );
      if (existingScores.length !== 3) return false;

      const topScore = this.topScore();
      const secondScore = Math.max(...existingScores.map(Number));

      // 1位より2位のほうが点数が大きい場合はinvalid
      return topScore && secondScore && topScore > secondScore;
    }
  },
};
</script>

<style>
.btn {
  border-radius: 6px;
  padding: 8px 15px;
  font-size: 14px;
  background-color: #337ab7;
  color: #fff;
}

.btn > * {
  vertical-align: middle;
}

.btn.inActive {
  background-color: #ccc;
}

.nav {
  padding: 10px 10px 20px 10px;
}

.nav .fa-times-circle {
  font-size: 28px;
  color: #666;
}

.scoreTable {
  border-collapse: collapse;
  width: 100%;
}

.scoreTable td,
.scoreTable th {
  border: 1px solid #333;
  padding: 5px;
}

.scoreTable td {
  text-align: right;
  width: 60px;
}

.totalRow td,
.totalRow th {
  background-color: #ffc490;
}

.scoreTable .fa-edit {
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

.formTable input[type="text"] {
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

.formTable input[type="text"][disabled] {
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
