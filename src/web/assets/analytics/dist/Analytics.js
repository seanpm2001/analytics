Analytics.ChartOptions=Garnish.Base.extend({},{area:function(t){var a=JSON.parse(JSON.stringify(this.defaults.area));switch(t){case"week":a.hAxis.format="E";break;case"month":a.hAxis.format="MMM d";break;case"year":a.hAxis.format="MMM yy"}return a},table:function(){return this.defaults.table},geo:function(t){var a=this.defaults.geo;switch(t){case"ga:city":a.displayMode="markers";break;case"ga:country":a.resolution="countries",a.displayMode="regions";break;case"ga:continent":a.resolution="continents",a.displayMode="regions";break;case"ga:subContinent":a.resolution="subcontinents",a.displayMode="regions"}return a},pie:function(){return this.defaults.pie},field:function(){return{theme:"maximized",legend:"none",backgroundColor:"#fdfdfd",colors:["#058DC7"],areaOpacity:.1,lineWidth:4,height:120,hAxis:{format:"MMM d",textPosition:"in",textStyle:{color:"#058DC7"},showTextEvery:1,baselineColor:"#fff",gridlines:{color:"none"}},vAxis:{textPosition:"in",textStyle:{color:"#058DC7"},baselineColor:"#ccc",gridlines:{color:"#f4f4f4"},minValue:0,maxValue:10,format:"#"}}},defaults:{area:{theme:"maximized",legend:"none",backgroundColor:"transparent",colors:["#058DC7"],areaOpacity:.1,pointSize:7,lineWidth:4,chartArea:{},hAxis:{textPosition:"in",textStyle:{color:"#058DC7"},baselineColor:"#fff",gridlines:{color:"none"}},vAxis:{textPosition:"in",textStyle:{color:"#058DC7"},baselineColor:"#ccc",gridlines:{color:"#fafafa"},minValue:0,maxValue:10,format:"#"}},geo:{displayMode:"auto"},pie:{theme:"maximized",height:282,pieHole:.5,legend:{alignment:"center",position:"top"},chartArea:{top:40,height:"82%"},sliceVisibilityThreshold:1/120},table:{page:"auto",pageSize:10}}}),Analytics.Metadata={getContinentByCode:function(t){var a;return $.each(Analytics.continents,function(e,i){t==i.code&&(a=i.label)}),a||t},getSubContinentByCode:function(t){var a;return $.each(Analytics.subContinents,function(e,i){t==i.code&&(a=i.label)}),a||t}},Analytics.Utils={responseToDataTable:function(t,a){var e=new google.visualization.DataTable;return $.each(t.cols,function(t,a){var i;switch(a.type){case"date":i="date";break;case"percent":case"time":case"integer":case"currency":case"float":i="number";break;default:i="string"}e.addColumn({type:i,label:a.label,id:a.id})}),$.each(t.rows,$.proxy(function(i,s){var n=[];$.each(t.cols,$.proxy(function(t,e){switch(e.type){case"date":n[t]=Analytics.Utils.formatByType(a,e.type,s[t]);break;case"float":n[t]=+s[t];break;case"integer":case"currency":case"percent":case"time":case"continent":case"subContinent":n[t]={v:Analytics.Utils.formatRawValueByType(a,e.type,s[t]),f:Analytics.Utils.formatByType(a,e.type,s[t])};break;default:n[t]=s[t]}},this)),e.addRow(n)},this)),e},formatRawValueByType:function(t,a,e){switch(a){case"integer":case"currency":case"percent":case"time":case"float":return+e;default:return e}},formatByType:function(localeDefinition,type,value){switch(type){case"continent":return Analytics.Metadata.getContinentByCode(value);case"subContinent":return Analytics.Metadata.getSubContinentByCode(value);case"currency":return Analytics.Utils.formatCurrency(localeDefinition,+value);case"float":return+value;case"integer":return Analytics.Utils.formatInteger(localeDefinition,+value);case"time":return Analytics.Utils.formatDuration(+value);case"percent":return Analytics.Utils.formatPercent(localeDefinition,+value);case"date":if($dateString=value,8==$dateString.length)return $year=eval($dateString.substr(0,4)),$month=eval($dateString.substr(4,2))-1,$day=eval($dateString.substr(6,2)),$date=new Date($year,$month,$day),$date;if(6==$dateString.length)return $year=eval($dateString.substr(0,4)),$month=eval($dateString.substr(4,2))-1,$date=new Date($year,$month,"01"),$date;break;default:return value}},formatCurrency:function(t,a){return this.getD3Locale(t).format(Craft.charts.BaseChart.defaults.formats.currencyFormat)(a)},formatDuration:function(t){var a=parseInt(t,10),e=Math.floor(a/3600),i=Math.floor((a-3600*e)/60),s=a-3600*e-60*i;return e<10&&(e="0"+e),i<10&&(i="0"+i),s<10&&(s="0"+s),e+":"+i+":"+s},formatInteger:function(t,a){return this.getD3Locale(t).format(",")(a)},formatPercent:function(t,a){return this.getD3Locale(t).format(Craft.charts.BaseChart.defaults.formats.percentFormat)(a/100)},getD3Locale:function(t){return d3.formatLocale(t)},_getD3LocaleDefinition:t=>$.extend(!0,Analytics.d3FormatLocaleDefinition,t),getLocaleDefinition(t){return this._getD3LocaleDefinition({currency:t})}},Analytics.Visualization=Garnish.Base.extend({options:null,afterInitStack:[],init:function(t){this.options=t,0==Analytics.GoogleVisualizationCalled?(Analytics.GoogleVisualizationCalled=!0,google.charts.load("current",{packages:["corechart","table","geochart"],language:Analytics.chartLanguage,mapsApiKey:Analytics.mapsApiKey,callback:$.proxy(function(){Analytics.GoogleVisualizationReady=!0,this.onAfterInit(),this.onAfterFirstInit()},this)})):this.onAfterInit()},onAfterFirstInit:function(){for(i=0;i<this.afterInitStack.length;i++)this.afterInitStack[i]()},onAfterInit:function(){Analytics.GoogleVisualizationReady?this.options.onAfterInit():this.afterInitStack.push(this.options.onAfterInit)}}),Analytics.reports.BaseChart=Garnish.Base.extend({$chart:null,$graph:null,localeDefinition:null,type:null,chart:null,chartOptions:null,data:null,period:null,options:null,visualization:null,drawing:!1,init:function(t,a,e,i){this.visualization=new Analytics.Visualization({chartLanguage:i,onAfterInit:$.proxy(function(){this.$chart=t,this.$chart.html(""),this.$graph=$('<div class="chart" />').appendTo(this.$chart),this.data=a,this.localeDefinition=e,void 0!==this.data.chartOptions&&(this.chartOptions=this.data.chartOptions),void 0!==this.data.type&&(this.type=this.data.type),void 0!==this.data.period&&(this.period=this.data.period),this.addListener(Garnish.$win,"resize","resize"),this.initChart(),this.draw(),void 0!==this.data.onAfterInit&&this.data.onAfterInit()},this)})},addChartReadyListener:function(){google.visualization.events.addListener(this.chart,"ready",$.proxy(function(){this.drawing=!1,void 0!==this.data.onAfterDraw&&this.data.onAfterDraw()},this))},initChart:function(){this.$graph.addClass(this.type)},draw:function(){this.drawing||(this.drawing=!0,this.dataTable&&this.chartOptions&&this.chart.draw(this.dataTable,this.chartOptions))},resize:function(){this.chart&&this.dataTable&&this.chartOptions&&this.draw(this.dataTable,this.chartOptions)}}),Analytics.reports.Area=Analytics.reports.BaseChart.extend({initChart:function(){this.base();var t=$('<div class="subtitle" />').prependTo(this.$chart),a=$('<div class="period" />').appendTo(t),e=$('<div class="view" />').appendTo(t),s=$('<div class="title" />').prependTo(this.$chart);e.html(this.data.view),s.html(this.data.metric),a.html(this.data.periodLabel),this.dataTable=Analytics.Utils.responseToDataTable(this.data.chart,this.localeDefinition),this.chartOptions=Analytics.ChartOptions.area(this.data.period),void 0!==this.data.chartOptions&&$.extend(this.chartOptions,this.data.chartOptions);var n=[];for(i=0;i<this.data.chart.rows.length;i++){var r=this.data.chart.rows[i][0],o=r.substr(0,4),l=r.substr(4,2)-1,h=r.substr(6,2),c=new Date(o,l,h);n.push(c)}(this.chartOptions.hAxis.ticks=n,"year"==this.data.period)&&new google.visualization.DateFormat({pattern:"MMMM yyyy"}).format(this.dataTable,0);this.chart=new google.visualization.AreaChart(this.$graph.get(0)),this.addChartReadyListener()}}),Analytics.reports.Counter=Analytics.reports.BaseChart.extend({initChart:function(){this.base(),$value=$('<div class="value" />').appendTo(this.$graph),$label=$('<div class="label" />').appendTo(this.$graph),$period=$('<div class="period" />').appendTo(this.$graph),$view=$('<div class="view" />').appendTo(this.$graph);var t=Analytics.Utils.formatByType(this.localeDefinition,this.data.counter.type,this.data.counter.value);$value.html(t),$label.html(this.data.metric),$period.html(" "+this.data.periodLabel),$view.html(" "+this.data.view),this.data.onAfterDraw()}}),Analytics.reports.Geo=Analytics.reports.BaseChart.extend({initChart:function(){this.base();var t=$('<div class="subtitle" />').prependTo(this.$chart),a=$('<div class="period" />').appendTo(t),e=$('<div class="view" />').appendTo(t),i=$('<div class="title" />').prependTo(this.$chart);e.html(this.data.view),i.html(this.data.metric),a.html(this.data.periodLabel),this.dataTable=Analytics.Utils.responseToDataTable(this.data.chart,this.localeDefinition),this.chartOptions=Analytics.ChartOptions.geo(this.data.dimensionRaw),this.chart=new google.visualization.GeoChart(this.$graph.get(0)),this.addChartReadyListener()}}),Analytics.reports.Pie=Analytics.reports.BaseChart.extend({initChart:function(){this.base();var t=$('<div class="subtitle" />').prependTo(this.$chart),a=$('<div class="period" />').appendTo(t),e=$('<div class="view" />').appendTo(t),i=$('<div class="title" />').prependTo(this.$chart);e.html(this.data.view),i.html(this.data.dimension),a.html(this.data.metric+" "+this.data.periodLabel),this.dataTable=Analytics.Utils.responseToDataTable(this.data.chart,this.localeDefinition),this.chartOptions=Analytics.ChartOptions.pie(),this.chart=new google.visualization.PieChart(this.$graph.get(0)),this.chartOptions.height=this.$graph.height(),this.addChartReadyListener()}}),Analytics.reports.Table=Analytics.reports.BaseChart.extend({initChart:function(){this.base();var t=$('<div class="subtitle" />').prependTo(this.$chart),a=$('<div class="period" />').appendTo(t),e=$('<div class="view" />').appendTo(t),i=$('<div class="title" />').prependTo(this.$chart);e.html(this.data.view),i.html(this.data.metric),a.html(this.data.periodLabel),this.dataTable=Analytics.Utils.responseToDataTable(this.data.chart,this.localeDefinition),this.chartOptions=Analytics.ChartOptions.table(),this.chart=new google.visualization.Table(this.$graph.get(0)),this.addChartReadyListener()},resize:function(){}});
