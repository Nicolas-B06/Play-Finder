<template>
  <div class="mx-auto h-screen bg-primary p-8 flex flex-col items-center">
    <h1 class="text-4xl font-bold text-secondary mb-24 text-center">
      Play<span class="text-accent">Finder</span>
    </h1>
    <div
      class="flex flex-row items-start space-x-8 w-full max-w-4xl justify-center"
    >
      <div
        class="w-1/2 max-w-md border border-secondary rounded-lg shadow-md p-4 bg-highlight"
      >
        <GameList :initialGames="games" @update-games="updateGames" />
      </div>
      <div class="flex flex-col items-center w-1/2 max-w-md">
        <div class="relative w-64">
          <div
            class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full"
          >
            <div class="w-4 h-4 bg-accent transform rotate-45"></div>
          </div>
          <div
            ref="roller"
            class="relative w-64 h-16 overflow-hidden border-highlight rounded-lg shadow-md bg-white"
          >
            <div
              class="flex flex-col items-center transition-transform duration-100 ease-linear"
              :style="{
                transform: `translateY(-${position}px)`,
                transition: isRolling
                  ? 'transform 0.1s linear'
                  : 'transform 1s ease-out',
              }"
            >
              <div
                v-for="(game, index) in repeatedGames"
                :key="index"
                class="h-16 flex items-center justify-center"
              >
                <img
                  v-if="game.iconUrl"
                  :src="game.iconUrl"
                  alt="Logo du jeu"
                  class="w-12 h-12 object-cover"
                />

                <span v-else class="text-secondary font-bold text-lg">{{
                  game.name
                }}</span>
              </div>
            </div>
          </div>
        </div>
        <button
          @click="startRoll"
          :disabled="isButtonDisabled"
          class="mt-4 px-6 py-2 bg-accent text-secondary font-semibold rounded-lg shadow hover:bg-green-400 transition duration-300"
        >
          Lancer
        </button>
        <div class="mt-4 flex flex-col items-center">
          <img
            v-if="selectedGame && selectedGame.iconUrl"
            :src="selectedGame.iconUrl"
            alt="Image du jeu"
            class="mt-2 mb-2 w-32 h-32 object-cover rounded-lg shadow-md"
          />
          <p v-if="selectedGame" class="text-lg text-secondary">
            🎲 Jeu sélectionné :
            <span class="font-bold text-accent">{{ selectedGame.name }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GameList from '../components/GameList.vue';

export default {
  name: 'HomePage',
  data() {
    return {
      games: [],
      selectedGame: null,
      position: 0,
      isRolling: false,
      rollInterval: null,
      isButtonDisabled: false,
    };
  },
  computed: {
    repeatedGames() {
      return this.games.filter((game) => game.active).flatMap((game) => [game]);
    },
  },
  methods: {
    startRoll() {
      if (this.isRolling) return;

      const activeGames = this.games.filter((game) => game.active);

      if (activeGames.length === 0) {
        alert('Aucun jeu activé pour la roulette.');
        return;
      }

      this.isButtonDisabled = true;
      this.isRolling = true;
      this.position = 0;
      this.selectedGame = null;

      const rowHeight = 64;
      this.rollInterval = setInterval(() => {
        this.position += rowHeight;
        if (this.position >= this.repeatedGames.length * rowHeight) {
          this.position = 0;
        }
      }, 50);

      setTimeout(() => {
        clearInterval(this.rollInterval);
        this.isRolling = false;

        const randomIndex = Math.floor(Math.random() * activeGames.length);
        const randomOffset = randomIndex * rowHeight;

        this.position = randomOffset;
        this.selectedGame = activeGames[randomIndex];

        this.isButtonDisabled = false;
      }, 6000);
    },

    updateGames(updatedGames) {
      this.games = updatedGames;
    },
  },
  components: {
    GameList,
  },
};
</script>

<style scoped>
.bg-lightSkyBlue {
  background-color: #e0f7fa;
}
.text-darkBlue {
  color: #00796b;
}
.border-darkBlue {
  border-color: #00796b;
}
.bg-brightYellow {
  background-color: #ffeb3b;
}
.bg-accent {
  background-color: #7cfb47;
}

.border-highlight {
  border: 4px solid #f5f5f5;
  box-shadow:
    0 0 15px #7cfb47,
    0 0 30px #7cfb47;
  border-radius: 8px;
}
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@keyframes pulse {
  from {
    transform: scale(1);
    opacity: 0.8;
  }
  to {
    transform: scale(1.1);
    opacity: 1;
  }
}

@keyframes bg-move {
  from {
    background-position: 0% 50%;
  }
  to {
    background-position: 100% 50%;
  }
}
* {
  box-sizing: content-box !important;
}
</style>
