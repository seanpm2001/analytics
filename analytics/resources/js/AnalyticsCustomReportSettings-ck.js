$(document).ready(function(){$("#content form").submit(function(){$(".analytics-chart-type.hidden").remove();$(".geo-dimension.hidden").remove()});$(".analytics-chart-type-2 > .fieldtoggle").change(function(){$(".analytics-toggle:visible:first select").trigger("change")});$(".analytics-toggle select").change(function(){$(".geo-dimension").addClass("hidden");$('.geo-dimension[rel="'+$(this).val()+'"]').removeClass("hidden")});$(".analytics-toggle select").trigger("change");$(".analytics-add-filter").click(function(){$id=$(".analytics-filters tr").length-1;$clone=$(".analytics-filters .prototype").clone();$clone.removeClass("prototype");$clone.removeClass("hidden");$clone.appendTo(".analytics-filters tbody");$inputs=$("select, input",$clone);$.each($inputs,function(e,t){$name=$(t).attr("name");$name=$name.replace("{index}",$id);$(t).attr("name",$name)});return!1});$(document).on("click",".analytics-remove-filter",function(){$(this).parents("tr").remove();return!1});$(".analytics-filters").parents("form").submit(function(){$(".analytics-filters .prototype").remove()})});