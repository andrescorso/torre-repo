<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <SearchOpportunity />
      </v-col>
      <v-col cols="12" md="4">
        <SearchCandidate
          candidateNumber="1"
          :candidateColor="candidateColor1"
        />
      </v-col>
      <v-col cols="12" md="4">
        <SearchCandidate
          candidateNumber="2"
          :candidateColor="candidateColor2"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SearchOpportunity from "./SearchOpportunity";
import SearchCandidate from "./SearchCandidate";
import { Global } from "../Config";
export default {
  name: "SearchAll",
  components: {
    SearchOpportunity,
    SearchCandidate,
  },
  data: () => ({
    candidateColor1: Global.Colors.Candidate1Card,
    candidateColor2: Global.Colors.Candidate2Card,
  }),
};
</script>
