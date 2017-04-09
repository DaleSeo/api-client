<template>
  <div>
    <h4>REQUEST</h4>
    <hr/>

    <form @submit.prevent="send" @reset="reset">
      <div class="form-group">
        <label for="method">Method</label>
        <select id="method" class="form-control" v-model="request.method">
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
        </select>
      </div>
      <div class="form-group">
        <label for="url">URL</label>
        <input id="url" type="text" class="form-control" v-model="request.url"/>
      </div>
      <div class="form-group">
        <label for="text">Body</label>
        <textarea id="text" class="form-control" rows="3" v-model="request.text"/>
      </div>
      <div class="text-right">
        <div class="btn-group">
          <button type="submit" class="btn btn-primary"><i class="fa fa-paper-plane"></i> Send</button>
          <button type="reset" class="btn btn-default"><i class="fa fa-undo"></i> Reset</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: ['request'],
  methods: {
    send () {
      this.$emit('send')
    },
    reset () {
      this.$emit('reset')
    }
  }
}
</script>
