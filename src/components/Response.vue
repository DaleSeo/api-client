<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <h4>Response</h4>
    </div>
    <div class="panel-body">
      <div class="alert" :class="className" v-if="response.statusCode">
        {{response.statusCode}} {{response.statusText}}
      </div>
      <pre v-if="response.body" v-text="response.body"/>
    </div>
  </div>
</template>

<script>
export default {
  props: ["response"],
  computed: {
    className () {
      switch (this.response.statusCode / 100) {
        case 2: return 'alert-success'
        case 4: return 'alert-warning'
        case 5: return 'alert-danger'
        default: return 'alert-info'
      }
    }
  }
}
</script>
