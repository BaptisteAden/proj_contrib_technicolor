/* Actualise les contributions brutes du fichier JSON.
* Les contributions brutes sont les resultats des fonctions, sous forme numerique (pas en pourcentage).
*/
function updateJSON(json){
	var personne;
	
	//Parcours des blocs globaux
	$.each(json, function(keyGlobal, objGlobal){
		if(keyGlobal != "contribBrute"){
			//Parcours des corps de metiers
			$.each(objGlobal, function(keyCorpsMetier, objCorpsMetier){
				if(keyCorpsMetier != "contribBrute"){
					//Parcours des personnes
					for(var i=0; i<Object.keys(objCorpsMetier).length-3; i++){	
						personne = objCorpsMetier[i];
						//Fonction metier de la personne
						for(var j=0; j<personne.valeurs.length; j++){
							personne.contribBrute += personne.poids[j] * personne.valeurs[j];
						}
						//Ajout de la contribution de la personne a la contribution du corps de metier
						objCorpsMetier.contribBrute += personne.contribBrute;
					}
					//Fonction globale du corps de metier
					objCorpsMetier.contribBrute *= objCorpsMetier.poids;		
					//Ajout de la contribution du corps de metier a la contribution du bloc global
					objGlobal.contribBrute += objCorpsMetier.contribBrute;
				}
			});
			//Ajout de la contribution du bloc global a la contribution totale
			json.contribBrute += objGlobal.contribBrute;
		}
	});
}


/* Calcule la contribution d'un bloc par rapport a son bloc parent.
* @param bloc Le bloc dont on souhaite calculer la contribution.
* @param blocParent Le parent du bloc dont on souhaite calculer la contribution.
* @return Chaine de caracteres representant la contribution du bloc souhaite en pourcentage.
*/
function computeContribution(blocLevel, bloc){
	var ret = 0;
	switch(blocLevel){
		case 1:
			break;
			$.each(bloc, function(keyCorpsMetier, corpsMetier){
				ret += computeContribution(2, corpsMetier);
			});
			break;
		case 2:
			$.each(bloc, function(keyPersonne, personne){
				ret += computeContribution(3, personne);
			});
			break;
		case 3:
			for(var i=0; i<bloc.valeurs.length; i++){
				ret += bloc.poids[i] * bloc.valeurs[i];
			}
			break;
		default:
			ret = null;
	}
	return ret;
}

/* Retourne une contribution en pourcentage.
* @param contribution La contribution a convertir en pourcentage.
* @return Chaine de caracteres representant la contribution sous forme de pourcentage.
*/
function getPercentage(contribution){
	return ( Math.round(contribution * 100 * PRECISION_CONTRIBUTIONS) / PRECISION_CONTRIBUTIONS + "%" );
}


/* Calcule toutes les contributions :
* - globales dans le total,
* - corps de metier dans le bloc global,
* - corps de metier dans le total,
* - personne dans le corps de metier,
* - personne dans le bloc global,
* - personne dans le total.
* @return Un objet contenant trois objets (globales, corpsMetier, personnes), contenant les contributions.
*/
function computeAllContributions(json){
	var ret = {globales:{}, corpsMetier:{}, personnes:{}};
	var personne;
	
	//Parcours des blocs globaux
	$.each(json, function(keyGlobal, objGlobal){
		if(keyGlobal != "contribBrute"){
			ret.globales[keyGlobal] = objGlobal.contribBrute / json.contribBrute;
			//Parcours des corps de metier
			$.each(objGlobal, function(keyCorpsMetier, objCorpsMetier){
				if(keyCorpsMetier != "contribBrute"){
					ret.corpsMetier[keyCorpsMetier] = {};
					ret.corpsMetier[keyCorpsMetier].blocGlobal = objCorpsMetier.contribBrute / objGlobal.contribBrute;
					ret.corpsMetier[keyCorpsMetier].total = ret.corpsMetier[keyCorpsMetier].blocGlobal * ret.globales[keyGlobal];
					//Parcours des personnes
					for(var i=0; i<Object.keys(objCorpsMetier).length-3; i++){	
						personne = objCorpsMetier[i];
						ret.personnes[personne.nom] = {};
						ret.personnes[personne.nom].corpsMetier = personne.contribBrute / objCorpsMetier.contribBrute * objCorpsMetier.poids;
						ret.personnes[personne.nom].blocGlobal = ret.personnes[personne.nom].corpsMetier * ret.corpsMetier[keyCorpsMetier].blocGlobal;
						ret.personnes[personne.nom].total = ret.personnes[personne.nom].blocGlobal * ret.globales[keyGlobal];
					}
				}
			});
		}
	});
	return ret;
}


function generateD3JSON(json){
	var ret = [];
	var personne;
	
	//Parcours des blocs globaux
	$.each(json, function(keyGlobal, objGlobal){
		if(keyGlobal != "contribBrute"){
			//Parcours des corps de metier
			$.each(objGlobal, function(keyCorpsMetier, objCorpsMetier){
				if(keyCorpsMetier != "contribBrute"){
					//Parcours des personnes
					for(var i=0; i<Object.keys(objCorpsMetier).length-3; i++){
						personne = objCorpsMetier[i];
						ret.push({
							"key": personne.nom,
							"region": keyGlobal,
							"subregion": keyCorpsMetier,
							"contribution": getPercentage(personne.contribBrute / objCorpsMetier.contribBrute * objCorpsMetier.poids),
							"value": 1
						});
					}
				}
			});
		}
	});
	return ret;
}

function getXML(){
	$.ajax({
		type: "GET",
		url: "football_player.xml",
		dataType: "xml",
		success: function(xml) {
			$(xml).find("football player").each(function(){
				console.log( $(this).name );
			});
		}
	});
}