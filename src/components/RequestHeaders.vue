<template>
  <div>
    <div class="row mb-1" href="#" v-if="headers" v-for="(header, index) in headers">
      <div class="col-sm-3 pr-1">
        <b-form-input size="sm" v-model="header.key"/>
      </div>
      <div class="col-sm-8 pl-1 pr-0">
        <b-form-input size="sm" v-model="header.value"/>
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
  props: ['headers'],
  methods: {
    add () {
      console.log('RequestHeaders.vue#add()')
      this.headers.push({key: '', value: ''})
    },
    del (index) {
      console.log('RequestHeaders.vue#del()', index)
      this.headers.splice(index, 1)
    }
  }
}
</script>
