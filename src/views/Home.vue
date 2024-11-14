<template>
  <div class="mx-auto h-screen bg-gray-100">
    <h1 class="text-4xl font-bold text-blue-600 mb-6">PlayFinder</h1>
    <div>
      <button
        @click="selectRandomGame"
        class="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-700 transition duration-300"
      >
        Lancer la recherche
      </button>
      <p v-if="selectedGame" class="mt-4 text-lg text-gray-700">
        🎲 Jeu suggéré : <span class="font-bold">{{ selectedGame }}</span>
      </p>
    </div>

    <div>
      <h2 class="text-2xl font-bold text-blue-600 mb-6">Liste des jeux</h2>
      <ul>
        <li v-for="game in games" :key="game" class="text-lg text-gray-700">
          {{ game }}
        </li>
      </ul>
    </div>
    <div>
      <h3 class="text-2xl font-bold text-blue-600 mb-6">Ajouter un jeu</h3>
      <input
        v-model="newGame"
        type="text"
        placeholder="Nom du jeu"
        class="px-4 py-2 border border-gray-300 rounded"
      />
      <button
        @click="addGames(newGame)"
        class="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-700 transition duration-300"
      >
        Ajouter
      </button>
    </div>
  </div>
</template>

<script>
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
      ],
      selectedGame: null,
    };
  },
  methods: {
    selectRandomGame() {
      const randomIndex = Math.floor(Math.random() * this.games.length);
      this.selectedGame = this.games[randomIndex];
    },
    addGames(gameTitle) {
      this.games.push(gameTitle);
    },
  },
};
</script>
