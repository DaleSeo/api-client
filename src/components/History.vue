<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <h4>History</h4>
    </div>
    <div class="panel-body">
      <ul class="list-group">
        <li class="list-group-item" :title="call.date" v-for="call in rCalls">
          <span class="label" :class="className(call.req.method)">{{call.req.method}}</span>
          <em @click="select(call)">{{call.req.url}}</em>
          <button class="close" @click="remove(call)">&times;</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["calls"],
  computed: {
    rCalls () {
      return [].concat(this.calls).reverse()
    }
  },
  methods: {
    className (method) {
      switch (method) {
        case 'GET': return 'label-success'
        case 'POST': return 'label-info'
        case 'PUT': return 'label-warning'
        case 'DELETE': return 'label-danger'
        default: return 'label-primary'
      }
    },
    select (call) {
      this.$emit('select', call)
    },
    remove (call) {
      this.$emit('remove', call)
    }
  }
}
</script>

<style scoped>
  .label {
    display: inline-block;
    width: 60px;
  }
</style>
