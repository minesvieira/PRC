  
<template>
  <ConsultaPersonagens :id="$route.params.id"/>
</template>

<script>
// @ is an alias to /src
import ConsultaPersonagens from '@/components/ConsultaPersonagens.vue'
export default {
  name: 'Consulta',
  components: {
    ConsultaPersonagens
  }
}
</script>