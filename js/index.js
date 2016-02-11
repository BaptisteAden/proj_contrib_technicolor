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
				//TMP
				.append( $('<td>') )
				.append( $('<td>') )
				.append( $('<td>') )
				//TMP
				.append( $('<td>').text(getPercentage(contribsPersonne.corpsMetier)) )
				.append( $('<td>').text(getPercentage(contribsPersonne.blocGlobal)) )
				.append( $('<td>').text(getPercentage(contribsPersonne.total)) )
			);
		});
		$.each(contribs.corpsMetier, function(keyCorpsMetier, contribsCorpsMetier){
			$('#tabCorpsMetier').append( $('<tr>')
				.append( $('<td>').text(keyCorpsMetier) )
				//TMP
				.append( $('<td>') )
				//TMP
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
		//TMP
		$.each(json, function(keyGlobal, objGlobal){
			if(keyGlobal != "contribBrute"){
				$.each(objGlobal, function(keyCorpsMetier, objCorpsMetier){
					if(keyCorpsMetier != "contribBrute"){
						$('#tabCorpsMetier td:nth-child(2):empty').first().text(objCorpsMetier.poids);
						for(var i=0; i<Object.keys(objCorpsMetier).length-3; i++){	
							$('#tabPersonnes td:nth-child(2):empty').first().html(objCorpsMetier.metriques.toString().replace(/,/g,"<br>"));
							$('#tabPersonnes td:nth-child(3):empty').first().html(objCorpsMetier[i].poids.toString().replace(/,/g,"<br>"));
							$('#tabPersonnes td:nth-child(4):empty').first().html(objCorpsMetier[i].valeurs.toString().replace(/,/g,"<br>"));
						}
					}
				});
			}
		});
		//TMP
	});
	
	//Charger les projets
	//Remplir la combo des projets
});