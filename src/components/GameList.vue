<template>
  <div class="w-full mx-auto">
    <h2 class="text-2xl font-bold text-center text-secondary mb-4">
      Liste des jeux
    </h2>

    <div class="overflow-y-auto" style="max-height: calc(2.5rem * 15)">
      <table
        class="w-full border-secondary rounded-lg shadow-md"
      >
        <thead>
          <tr class="sticky top-0 bg-highlight text-secondary ">
            <th class="px-4 py-2 text-center">Logo</th>
            <th class="px-4 py-2 text-center">Jeu</th>
            <th class="px-4 py-2 text-center">Activer</th>
            <th class="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(game, index) in games" :key="index" class="bg-white">
            
            <td class="border border-secondary px-4 py-2 text-center">
              <img
                v-if="game.iconUrl"
                :src="game.iconUrl"
                alt="Logo du jeu"
                class="w-12 h-12 object-cover rounded-md"
              />
            </td>

          
            <td class="border border-secondary px-4 py-2 text-primary">
              {{ game.name }}
            </td>

            <td class="border border-secondary px-4 py-2 text-center">
              <button
                @click="toggleGameActivation(index)"
                :class="game.active ? 'bg-green-500' : 'bg-red-500'"
                class="px-2 py-1 text-white font-semibold rounded-lg shadow"
              >
                {{ game.active ? 'Activé' : 'Désactivé' }}
              </button>
            </td>

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
    <button
      @click="openSteamModal"
      class="mb-4 mt-4 m-auto px-4 py-2 bg-accent text-secondary font-semibold rounded-lg hover:bg-green-400 transition duration-300 shadow"
    >
      Importer mes jeux Steam
    </button>
  </div>
  <SteamModal
    v-if="showSteamModal"
    @close="closeSteamModal"
    @import="importSteamGames"
  />
</template>

<script>
import SteamModal from './SteamModal.vue';

export default {
  name: 'GameList',
  emits: ['update-games'],
  components: {
    SteamModal,
  },
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
      showSteamModal: false,
    };
  },
  methods: {
    addGame() {
      if (this.newGame.trim() !== '') {
        this.games.push({
          name: this.newGame.trim(),
          iconUrl: null,
          active: true,
        });
        this.newGame = '';
        this.$emit('update-games', this.games); 
      }
    },
    toggleGameActivation(index) {
      this.games[index].active = !this.games[index].active;
      this.$emit('update-games', this.games); 
    },
    removeGame(index) {
      this.games.splice(index, 1);
      this.$emit('update-games', this.games); 
    },
    openSteamModal() {
      console.log('Méthode openSteamModal appelée');
      this.showSteamModal = true;
    },
    closeSteamModal() {
      this.showSteamModal = false;
    },
    async importSteamGames(steamId) {
      try {
        const response = await fetch(
          `/api/IPlayerService/GetOwnedGames/v1/?key=${process.env.VUE_APP_STEAM_API_KEY}&steamid=${steamId}&include_appinfo=true`
        );
        const data = await response.json();

        if (data.response && data.response.games) {
          const importedGames = data.response.games.map((game) => ({
            name: game.name,
            iconUrl: game.img_icon_url
              ? `http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`
              : null,
            active: true, 
          }));
          this.games = [...this.games, ...importedGames];
          this.$emit('update-games', this.games);
        } else {
          alert('Aucun jeu trouvé ou Steam ID incorrect.');
        }
      } catch (error) {
        console.error('Erreur lors de l’importation des jeux Steam:', error);
        alert(
          'Erreur lors de l’importation des jeux Steam. Veuillez réessayer.'
        );
      } finally {
        this.closeSteamModal();
      }
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
