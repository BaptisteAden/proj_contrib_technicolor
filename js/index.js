$(document).ready(function(){
	//Attach reactions
	$('#current-project').children('div').first().click(function(){
		var icon = $(this).children().last();
		if(icon.hasClass('glyphicon-collapse-down')){
			icon.removeClass('glyphicon-collapse-down').addClass('glyphicon-collapse-up');
		}else{
			icon.removeClass('glyphicon-collapse-up').addClass('glyphicon-collapse-down');
		}
	});
	$('#contributors-management').children('div').first().click(function(){
		var icon = $(this).children().last();
		if(icon.hasClass('glyphicon-collapse-down')){
			icon.removeClass('glyphicon-collapse-down').addClass('glyphicon-collapse-up');
		}else{
			icon.removeClass('glyphicon-collapse-up').addClass('glyphicon-collapse-down');
		}
	});
	
	
	//Charger les projets
	//Remplir la combo des projets
	
	
});