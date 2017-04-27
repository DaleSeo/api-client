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
    <div class="row">
      <div class="col-md-8">
        <b-progress value="100" animated v-show="showProgress"/>
      </div>
      <div class="col-md-4">
        <b-button type="submit" variant="primary" :disabled="disabled">
          <i class="fa fa-paper-plane-o"/> Call
        </b-button>
        <b-button type="reset" variant="secondary" :disabled="disabled">
          <i class="fa fa-undo"/> Reset
        </b-button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  props: ['request', 'inProgress'],
  computed: {
    showProgress () {
      return this.inProgress
    },
    disabled () {
      return this.inProgress
    }
  },
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

<style scoped>
.vcenter {
  display: inline-block;
  vertical-align: middle;
  float: none;
}
</style>
