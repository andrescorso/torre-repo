<template>
  <v-card v-if="showInfo" dark>
    <v-card-title :class="cardClass">
      Opportunity Skills
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-tooltip top v-for="item in experience" :key="item.name">
        <template v-slot:activator="{ on, attrs }">
          <v-alert
            :color="color"
            dense
            icon="mdi-briefcase-outline"
            v-bind="attrs"
            v-on="on"
          >
            {{ item.name }}
          </v-alert>
        </template>
        <span>{{ item.experience }}</span>
      </v-tooltip>
      <v-alert
        :color="color"
        dense
        icon="mdi-school-outline"
        v-for="item in develop"
        :key="item.name"
      >
        {{ item.name }}
      </v-alert>
    </v-card-text>
  </v-card>
</template>

<script>
import { Global } from "../Config";
export default {
  name: "SkillsOpportunity",
  props: {
    showInfo: {
      type: Boolean,
      default: false,
    },
    skills: {
      type: Array,
    },
  },
  data: () => ({
    experience: null,
    develop: null,
    lastSkills: [],
    infoUser: null,
  }),
  created() {
    this.cardClass = "headline " + Global.Colors.OpportunityCard;
    this.color = Global.Colors.SkillsAlert;
  },
  watch: {
    skills: function() {
      if (this.skills != null) {
        this.experience = this.skills.filter(function(e) {
          return e.experience != "potential-to-develop";
        });
        this.develop = this.skills.filter(function(e) {
          return e.experience == "potential-to-develop";
        });
      }
    },
    showInfo: function() {},
  },
};
</script>
