<template>
  <div class="w-full max-w-md mx-auto">
    <h2 class="text-2xl font-bold text-center text-blue-600 mb-4">
      Liste des jeux
    </h2>

    <div class="overflow-y-auto" style="max-height: calc(2.5rem * 15)">
      <table class="w-full border-collapse border border-gray-300">
        <thead>
          <tr class="sticky-header">
            <th class="border border-gray-300 px-4 py-2 text-center">Jeu</th>
            <th class="border border-gray-300 px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(game, index) in games" :key="index">
            <td class="border border-gray-300 px-4 py-2">{{ game }}</td>
            <td class="border border-gray-300 px-4 py-2">
              <button
                @click="removeGame(index)"
                class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
              >
                Supprimer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mt-4 flex items-center">
      <input
        v-model="newGame"
        type="text"
        placeholder="Nom du jeu"
        class="flex-grow px-4 py-2 border border-gray-300 rounded-l"
      />
      <button
        @click="addGame"
        class="px-4 py-2 bg-blue-500 text-white font-semibold rounded-r hover:bg-blue-600 transition duration-200"
      >
        Ajouter
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'GameList',
  props: {
    initialGames: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      games: [...this.initialGames],
      newGame: '',
    };
  },
  methods: {
    addGame() {
      if (this.newGame.trim() !== '') {
        this.games.push(this.newGame.trim());
        this.newGame = '';
        this.$emit('update-games', this.games);
      }
    },
    removeGame(index) {
      this.games.splice(index, 1);
      this.$emit('update-games', this.games);
    },
  },
};
</script>

<style scoped>
.overflow-y-auto {
  max-height: calc(2.5rem * 15);
  overflow-y: auto;
}
.sticky-header {
  position: sticky;
  top: 0;
  background-color: #f1f5f9;
  z-index: 10;
}
</style>
