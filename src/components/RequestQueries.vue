<template>
  <div class="form-group">
    <label>
      Queries
      <button type="button" class="ml-2 close" @click="add">&plus;</button>
    </label>
    <div class="row mb-1" href="#" v-for="(query, index) in queries">
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
