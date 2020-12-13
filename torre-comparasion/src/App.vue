<template>
  <v-app>
    <v-app-bar app dark>
      <div class="d-flex align-center">
        <v-img
          alt="Logo"
          class="shrink mr-2"
          contain
          src="./assets/logo.png"
          transition="scale-transition"
          width="40"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/andrescorso/torre-repo"
        target="_blank"
        text
      >
        <span class="mr-2">Code</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <SearchAll/>
      <v-divider/>
      <CompareAll/>

    </v-main>
  </v-app>
</template>

<script>
import SearchAll from './components/SearchAll'
import CompareAll from './components/CompareAll'

export default {
  name: 'App',

  components: {
    SearchAll,
    CompareAll,
  },

  data: () => ({
    //
  }),
};
</script>
