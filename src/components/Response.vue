<template>
  <b-card no-block showHeader>
    <strong slot="header">
      <i class="fa fa-arrow-circle-left"/> Response
    </strong>

    <b-tabs small card ref="tabs" v-model="tabIndex" v-if="response.statusCode || response.error">
      <b-tab :title="response.error ? 'Error' : 'Status'">
        <span class="text-white bg-danger" v-if="response.error">{{errorMessage}}</span>
        <span :class="statusClass" v-else>{{response.statusCode}} {{response.statusMessage}}</span>
      </b-tab>
      <b-tab title="Headers" v-if="response.headers">
        <dl>
          <div v-for="(val, key) in response.headers">
            <dt>{{key}}</dt>
            <dd>{{val}}</dd>
          </div>
        </dl>
      </b-tab>
      <b-tab title="Body" v-if="response.body">
        <pre>{{response.body}}</pre>
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
import resolveErrorMessage from '../services/resolveErrorMessage'

export default {
  props: ['response'],
  computed: {
    errorMessage () {
      return resolveErrorMessage(this.response.error)
    },
    statusClass () {
      switch (Math.trunc(this.response.statusCode / 100)) {
        case 2: return 'text-success'
        case 4: return 'text-warning'
        case 5: return 'text-danger'
        default: return 'text-info'
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
