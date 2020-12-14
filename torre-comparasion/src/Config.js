export const Global = {
  API: {
    user: 'http://localhost:8090/https://torre.bio/api/bios/',
    userCORS: 'https://torre.bio/api/bios/',
    searchOppAPI: 'https://search.torre.co/opportunities/_search/?currency=USD$&page=0&periodicity=hourly&lang=es&size=50&aggregate=false&offset=0',
    searchUsersAPI: 'https://search.torre.co/people/_search/?currency=USD$&page=0&periodicity=hourly&lang=es&size=20&aggregate=false&offset=0'
  },
  Events: {
    opportunityChange: 'opportunity updated',
    candidateChange: 'candidate updated',
    candidateInfo: 'info for candidate '
  },
  Colors: {
    OpportunityCard: 'lime darken-2',
    Candidate1Card: 'deep-orange lighten-1',
    Candidate2Card: 'blue lighten-2',
    SkillsCard: 'blue-grey darken-1'
  }
}
