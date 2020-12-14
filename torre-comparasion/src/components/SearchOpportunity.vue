<template>
  <v-card dark>
    <v-card-title :class="opportunityClass">
      Search for Job offers
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-text-field
        v-model="organization"
        :loading="isLoading"
        label="Organization"
        placeholder="Search the company which is offering the job"
        clearable
        outlined
      ></v-text-field>
      <v-autocomplete
        v-if="searchFinish"
        v-model="opportunity"
        label="Opportunity"
        placeholder="Search the opportunity inside the organization"
        :items="items"
        item-value="id"
        item-text="Description"
        outlined
      >
        <template v-slot:item="data">
          <v-list-item-avatar>
            <v-img :src="data.item.orgImage"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-html="data.item.Description">
            </v-list-item-title>
          </v-list-item-content>
        </template>
      </v-autocomplete>
    </v-card-text>
  </v-card>
</template>

<script>
import { Global } from "../Config";
import _ from "lodash";
export default {
  name: "SearchOportunity",
  created() {
    this.debouncedGetOpportunity = _.debounce(this.getOpportunities, 800);
    this.opportunityClass = "headline " + Global.Colors.OpportunityCard;
  },
  mounted() {},
  data: () => ({
    descriptionLimit: 60,
    entries: [],
    isLoading: false,
    company: "",
    opportunity: null,
    organization: null,
    searchFinish: false,
    skills: [],
  }),
  computed: {
    items() {
      return this.entries.map((entry) => {
        const Description =
          entry.objective.length > this.descriptionLimit
            ? entry.objective.slice(0, this.descriptionLimit) + "..."
            : entry.objective;

        const id = entry.id;

        const orgImage = entry.organizations[0].picture;

        return Object.assign({}, entry, { Description, id, orgImage });
      });
    },
  },
  watch: {
    organization: function(val) {
      this.company = val;
      if (this.company != null) {
        this.isLoading = true;
      } else {
        this.searchFinish = false;
      }
      this.debouncedGetOpportunity();
    },
    opportunity: function(val) {
      if (val != null) {
        this.skills = this.results.results.filter(function(e) {
          return e.id == val;
        })[0].skills;
        this.$root.$emit(Global.Events.opportunityChange, val, this.skills);
      } else {
        this.$root.$emit(Global.Events.opportunityChange, "", null);
      }
    },
  },
  methods: {
    getOpportunities: function() {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ organization: { term: this.company } }),
      };

      this.opportunity = null;
      if (this.company != "" && this.company != null) {
        // Lazily load input items
        fetch(Global.API.searchOppAPI, requestOptions)
          .then((res) => res.json())
          .then((res) => {
            this.results = JSON.parse(JSON.stringify(res));
            this.entries = res.results;
            this.count = res.size;
            this.isLoading = false;
            this.searchFinish = true;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>
