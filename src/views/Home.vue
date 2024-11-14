<template>
  <div class="mx-auto h-screen bg-gray-100 p-6 flex flex-col items-center">
    <h1 class="text-4xl font-bold text-blue-600 mb-6 text-center">
      PlayFinder
    </h1>
    <div class="flex flex-row items-start space-x-8">
      <div class="w-1/2">
        <GameList :initialGames="games" @update-games="updateGames" />
      </div>

      <!-- Rouleau -->
      <div class="flex flex-col items-center w-1/2">
        <div
          ref="roller"
          class="relative w-64 h-16 overflow-hidden border-4 border-blue-500 rounded-lg"
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
              class="text-lg font-semibold text-gray-700 h-16 flex items-center justify-center"
            >
              {{ game }}
            </div>
          </div>
        </div>
        <button
          @click="startRoll"
          class="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-700 transition duration-300"
        >
          Lancer
        </button>
        <p v-if="selectedGame" class="mt-4 text-lg text-gray-700">
          🎲 Jeu sélectionné : <span class="font-bold">{{ selectedGame }}</span>
        </p>
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
      games: [
        'The Witcher 3',
        'Cyberpunk 2077',
        'Minecraft',
        'Among Us',
        'Rocket League',
        'Valorant',
        'League of Legends',
        'Fortnite',
        'Apex Legends',
        'Call of Duty',
        'FIFA 21',
        'GTA V',
        'Red Dead Redemption 2',
        "Assassin's Creed Valhalla",
        'Overwatch',
        'Rainbow Six Siege',
        'World of Warcraft',
        'Dota 2',
        'Counter-Strike: Global Offensive',
        'PUBG',
        'Hearthstone',
        'Minecraft Dungeons',
        'Diablo III',
        'Starcraft II',
        'Heroes of the Storm',
        'World of Tanks',
        'Warframe',
        'Destiny 2',
        'The Elder Scrolls Online',
        'Final Fantasy XIV',
        'Guild Wars 2',
        'Black Desert Online',
        'Path of Exile',
        'Runescape',
        'Eve Online',
        'Tera',
        'Neverwinter',
        'Star Wars: The Old Republic',
        'Aion',
        'Blade & Soul',
        'ArcheAge',
        'Rift',
        'Wildstar',
        'Lineage II',
        'MapleStory',
        'Albion Online',
        'The Lord of the Rings Online',
        'DC Universe Online',
        'Star Trek Online',
        'Elder Scrolls: Legends',
        'Gwent',
        'Magic: The Gathering Arena',
        'Legends of Runeterra',
        'Hearthstone Battlegrounds',
        'Auto Chess',
        'Teamfight Tactics',
        'Dota Underlords',
        'Legends of Runeterra',
        'Artifact',
        'Gwent',
        'Magic: The Gathering Arena',
        'Hearthstone Battlegrounds',
        'Auto Chess',
        'Teamfight Tactics',
        'Dota Underlords',
        'Legends of Runeterra',
        'Artifact',
      ],
      selectedGame: null,
      position: 0,
      isRolling: false,
      rollInterval: null,
    };
  },
  computed: {
    repeatedGames() {
      return [...this.games, ...this.games, ...this.games];
    },
  },
  methods: {
    startRoll() {
      if (this.isRolling) return;

      this.isRolling = true;
      this.position = 0;
      this.selectedGame = null;

      this.rollInterval = setInterval(() => {
        this.position += 64;
        if (this.position >= this.repeatedGames.length * 64) {
          this.position = 0;
        }
      }, 50);

      setTimeout(() => {
        clearInterval(this.rollInterval);
        this.isRolling = false;

        const extraRotations = Math.floor(Math.random() * 5 + 5);
        const randomIndex = Math.floor(Math.random() * this.games.length);
        const randomOffset = randomIndex * 64;

        this.position = extraRotations * this.games.length * 64 + randomOffset;
        this.selectedGame = this.games[randomIndex];

        this.position = randomOffset;
      }, 4000);
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

<style scoped></style>
