<template>
  <b-card showHeader no-block>
    <strong slot="header">
      History <small v-if="calls">({{calls.length}})</small>
    </strong>
    <b-list-group flush>
      <b-list-group-item href="#" :title="call.date" :key="call['.key']" v-for="call in rCalls">
        <b-badge pill :variant="variant(call.req.method)">{{call.req.method}}</b-badge>
        <span>&nbsp;<em @click="select(call)">{{call.req.url}}</em></span>
        <button type="button" class="close float-right" @click="remove(call)">&times;</button>
      </b-list-group-item>
    </b-list-group>
  </b-card>
</template>

<script>
export default {
  props: ["calls"],
  computed: {
    rCalls () {
      return [].concat(this.calls).reverse().splice(0, 20)
    }
  },
  methods: {
    variant (method) {
      switch (method) {
        case 'GET': return 'success'
        case 'POST': return 'info'
        case 'PUT': return 'warning'
        case 'DELETE': return 'danger'
        default: return 'primary'
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
.list-group-item {
  display: block;
}
</style>
