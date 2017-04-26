<template>
  <form @submit.prevent="send" @reset="reset">
    <b-card showHeader class="mb-3">
      <strong slot="header">
        <i class="fa fa-arrow-circle-right"/> Request
      </strong>

      <div class="form-group row">
        <div class="col-md-2">
          <b-form-select v-model="request.method" :options="options"/>
        </div>
        <div class="col-md-10">
          <input id="url" type="text" class="form-control" v-model="request.url"/>
        </div>
      </div>
      <div class="form-group">
        <label for="text">Body</label>
        <b-form-input id="text" textarea :rows="3" v-model="request.text"/>
      </div>
    </b-card>
    <div class="text-right">
      <b-button type="submit" variant="primary">
        <i class="fa fa-paper-plane-o"/> Send
      </b-button>
      <b-button type="reset" variant="secondary">
        <i class="fa fa-undo"/> Reset
      </b-button>
    </div>
  </form>
</template>

<script>
export default {
  props: ['request'],
  data() {
    return {
      options: ['GET', 'POST', 'PUT', 'DELETE']
    }
  },
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
