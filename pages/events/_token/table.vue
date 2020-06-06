<template>
  <main>
    <header class="header">
      <div class="header-inner">
        <h1>{{ eventDate.format('YYYY/M/D') || 'スコア表' }}</h1>
        <div class="dropdown">
          <span class="menuBtn" @click.stop="showMenu = !showMenu">
            <i class="fas fa-bars"></i>
          </span>
          <ul v-if="showMenu">
            <li>
              <nuxt-link :to="`/events/${token}/info`"> <i class="fas fa-info-circle"></i> イベント情報 </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/"> <i class="fas fa-plus-circle"></i> イベント作成 </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </header>

    <div class="body">
      <table class="resultTable">
        <thead>
          <tr>
            <th class="gameNumberCol"></th>
            <th v-for="(participant, i) in participants" :key="i">{{ participant.name }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!games.length && !tip" aria-hidden="true">
            <td class="gameNumberCol"></td>
            <td v-for="(p, i) in participants" :key="i">-</td>
          </tr>
          <tr v-for="(game, i) in games" :key="i">
            <th class="gameNumberCol">
              <nuxt-link :to="`/events/${token}/input?game_id=${game.id}`">{{ i + 1 }}</nuxt-link>
            </th>
            <td v-for="(score, j) in calcScores(game.resultsList)" :key="j" :class="getScoreColClass(score)">
              {{ score }}
            </td>
          </tr>
          <tr v-if="tip" class="tipRow">
            <th class="gameNumberCol">
              <nuxt-link :to="`/events/${token}/input?type=tip`">T</nuxt-link>
            </th>
            <td v-for="(score, j) in calcScores(tip.resultsList)" :key="j" :class="getScoreColClass(score)">
              {{ score }}
            </td>
          </tr>
        </tbody>
        <tfoot v-if="games.length > 0 || tip">
          <tr class="totalRow">
            <th class="gameNumberCol"></th>
            <td v-for="(totalResult, i) in calcTotalResults()" :key="i" :class="getScoreColClass(totalResult)">
              {{ totalResult }}
            </td>
          </tr>
        </tfoot>
      </table>
      <div class="inputBtn">
        <tm-link appearance="button" kind="primary" :to="`/events/${token}/input`">スコア入力</tm-link>
      </div>
    </div>
  </main>
</template>

<script>
import Vue from 'vue';
import Big from 'big.js';
import tmLink from '~/components/tm-link.vue';
import * as client from '~/lib/TolymerGrpcClient';
import { alertError } from '~/lib/errorHandler';
import { protoToDate } from '../../../lib/ProtobufType';

export default Vue.extend({
  components: {
    tmLink
  },
  mounted: function() {
    document.addEventListener('click', this.hideMenu);
  },
  destroyed: function() {
    document.removeEventListener('click', this.hideMenu);
  },
  data() {
    return {
      token: null,
      eventDate: '',
      participants: [],
      games: [],
      tip: null,
      showMenu: false
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
      eventDate: protoToDate(event.eventDate),
      participants: event.participantsList,
      games: event.gamesList,
      tip: event.tip
    };
  },
  methods: {
    hideMenu(event) {
      if (!event.target.closest('.dropdown ul')) {
        this.showMenu = false;
      }
    },
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
      return total.map(s => s.valueOf());
    },
    calcScores(resultsList) {
      return this.participants.map(participant => {
        return resultsList.find(s => s.participantId === participant.id).score;
      });
    },
    getScoreColClass(score) {
      if (score > 0) {
        return 'plus';
      } else if (score < 0) {
        return 'minus';
      } else {
        return 'zero';
      }
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
  padding: 12px;
  max-width: 640px;
}

.header-inner h1 {
  text-align: center;
  padding: 5px 0;
}

.header-inner .dropdown {
  position: absolute;
  left: 0;
  top: 0;
}

.header-inner .dropdown .menuBtn {
  font-size: 20px;
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

.header-inner .dropdown ul {
  background-color: #fff;
  border-radius: 3px;
  padding: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.12), 0 2px 4px 0 rgba(0, 0, 0, 0.08);
}

.header-inner .dropdown li {
  margin-bottom: 10px 0;
}

.header-inner .dropdown a {
  display: block;
  color: #333;
  padding: 8px;
  text-decoration: none;
}

.inputBtn {
  padding-top: 25px;
  text-align: center;
}

.resultTable {
  border-collapse: collapse;
  width: 100%;
}

.body {
  margin-left: auto;
  margin-right: auto;
  max-width: 640px;
}

.resultTable thead {
  border-bottom: 1px solid #999;
}

.resultTable td,
.resultTable th {
  padding: 15px 0;
}

.resultTable .plus {
  color: #006700;
}

.resultTable .minus {
  color: #c72222;
}

.resultTable tbody td,
.resultTable tbody th {
  border-top: 1px solid #999;
  font-size: 18px;
}

.resultTable td {
  text-align: center;
  width: 60px;
}

.resultTable .totalRow td,
.resultTable .totalRow th {
  border-top: 1px solid #999;
  font-size: 18px;
  font-weight: bold;
  background-color: #efefef;
}

.resultTable .gameNumberCol {
  width: 20px;
  padding-left: 5px;
  padding-right: 0;
}

.resultTable .gameNumberCol a {
  display: inline-block;
  background-color: #4e7ba2;
  color: #fff;
  border-radius: 50%;
  width: 26px;
  height: 26px;
  line-height: 26px;
  font-size: 12px;
  text-align: center;
  text-decoration: none;
}

.resultTable .tipRow .gameNumberCol a {
  background-color: #e67b3a;
}
</style>
