<template>
  <b-card no-block showHeader>
    <strong slot="header">
      <i class="fa fa-arrow-circle-left"/> Response
    </strong>

    <b-tabs small card ref="tabs" v-model="tabIndex">
      <b-tab title="Status">
        {{response.statusCode}} {{response.statusMessage}}
      </b-tab>
      <b-tab title="Headers">
        <pre>{{response.headers}}</pre>
      </b-tab>
      <b-tab title="Body">
        <pre>{{response.body}}</pre>
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
export default {
  props: ['response'],
  computed: {
    className () {
      switch (this.response.statusCode / 100) {
        case 2: return 'alert-success'
        case 4: return 'alert-warning'
        case 5: return 'alert-danger'
        default: return 'alert-info'
      }
    }
  },
  data () {
    return {
      tabIndex: null,
      tab: 'body'
    }
  }
}
</script>
