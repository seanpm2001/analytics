!function(e){"undefined"==typeof Analytics&&(Analytics={});var t=!1;Analytics.Explorer=Garnish.Base.extend({init:function(t,i){this.$element=e("#"+t),this.$widget=e(".analytics-widget:first",this.$element),this.$views=e(".analytics-view",this.$element),this.$error=e(".analytics-error",this.$element),this.view=!1,this.views={},this.section=!1,this.settings=i,this.loaded=!1,this.addListener(Garnish.$win,"resize","resize"),this.visualizationLoad()},loadInterface:function(){var t=this.settings;switch(t.menu||(t.menu="audienceOverview"),this.$pinBtn=e(".analytics-pin",this.$element),this.$collapsible=e(".analytics-collapsible",this.$element),this.pinBtn=new Analytics.PinBtn(this.$pinBtn,this.$collapsible,{pinned:this.settings.pinned,onPinChange:e.proxy(this,"onPinChange")}),this.$open=e(".analytics-open",this.$element),this.addListener(this.$open,"click","onOpen"),this.$menu=e(".analytics-menu:first select:first",this.$element),this.menu=new Analytics.Menu(this.$menu,{defaultMenu:t.menu,onMenuChange:e.proxy(this,"onMenuChange")}),this.views.browser=new Analytics.BrowserView(this),this.views.realtimeVisitors=new Analytics.RealtimeVisitorsView(this),this.menu.onMenuChange(!1,!1),this.section.view){case"browser":this.views.browser.metrics.val(t.metric),this.views.browser.dimensions.val(t.dimension),this.views.browser.period.val(t.period),t.chart&&this.views.browser.tableTypes.val(t.chart),this.views.browser.browse();break;case"realtimeVisitors":}},onMenuChange:function(t,i,s){switch(this.$views.addClass("hidden"),this.section=this.getSection(t),this.section.view){case"browser":this.views.realtimeVisitors.disable(),this.views.browser.dimensions.setOptions(this.section.dimensions),this.views.browser.metrics.setOptions(this.section.metrics),this.views.browser.tableTypes.setOptions(this.section.enabledCharts),this.views.browser.tableTypes.val(this.section.chart),i&&this.views.browser.browse();break;case"realtimeVisitors":this.views.realtimeVisitors.enable()}this.view=this.views[this.section.view],e('[data-view="'+this.section.view+'"]',this.$element).removeClass("hidden"),"undefined"==typeof s&&(s=!0),s&&this.saveState(),this.view.resize&&this.view.resize()},onOpen:function(t){var i=e(t.currentTarget),s=i.data("account-id"),a=i.data("property-id"),n=i.data("profile-id"),r=this.section.uri,h="https://www.google.com/analytics/web/?pli=1#"+r+"/a"+s+"w"+a+"p"+n+"/";window.open(h,"_blank")},onPinChange:function(){this.saveState()},visualizationLoad:function(){0==t&&("undefined"==typeof AnalyticsChartLanguage&&(AnalyticsChartLanguage="en"),google.load("visualization","1",{packages:["corechart","table","geochart"],language:AnalyticsChartLanguage}),t=!0),google.setOnLoadCallback(e.proxy(function(){return"undefined"==typeof google.visualization?(this.$widget.addClass("hidden"),this.$error.html("An unknown error occured"),void this.$error.removeClass("hidden")):void this.loadInterface()},this))},saveState:function(){this.view.saveState()},resize:function(){this.view.resize&&this.view.resize()},getSection:function(t){var i={uri:!1,view:!1,dimensions:!1,metrics:!1,enabledCharts:!1,realtime:!1,chart:!1};return e.each(AnalyticsBrowserData,function(s,a){return s==t?(e.each(a,function(e,t){i[e]=t}),!1):void 0}),i}}),Analytics.BrowserView=Garnish.Base.extend({init:function(t){this.explorer=t,this.$element=this.explorer.$element,this.browser=!1,this.$dimensionsField=e(".analytics-dimension-field",this.$element),this.dimensions=new Analytics.SelectField(this.$dimensionsField,{onChange:e.proxy(this,"onDimensionsChange")}),this.$metricsField=e(".analytics-metric-field",this.$element),this.metrics=new Analytics.SelectField(this.$metricsField,{onChange:e.proxy(this,"onMetricsChange")}),this.$tableTypes=e(".analytics-tabletypes:first",this.$element),this.tableTypes=new Analytics.TableTypes(this.$tableTypes,{onChange:e.proxy(this,"onTableTypesChange")}),this.$periodField=e(".analytics-period",this.$element),this.period=new Analytics.SelectField(this.$periodField,{onChange:e.proxy(this,"onPeriodChange")})},saveState:function(t){var i={id:this.explorer.$widget.data("widget-id"),settings:{menu:this.explorer.menu.val(),pinned:this.explorer.pinBtn.val(),metric:this.metrics.val(),dimension:this.dimensions.val(),chart:this.tableTypes.val(),period:this.period.val()}};Craft.queueActionRequest("analytics/saveWidgetState",i,e.proxy(function(e){},this))},onMetricsChange:function(t){value=e(t.currentTarget).val(),this.browse(),this.saveState()},onDimensionsChange:function(t){value=e(t.currentTarget).val(),this.browse(),this.saveState()},onTableTypesChange:function(e){this.browse(),this.saveState()},onPeriodChange:function(t){value=e(t.currentTarget).val(),this.browse(),this.saveState()},browse:function(){this.browser&&(this.browser.disable(),this.browser=!1),data={metrics:this.metrics.val(),dimensions:this.dimensions.val(),tableType:this.tableTypes.val(),period:this.period.val(),realtime:0},"undefined"!=typeof this.explorer.section.realtime&&this.explorer.section.realtime&&(data.realtime=1),this.browser=new Analytics.Browser(this.explorer,data)},resize:function(){var t={dimensionsWidth:e("select",this.$dimensionsField).width(),metricsWidth:e("select",this.$metricsField).width(),tableTypesWidth:e(".analytics-enabled-tabletypes",this.$tableTypes).width(),periodWidth:e("select",this.$periodField).width()},i=0;e.each(t,function(e,t){i+=t+30});var s=this.explorer.$collapsible.width()-72;s>i?this.explorer.$widget.removeClass("analytics-small"):this.explorer.$widget.addClass("analytics-small"),this.browser&&this.browser.resize()}}),Analytics.Browser=Garnish.Base.extend({init:function(t,i){this.explorer=t,this.$element=this.explorer.$element,this.$spinner=e(".spinner",this.$element),this.$nodata=e(".analytics-no-data",this.$element),this.$browser=e(".analytics-browser:first",this.$element),this.$browserContent=e(".analytics-browser-content:first",this.$element),this.$widget=e(".analytics-widget:first",this.$element),this.$infos=e(".analytics-infos",this.$element),this.$infosDimension=e(".analytics-infos-dimension",this.$element),this.$infosMetric=e(".analytics-infos-metric",this.$element),this.$infosPeriod=e(".analytics-infos-period",this.$element),this.$infosCount=e(".analytics-infos-count",this.$element),this.$chart=e(".analytics-single-chart",this.$element),this.$counter=e(".analytics-counter",this.$element),this.$counterValue=e(".analytics-counter-value",this.$element),this.$counterLabel=e(".analytics-counter-label",this.$element),this.$counterPeriod=e(".analytics-counter-period",this.$element),this.timer=!1,this.data=i,this.request(),this.data.realtime&&this.startRealtime()},disable:function(){this.stopRealtime()},startRealtime:function(){this.timer&&this.stopRealtime(),this.timer=setInterval(e.proxy(function(){this.request()},this),1e3*AnalyticsRealtimeInterval)},stopRealtime:function(){clearInterval(this.timer)},request:function(){var t=this.data.tableType;this.$spinner.removeClass("body-loading"),this.$spinner.removeClass("hidden"),Craft.queueActionRequest("analytics/explorer/"+t,this.data,e.proxy(function(e,i){"success"==i&&"undefined"==typeof e.error?(this.$browserContent.removeClass("hidden"),this.explorer.$error.addClass("hidden"),this.handleResponse(e,t)):(this.$browserContent.addClass("hidden"),this.explorer.$error.html(e.error),this.explorer.$error.removeClass("hidden")),this.$chart.removeClass("analytics-chart-area"),this.$chart.removeClass("analytics-chart-table"),this.$chart.removeClass("analytics-chart-pie"),this.$chart.removeClass("analytics-chart-counter"),this.$chart.removeClass("analytics-chart-geo"),this.$chart.addClass("analytics-chart-"+t),this.$spinner.addClass("hidden")},this))},handleResponse:function(e,t){var i=0;switch(t){case"area":i=e.area.rows.length,this.handleAreaChartResponse(e);break;case"geo":i=e.table.rows.length,this.handleGeoChartResponse(e);break;case"pie":i=e.table.rows.length,this.handlePieChartResponse(e);break;case"table":i=e.table.rows.length,this.handleTableChartResponse(e);break;case"counter":this.handleCounterResponse(e)}"undefined"!=typeof e.dimension?(this.$infosDimension.removeClass("hidden"),this.$infosDimension.html(e.dimension)):this.$infosDimension.addClass("hidden"),"undefined"!=typeof e.metric?(this.$infosMetric.removeClass("hidden"),this.$infosMetric.html(e.metric)):this.$infosMetric.addClass("hidden"),"undefined"!=typeof e.total?(this.$infosCount.html(e.total),this.$infosCount.removeClass("hidden")):this.$infosCount.addClass("hidden"),"undefined"!=typeof e.period?(this.$infosPeriod.html(e.period),this.$infosPeriod.removeClass("hidden")):this.$infosPeriod.addClass("hidden"),"counter"==t?(this.$counter.removeClass("hidden"),this.$chart.addClass("hidden"),this.$infos.addClass("hidden"),this.$nodata.addClass("hidden")):(this.$counter.addClass("hidden"),this.$chart.removeClass("hidden"),this.$infos.removeClass("hidden"),i>0?(this.$nodata.addClass("hidden"),this.$chart.removeClass("hidden")):(this.$nodata.removeClass("hidden"),this.$chart.addClass("hidden"))),this.resize()},fillChartData:function(t){this.chartData=new google.visualization.DataTable,e.each(t.columns,e.proxy(function(e,t){var i=AnalyticsUtils.parseColumn(t);this.chartData.addColumn(i.type,i.label)},this)),rows=t.rows,rows=AnalyticsUtils.parseRows(t.columns,t.rows),this.chartData.addRows(rows)},handleAreaChartResponse:function(t){if(this.fillChartData(t.area),this.chartOptions=Analytics.ChartOptions.area,"week"==this.data.period)this.chartOptions.hAxis.format="E",this.chartOptions.hAxis.showTextEvery=1;else if("month"==this.data.period)this.chartOptions.hAxis.format="MMM d",this.chartOptions.hAxis.showTextEvery=1;else if("year"==this.data.period){this.chartOptions.hAxis.showTextEvery=1,this.chartOptions.hAxis.format="MMM yy";var i=new google.visualization.DateFormat({pattern:"MMMM yyyy"});i.format(this.chartData,0)}var s=e("<div>");this.chart=new google.visualization.AreaChart(s.get(0)),this.$chart.html(""),this.$chart.append(s),this.chart.draw(this.chartData,this.chartOptions)},handleCounterResponse:function(e){this.$counterValue.html(e.counter.count),this.$counterLabel.html(e.metric),this.$counterPeriod.html(e.period)},handleGeoChartResponse:function(t){switch(this.fillChartData(t.table),this.chartOptions=Analytics.ChartOptions.geo,this.chartOptions.displayMode="auto",this.data.dimensions){case"ga:city":this.chartOptions.displayMode="markers";break;case"ga:country":this.chartOptions.resolution="countries";break;case"ga:continent":this.chartOptions.resolution="continents";break;case"ga:subContinent":this.chartOptions.resolution="subcontinents"}var i=e("<div>");this.chart=new google.visualization.GeoChart(i.get(0)),this.$chart.html(""),this.$chart.append(i),this.chart.draw(this.chartData,this.chartOptions)},handleTableChartResponse:function(t){this.fillChartData(t.table),this.chartOptions=Analytics.ChartOptions.table;var i=e("<div>");this.chart=new google.visualization.Table(i.get(0)),this.$chart.html(""),this.$chart.append(i),this.chart.draw(this.chartData,this.chartOptions)},handlePieChartResponse:function(t){this.fillChartData(t.table),this.chartOptions=Analytics.ChartOptions.pie;var i=e("<div>");this.chart=new google.visualization.PieChart(i.get(0)),this.$chart.html(""),this.$chart.append(i),this.chart.draw(this.chartData,this.chartOptions)},resize:function(){this.chart&&this.chart.draw(this.chartData,this.chartOptions)}}),Analytics.RealtimeVisitorsView=Garnish.Base.extend({init:function(e){this.explorer=e,this.$element=this.explorer.$element,this.realtimeVisitors=new Analytics.RealtimeVisitors(this.explorer)},saveState:function(){var t={id:this.explorer.$widget.data("widget-id"),settings:{menu:this.explorer.menu.val(),pinned:this.explorer.pinBtn.val()}};Craft.queueActionRequest("analytics/saveWidgetState",t,e.proxy(function(e){},this))},enable:function(){this.realtimeVisitors.enable()},disable:function(){this.realtimeVisitors.disable()}}),Analytics.RealtimeVisitors=Garnish.Base.extend({init:function(t){this.explorer=t,this.$element=this.explorer.$element,this.$realtimeVisitors=e(".analytics-realtime-visitors",this.$element),this.$spinner=e(".spinner",this.$element),this.timer=!1},enable:function(){this.request(),this.startRealtime()},disable:function(){this.stopRealtime()},startRealtime:function(){this.timer&&this.stopRealtime(),this.timer=setInterval(e.proxy(function(){this.request()},this),1e3*AnalyticsRealtimeInterval)},stopRealtime:function(){clearInterval(this.timer)},request:function(){this.$spinner.removeClass("body-loading"),this.$spinner.removeClass("hidden"),Craft.queueActionRequest("analytics/explorer/realtimeVisitors",{},e.proxy(function(e,t){"success"==t&&"undefined"==typeof e.error?(this.$realtimeVisitors.removeClass("hidden"),this.explorer.$error.addClass("hidden"),this.handleResponse(e)):(msg="An unknown error occured.","undefined"!=typeof e&&e&&"undefined"!=typeof e.error&&(msg=e.error),this.$realtimeVisitors.addClass("hidden"),this.explorer.$error.html(msg),this.explorer.$error.removeClass("hidden")),this.$spinner.addClass("hidden")},this))},handleResponse:function(t){var i=t.newVisitor,s=t.returningVisitor,a=1*s+1*i;if(e(".active-visitors .count",this.$realtimeVisitors).text(a),a>0?(e(".progress",this.$realtimeVisitors).removeClass("hidden"),e(".legend",this.$realtimeVisitors).removeClass("hidden")):(e(".progress",this.$realtimeVisitors).addClass("hidden"),e(".legend",this.$realtimeVisitors).addClass("hidden")),a>0)var n=Math.round(100*i/a);else var n=100;var r=100-n;e(".progress-bar.blue",this.$realtimeVisitors).css("width",n+"%"),e(".progress-bar.blue span",this.$realtimeVisitors).text(n+"%"),n>0?e(".progress-bar.blue",this.$realtimeVisitors).removeClass("hidden"):e(".progress-bar.blue",this.$realtimeVisitors).addClass("hidden"),e(".progress-bar.green",this.$realtimeVisitors).css("width",r+"%"),e(".progress-bar.green span",this.$realtimeVisitors).text(r+"%"),r>0?e(".progress-bar.green",this.$realtimeVisitors).removeClass("hidden"):e(".progress-bar.green",this.$realtimeVisitors).addClass("hidden")}}),Analytics.Menu=Garnish.Base.extend({init:function(e,t){this.$menu=e,this.settings=t,"undefined"!=typeof t.defaultMenu&&this.$menu.val(t.defaultMenu),this.addListener(this.$menu,"change","onMenuChange")},val:function(){return this.$menu.val()},onMenuChange:function(e,t){value=this.$menu.val(),this.settings.onMenuChange(value,e,t)}}),Analytics.PinBtn=Garnish.Base.extend({init:function(e,t,i){this.$pinBtn=e,this.$collapsible=t,this.settings=i,this.pinned="undefined"!=typeof i.pinned?i.pinned:0,this.pinned?(this.$pinBtn.addClass("active"),this.$collapsible.addClass("analytics-collapsed"),this.$collapsible.animate({opacity:0,height:"toggle"},0)):this.$collapsible.css("visibility","visible"),this.addListener(this.$pinBtn,"click","onPin")},val:function(){return this.pinned},onPin:function(){this.$pinBtn.hasClass("active")?this.unpin():this.pin()},pin:function(e){this.$pinBtn.addClass("active"),this.$collapsible.addClass("analytics-collapsed"),this.pinned=1,this.$collapsible.animate({opacity:0,height:"toggle"},200),this.settings.onPinChange(e)},unpin:function(){this.$pinBtn.removeClass("active"),this.$collapsible.removeClass("analytics-collapsed"),this.pinned=0,this.$collapsible.css("visibility","visible"),this.$collapsible.animate({opacity:1,height:"toggle"},200),this.settings.onPinChange()}}),Analytics.TableTypes=Garnish.Base.extend({init:function(t,i){this.$tableTypes=t,this.$enabledTableTypes=e(".analytics-enabled-tabletypes:first",this.$tableTypes),this.$disabledTableTypes=e(".analytics-disabled-tabletypes:first",this.$tableTypes),this.$tableTypeBtns=e(".btn",this.$tableTypes),this.settings=i,this.addListener(this.$tableTypeBtns,"click","onTableTypeChange"),this.$tableTypeBtns.removeClass("active")},setOptions:function(t,i){this.hideTableTypes(),"undefined"!=typeof t&&t?e.each(t,e.proxy(function(e,t){this.showTableType(t)},this)):(this.showTableType("pie"),this.showTableType("table")),this.$tableTypeBtns.removeClass("active");var s=e(".btn:first",this.$enabledTableTypes);this.value=s.data("tabletype"),s.addClass("active")},val:function(t){return"undefined"!=typeof t&&t?(this.value=t,this.$tableTypeBtns.removeClass("active"),e('[data-tabletype="'+this.value+'"]',this.$enabledTableTypes).addClass("active"),this.value):this.value},showTableTypes:function(){e(".btn",this.$disabledTableTypes).appendTo(this.$enabledTableTypes)},hideTableTypes:function(){e(".btn",this.$enabledTableTypes).appendTo(this.$disabledTableTypes)},showTableType:function(t){e('[data-tabletype="'+t+'"]',this.$tableTypes).appendTo(this.$enabledTableTypes)},hideTableType:function(t){e('[data-tabletype="'+t+'"]',this.$tableTypes).appendTo(this.$disabledTableTypes)},onTableTypeChange:function(t){var i=e(t.currentTarget).data("tabletype");this.$tableTypeBtns.removeClass("active"),e('[data-tabletype="'+i+'"]',this.$enabledTableTypes).addClass("active"),this.value=i,this.settings.onChange(this.value)}}),Analytics.SelectField=Garnish.Base.extend({init:function(t,i){this.$field=t,this.$select=e("select",this.$field),this.settings=i,this.addListener(this.$select,"change","onChange")},setOptions:function(t){this.$select.html(""),t?(this.$field.removeClass("hidden"),e.each(t,e.proxy(function(t,i){e('<option value="'+i.value+'">'+i.label+"</option>").appendTo(this.$select)},this))):this.$field.addClass("hidden"),this.val(e('option[value="'+this.val()+'"]',this.$select).length>0?this.val():e("option:first",this.$select).val())},val:function(e){return"undefined"!=typeof e&&e?this.$select.val(e):this.$select.val()},onChange:function(t){this.value=e(t.currentTarget).val(),this.settings.onChange(t)}}),Analytics.ChartOptions=Garnish.Base.extend({},{area:{height:150,theme:"maximized",legend:"none",backgroundColor:"#FFF",colors:["#058DC7"],areaOpacity:.1,pointSize:8,lineWidth:4,chartArea:{},hAxis:{format:"E",textPosition:"in",textStyle:{color:"#058DC7"},showTextEvery:1,baselineColor:"#fff",gridlines:{color:"none"}},vAxis:{textPosition:"in",textStyle:{color:"#058DC7"},baselineColor:"#ccc",gridlines:{color:"#fafafa"},maxValue:0}},geo:{height:282},pie:{theme:"maximized",height:282,pieHole:.5,legend:{alignment:"center",position:"top"},chartArea:{top:40,height:"82%"},sliceVisibilityThreshold:1/120},table:{page:"enable"}})}(jQuery);