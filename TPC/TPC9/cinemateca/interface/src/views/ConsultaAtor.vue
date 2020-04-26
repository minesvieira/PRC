  
<template>
  <ConsultaAtores :id="$route.params.id"/>
</template>

<script>
// @ is an alias to /src
import ConsultaAtores from '@/components/ConsultaAtores.vue'
export default {
  name: 'Consulta',
  components: {
    ConsultaAtores
  }
}
</script>