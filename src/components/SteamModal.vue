<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
  >
    <div class="bg-white w-96 p-6 rounded-lg shadow-lg relative">
      <h2 class="text-2xl font-bold text-secondary mb-4">
        Importer mes jeux Steam
      </h2>
      <p class="text-gray-700  text-center">
        Avant de continuer, assurez-vous que votre compte Steam est
        <b>public</b>. Vous pouvez modifier ce paramètre dans les options de
        confidentialité de votre profil Steam.
      </p>

      <label for="steamId" class="block text-secondary mb-2"
        >Entrez votre Steam ID :</label
      >
      <input
        id="steamId"
        v-model="steamId"
        type="text"
        placeholder="Exemple : 76561198000000000"
        class="w-full px-4 py-2 border border-primary rounded-lg mb-4"
      />

      <div class="flex justify-center space-x-4">
        <button
          @click="$emit('close')"
          class="px-4 py-2 bg-gray-300 text-secondary font-semibold rounded-lg hover:bg-gray-400 transition duration-300"
        >
          Annuler
        </button>
        <button
          @click="handleImport"
          class="px-4 py-2 bg-accent text-secondary font-semibold rounded-lg hover:bg-green-400 transition duration-300"
        >
          Importer
        </button>
      </div>
      <div class="flex justify-center items-center mt-4" v-if="isLoading">
        <p class="text-secondary">Chargement...</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SteamModal',
  data() {
    return {
      steamId: '',
      isLoading: false,
    };
  },
  methods: {
    handleImport() {
      if (!this.steamId.trim()) {
        alert('Veuillez entrer un Steam ID valide.');
        return;
      }
      const isNumeric = /^\d+$/.test(this.steamId);
      if (!isNumeric || this.steamId.length < 17) {
        alert('Le Steam ID doit être un nombre d’au moins 17 chiffres.');
        return;
      }

      this.isLoading = true;
      this.$emit('import', this.steamId);
    },
  },
};
</script>
