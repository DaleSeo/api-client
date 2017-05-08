<template>
  <div>
    <div class="row mb-1" href="#" v-if="queries" v-for="(query, index) in queries">
      <div class="col-sm-3 pr-1">
        <b-form-input size="sm" v-model="query.key"/>
      </div>
      <div class="col-sm-8 pl-1 pr-0">
        <b-form-input size="sm" v-model="query.value"/>
      </div>
      <div class="col-sm-1 pl-0">
        <button type="button" class="close" @click="del(index)">&times;</button>
      </div>
    </div>
    <b-button type="button" size="sm" variant="secondary" @click="add"><i class="fa fa-plus"/></b-button>
  </div>
</template>

<script>
export default {
  props: ['queries'],
  methods: {
    add () {
      console.log('RequestQueries.vue#add()')
      this.queries.push({key: '', value: ''})
    },
    del (index) {
      console.log('RequestQueries.vue#del()', index)
      this.queries.splice(index, 1)
    }
  }
}
</script>
