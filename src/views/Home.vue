<template>
  <div class="mx-auto h-screen bg-primary p-8 flex flex-col items-center">
    <h1 class="text-4xl font-bold text-secondary mb-24 text-center">
      Play<span class="text-accent">Finder</span>
    </h1>

    <div class="flex flex-row items-start space-x-8 w-full max-w-4xl justify-center">
      <div class="w-1/2 max-w-md border border-secondary rounded-lg shadow-md p-4 bg-highlight">
        <GameList :initialGames="games" @update-games="updateGames" />
      </div>

      <div class="flex flex-col items-center w-1/2 max-w-md">
        <div
          ref="roller"
          class="relative w-64 h-16 overflow-hidden border-4 border-secondary rounded-lg shadow-md bg-highlight"
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
              class="text-lg font-semibold text-secondary h-16 flex items-center justify-center"
            >
              {{ game }}
            </div>
          </div>
        </div>
        <button
          @click="startRoll"
          class="mt-4 px-6 py-2 bg-accent text-secondary font-semibold rounded-lg shadow hover:bg-green-400 transition duration-300"
        >
          Lancer
        </button>
        <p v-if="selectedGame" class="mt-4 text-lg text-secondary">
          🎲 Jeu sélectionné : <span class="font-bold text-accent">{{ selectedGame }}</span>
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
</style>
