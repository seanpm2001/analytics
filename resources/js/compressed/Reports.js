Analytics.reports.BaseChart=Garnish.Base.extend({type:null,chart:null,data:null,period:null,options:null,visualization:null,init:function(t,a){this.visualization=new Analytics.Visualization({onAfterInit:$.proxy(function(){this.$chart=t,this.$chart.html(""),this.$graph=$('<div class="chart" />').appendTo(this.$chart),this.data=a,"undefined"!=typeof this.data.chartOptions&&(this.chartOptions=this.data.chartOptions),"undefined"!=typeof this.data.type&&(this.type=this.data.type),"undefined"!=typeof this.data.period&&(this.period=this.data.period),this.addListener(Garnish.$win,"resize","resize"),this.initChart(),"undefined"!=typeof this.data.onAfterInit&&this.data.onAfterInit()},this)})},initChart:function(){this.$graph.addClass(this.type)},draw:function(){this.dataTable&&this.chartOptions&&this.chart.draw(this.dataTable,this.chartOptions)},resize:function(){this.chart&&this.dataTable&&this.chartOptions&&this.chart.draw(this.dataTable,this.chartOptions)}}),Analytics.reports.Area=Analytics.reports.BaseChart.extend({initChart:function(){if(this.base(),$period=$('<div class="period" />').prependTo(this.$chart),$title=$('<div class="title" />').prependTo(this.$chart),$title.html(this.data.metric),$period.html(this.data.periodLabel),this.dataTable=Analytics.Utils.responseToDataTable(this.data.chart),this.chartOptions=Analytics.ChartOptions.area(this.data.period),"undefined"!=typeof this.data.chartOptions&&$.extend(this.chartOptions,this.data.chartOptions),"year"==this.data.period){var t=new google.visualization.DateFormat({pattern:"MMMM yyyy"});t.format(this.dataTable,0)}this.chart=new google.visualization.AreaChart(this.$graph.get(0)),this.draw()}}),Analytics.reports.Counter=Analytics.reports.BaseChart.extend({initChart:function(){this.base(),$value=$('<div class="value" />').appendTo(this.$graph),$label=$('<div class="label" />').appendTo(this.$graph),$period=$('<div class="period" />').appendTo(this.$graph),$value.html(this.data.counter.count),$label.html(this.data.metric),$period.html(" "+this.data.periodLabel)}}),Analytics.reports.Pie=Analytics.reports.BaseChart.extend({initChart:function(){this.base(),$period=$('<div class="period" />').prependTo(this.$chart),$title=$('<div class="title" />').prependTo(this.$chart),$title.html(this.data.dimension),$period.html(this.data.metric+" "+this.data.periodLabel),this.dataTable=Analytics.Utils.responseToDataTable(this.data.chart),this.chartOptions=Analytics.ChartOptions.pie(),this.chart=new google.visualization.PieChart(this.$graph.get(0)),this.draw()}}),Analytics.reports.Table=Analytics.reports.BaseChart.extend({initChart:function(){this.base(),$period=$('<div class="period" />').prependTo(this.$chart),$title=$('<div class="title" />').prependTo(this.$chart),$title.html(this.data.metric),$period.html(this.data.periodLabel),this.dataTable=Analytics.Utils.responseToDataTable(this.data.chart),this.chartOptions=Analytics.ChartOptions.table(),this.chart=new google.visualization.Table(this.$graph.get(0)),this.draw()}}),Analytics.reports.Geo=Analytics.reports.BaseChart.extend({initChart:function(){this.base(),$period=$('<div class="period" />').prependTo(this.$chart),$title=$('<div class="title" />').prependTo(this.$chart),$title.html(this.data.metric),$period.html(this.data.periodLabel),this.dataTable=Analytics.Utils.responseToDataTable(this.data.chart),this.chartOptions=Analytics.ChartOptions.geo(this.data.dimensionRaw),this.chart=new google.visualization.GeoChart(this.$graph.get(0)),this.draw()}});