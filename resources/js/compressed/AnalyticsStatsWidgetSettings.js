Analytics.StatsWidgetSettings=Garnish.Base.extend({init:function(t,i){this.$container=$("#"+t),this.$form=this.$container.closest("form"),this.settings=i,this.$chartTypes=$(".chart-picker ul.chart-types li",this.$form),this.$chartSelect=$(".chart-select select",this.$form),this.addListener(this.$form,"submit",$.proxy(function(t){this.onSubmit(t)},this)),this.addListener(this.$chartTypes,"click",$.proxy(function(t){var i=$(t.currentTarget);this.$chartTypes.removeClass("active"),i.addClass("active"),this.$chartSelect.val(i.data("chart-type")),this.$chartSelect.trigger("change")},this)),this.$chartTypes.filter("[data-chart-type="+this.$chartSelect.val()+"]").trigger("click")},onSubmit:function(t){"undefined"!=typeof this.settings.onSubmit&&this.settings.onSubmit(t)}});