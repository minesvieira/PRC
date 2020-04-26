<template>
    <div v-if="!this.loaded">
        Loading...
    </div>
    <v-card class="ma-4" v-else>
        <v-card-title class="indigo darken-4 white--text" dark>
            <span class="headline">Ator: "{{ ator.info.nome }}" ({{id}})</span>
        </v-card-title>

        <v-card-text>
            <v-container>
            <v-row>
                <v-col cols="2">
                <div class="info-label">Nome</div>
                </v-col>
                <v-col>
                <div class="info-content">{{ ator.info.nome }}</div>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="2">
                <div class="info-label">Sexo</div>
                </v-col>
                <v-col>
                <div class="info-content">{{ ator.info.sexo }}</div>
                </v-col>
            </v-row>

            <v-row v-if="ator.filmes && ator.filmes.length > 0">
                <v-col cols="2">
                <div class="info-label">Filmes</div>
                </v-col>
                <v-col>
                    <div class="info-content">
                        <ul>
                            <li 
                                v-for="filme in ator.filmes"
                                :key="filme.id"
                            >
                                <a href="#">{{ filme.nomeFilme }}</a>
                            </li>
                        </ul>
                    </div>
                </v-col>
            </v-row>
            </v-container>
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="$router.go(-1)">voltar</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>

import axios from 'axios'
const lhost = require("@/config/global").host;

export default {
  name: 'Consulta',
  props: ['id'], 
  data: () => ({
    footer_props: {
      "items-per-page-text": "Mostrar",
      "items-per-page-options": [10, 20, 50, 100, -1],
      "items-per-page-all-text": "Todos"
    }, 
  ator: {},
  loaded: false
  }),

  created: async function(){
    try {
      let response = await axios.get(lhost + "/atores/" + this.id);
      this.ator = response.data
      this.loaded = true;
    } 
    catch (e) {
      return e;
    }
  },

  methods: {
    
  }
}

</script>

<style>
.info-label {
  color: indigo;
  padding: 5px;
  font-weight: 400;
  width: 100%;
  background-color: #e0f2f1;
  font-weight: bold;
}

.info-content {
  padding: 5px;
  width: 100%;
  border: 1px solid #1a237e;
}
</style>