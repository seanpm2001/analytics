Analytics.ReportWidgetSettings=Garnish.Base.extend({init:function(t,e){setTimeout($.proxy(function(){this.$container=$("#"+t),this.$form=this.$container.closest("form"),this.settings=e,this.$chartTypes=$(".chart-picker ul.chart-types li",this.$form),this.$chartSelect=$(".chart-select select",this.$form),this.$selectizeSelects=$(".selectize select",this.$form),this.$selectizeSelects.selectize(),this.addListener(this.$chartTypes,"click",$.proxy(function(t){var e=$(t.currentTarget);this.$chartTypes.removeClass("active"),e.addClass("active"),this.$chartSelect.val(e.data("chart-type")),this.$chartSelect.trigger("change")},this)),this.$chartTypes.filter("[data-chart-type="+this.$chartSelect.val()+"]").trigger("click")},this),1)}});