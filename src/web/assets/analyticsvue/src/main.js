/* eslint-disable vue/one-component-per-file */

import Vue from 'vue'
import './css/main.pcss'
import TestReportWidget from './js/tests/ReportWidget.vue'
import TestReportWidgetSettings from './js/tests/ReportWidgetSettings.vue'
import ReportWidget from './js/ReportWidget.vue'
import ReportWidgetSettings from './js/ReportWidgetSettings.vue'
import RealtimeWidget from './js/RealtimeWidget.vue'
import ReportField from './js/ReportField.vue'
import Settings from './js/Settings.vue'
import Tests from './js/tests/Tests.vue'
import TestReports from './js/tests/TestReports.vue'

// Report Widget
window.AnalyticsVueReportWidget = Vue.extend(ReportWidget)
window.AnalyticsVueReportWidgetSettings = Vue.extend(ReportWidgetSettings)

// Realtime Widget
window.AnalyticsVueRealtimeWidget = Vue.extend(RealtimeWidget)

// Report Field
window.AnalyticsVueReportField = Vue.extend(ReportField)

// Tests
window.AnalyticsVueTestReportWidget = Vue.extend({
  render: h => h(TestReportWidget),
})

window.AnalyticsVueTestReportWidgetSettings = Vue.extend({
  render: h => h(TestReportWidgetSettings),
})

window.AnalyticsVueSettings = Vue.extend({
  render: h => h(Settings),
})

window.AnalyticsVueTests = Vue.extend({
  data() {
    return {
      selectedReportingView: null,
      selectedChart: 'area',
      selectedPeriod: 'week',
      selectedMetric: null,
    }
  },
  render: h => h(Tests),
})

window.AnalyticsVueTestReports = Vue.extend({
  render: h => h(TestReports),
})
