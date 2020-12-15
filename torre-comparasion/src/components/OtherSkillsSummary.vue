<template>
  <div>
    <v-card v-if="showInfo" dark>
      <v-card-title :class="cardClass1">
        Summary Candidate 1
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-alert dense icon="mdi-briefcase-outline" type="success">
          # Strengths: {{ strenghts1 }}
        </v-alert>
        <v-alert dense type="info" icon="mdi-school-outline">
          # Interests: {{ interests1 }}
        </v-alert>
      </v-card-text>
    </v-card>
    <v-card v-if="showInfo" dark>
      <v-card-title :class="cardClass2">
        Summary Candidate 2
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-alert dense icon="mdi-briefcase-outline" type="success">
          # Strengths: {{ strenghts2 }}
        </v-alert>
        <v-alert dense type="info" icon="mdi-school-outline">
          # Interests: {{ interests2 }}
        </v-alert>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { Global } from "../Config";
export default {
  name: "OtherSkillsSummary",
  props: {
    showInfo: {
      type: Boolean,
      default: false,
    },
    candidateColor1: {
      type: String,
    },
    candidateColor2: {
      type: String,
    },
  },
  data: () => ({
    strenghts1: 0,
    strenghts2: 0,
    interests1: 0,
    interests2: 0,
    infoUser1: null,
    infoUser2: null,
  }),
  created() {
    this.cardClass1 = "headline " + this.candidateColor1;
    this.cardClass2 = "headline " + this.candidateColor2;
    this.$root.$on(Global.Events.candidateInfo + "1", (result) => {
      this.infoUser1 = result;
      this.checkSkills();
    });
    this.$root.$on(Global.Events.candidateInfo + "2", (result) => {
      this.infoUser2 = result;
      this.checkSkills();
    });
  },
  watch: {
    showInfo: function() {},
  },
  methods: {
    checkSkills: function() {
      if (this.infoUser1 != null && this.infoUser2 != null) {
        this.strenghts1 = this.infoUser1.strengths.length;
        this.strenghts2 = this.infoUser2.strengths.length;
        this.interests1 = this.infoUser1.interests.length;
        this.interests2 = this.infoUser2.interests.length;
      }
    },
  },
};
</script>
