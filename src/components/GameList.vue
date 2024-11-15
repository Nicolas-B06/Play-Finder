<template>
  <div class="w-full max-w-md mx-auto">
    <h2 class="text-2xl font-bold text-center text-secondary mb-4">
      Liste des jeux
    </h2>

    <div class="overflow-y-auto " style="max-height: calc(2.5rem * 15)">
      <table class="w-full border-collapse border border-secondary rounded-lg shadow-md">
        <thead>
          <tr class="sticky top-0 bg-highlight text-secondary">
            <th class=" px-4 py-2 text-center">Jeux</th>
            <th class=" px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(game, index) in games" :key="index" class="bg-white">
            <td class="border border-secondary px-4 py-2 text-primary">{{ game }}</td>
            <td class="border border-secondary px-4 py-2 text-center">
              <button
                @click="removeGame(index)"
                class="px-2 py-1 bg-accent text-secondary font-semibold rounded-lg hover:bg-orange-400 transition duration-200 shadow"
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
        class="flex-grow px-4 py-2 border border-secondary rounded-l-lg shadow-sm"
      />
      <button
        @click="addGame"
        class="px-4 py-2 bg-accent text-secondary font-semibold rounded-r-lg hover:bg-green-400 transition duration-200 shadow"
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
  background-color: #e0f7fa; 
  z-index: 10;
}

</style>
