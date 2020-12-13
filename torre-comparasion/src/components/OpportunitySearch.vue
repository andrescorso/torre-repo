<template>
  <v-card dark cols="12" sm="8" md="2">
    <v-card-title class="headline lime darken-2">
      Search for Job offers
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-text-field
        v-model="organization"
        :loading="isLoading"
        label="Organization"
        placeholder="Search the job you offer"
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
      ></v-autocomplete>
    </v-card-text>
  </v-card>
</template>

<script>
import { Global } from "../Config";
import _ from "lodash";
export default {
  name: "OportunitySearch",
  created() {
    this.debouncedGetOpportunity = _.debounce(this.getOpportunities, 800);
  },
  mounted() {},
  data: () => ({
    descriptionLimit: 60,
    entries: [],
    isLoading: false,
    company: null,
    opportunity: null,
    organization: null,
    searchFinish: false,
  }),
  computed: {
    items() {
      return this.entries.map((entry) => {
        const Description =
          entry.objective.length > this.descriptionLimit
            ? entry.objective.slice(0, this.descriptionLimit) + "..."
            : entry.objective;

        const id = entry.id

        return Object.assign({}, entry, { Description, id });
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
    opportunity: function(val){
      console.log(val)
    },
  },
  methods: {
    getOpportunities: function() {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ organization: { term: this.company } }),
      };

      if (this.company != null) {
        // Lazily load input items
        fetch(Global.searchAPI, requestOptions)
          .then((res) => res.json())
          .then((res) => {
            this.results = JSON.parse(JSON.stringify(res));
            this.entries = res.results;
            this.count = res.size;
            this.isLoading = false;
            this.searchFinish = true;
            console.log(this.results)
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>
