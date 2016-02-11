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
	
	$.getJSON('projects/The Force Uttinished/schema.json', function(json) {
		test = json;
		updateJSON(json);
		var contribs = computeAllContributions(json);
		
		$.each(contribs.personnes, function(keyPersonne, contribsPersonne){
			$('#tabPersonnes').append( $('<tr>')
				.append( $('<td>').text(keyPersonne.slice(0,-1)) )
				.append( $('<td>').text(getPercentage(contribsPersonne.corpsMetier)) )
				.append( $('<td>').text(getPercentage(contribsPersonne.blocGlobal)) )
				.append( $('<td>').text(getPercentage(contribsPersonne.total)) )
			);
		});
		$.each(contribs.corpsMetier, function(keyCorpsMetier, contribsCorpsMetier){
			$('#tabCorpsMetier').append( $('<tr>')
				.append( $('<td>').text(keyCorpsMetier) )
				.append( $('<td>').text(getPercentage(contribsCorpsMetier.blocGlobal)) )
				.append( $('<td>').text(getPercentage(contribsCorpsMetier.total)) )
			);
		});
		$.each(contribs.globales, function(keyGlobale, contribsGlobales){
			$('#tabGlobal').append( $('<tr>')
				.append( $('<td>').text(keyGlobale) )
				.append( $('<td>').text(getPercentage(contribsGlobales)) )
			);
		});
	});
	
	//Charger les projets
	//Remplir la combo des projets
});