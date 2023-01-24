let testBtnDisplayEleve=false,testBtnDisplayMatiere=false,testBtnDisplayNote=false;
let tabEleves = [{nom: "TOTO",prenom: "Tata", matieres: { Maths: [16,17] ,Francais: [2] }},{nom: "TITI",prenom: "Tutu", matieres: { Maths: [11,9] ,Francais: [13] }}];
let tabMatieres = ["Maths","Francais"];


//recuperation du DOM pour le display du form
const btnDisplayEleve = document.getElementById('btnDisplayELeve');
const btnDisplayMatiere = document.getElementById('btnDisplayMatiere');
const btnDisplayNote = document.getElementById('btnDisplayNote');
const formContainer = document.getElementById('formContainer');
const hrMove = document.getElementById('hrMove');

//recuperation du DOM pour les entry
const btnAjoutEleve = document.getElementById('btnAjoutEleve');
const btnAjoutMatiere = document.getElementById('btnAjoutMatiere');
const btnAjoutNote = document.getElementById('btnAjoutNote');
const inputs = [...document.querySelectorAll('input')];
const eleveSelect1 = document.getElementById('eleveSelect1');
const matiereSelect1 = document.getElementById('matiereSelect1');
const eleveSelect2 = document.getElementById('eleveSelect2');
const matiereSelect2 = document.getElementById('matiereSelect2');

const displayMoyenne = document.getElementById('textMoyenne');
const tabDisplayNote = document.getElementById('tableNote')

//fonction d'affichage des element du form
function affichage(btn,test,form){
    if (test){
        form.classList.add('hidden');
        btn.innertext = "Off";
        return false;
    }
    else{
        form.classList.remove('hidden');
        btn.innertext = "on";
        return true;
    }
}
function displayFormContainer (){
    if(!testBtnDisplayEleve && !testBtnDisplayMatiere && !! !testBtnDisplayNote){
        onOff('on','off');
    }
    else{
        onOff('off','on');
    }
}
function onOff (val1,val2){
    formContainer.classList.remove(val1);
    formContainer.classList.add(val2);
    hrMove.classList.remove(val1);
    hrMove.classList.add(val2);
}

//fonction d'ajout des elements
function ajoutEleve(entryNom,entryPrenom){
    let test = false
    tabEleves.forEach(eleve =>{
        if (eleve.nom == entryNom){
            if(eleve.prenom == entryPrenom){
                test = true;
            }
        }
    });
    if(!test){
        tabEleves.push({nom:entryNom,prenom:entryPrenom,matieres:{Maths:[],Francais:[]}});
        refreshEleve();
    }
}
function ajoutMatiere(intituleMatiere){
    let index = tabMatieres.indexOf(intituleMatiere);
    if(index == -1){
        tabMatieres.push(intituleMatiere);
        for (let eleve of tabEleves){
            eleve.matieres[intituleMatiere]=[];
        }
        refreshMatiere();
    }


}
function ajoutNote (valueEleve,valueMatiere,note){
    if(valueEleve!="" && valueMatiere!=""){
        let intitule = tabMatieres[Number(valueMatiere)]
        tabEleves[Number(valueEleve)].matieres[intitule].push(note)
    }
    
}
function majPremiereLettre(tabMot){
    tabMot[0]= tabMot[0].toUpperCase();
    return tabMot.join('');
}
function resetInput (indexinput){
    inputs[indexinput].value = "";
}

//refresh l'affichage des select
function refreshEleve (){
    eleveSelect1.innerHTML = `<option value="">Selectioner un eleve</option>`
    eleveSelect2.innerHTML = `<option value="">Touts les eleves</option>`
    tabEleves.forEach(eleve => {
        eleveSelect1.innerHTML +=`<option value="${tabEleves.indexOf(eleve)}">${eleve.nom} ${eleve.prenom}</option>`;
        eleveSelect2.innerHTML +=`<option value="${tabEleves.indexOf(eleve)}">${eleve.nom} ${eleve.prenom}</option>`;
    });
}
function refreshMatiere(){
    matiereSelect1.innerHTML = `<option value="">Selectionner une matière</option>`;
    matiereSelect2.innerHTML = `<option value="">Toutes les matieres</option>`;
    for (let i=0; i<tabMatieres.length;i++){
        matiereSelect1.innerHTML +=`<option value="${i}">${tabMatieres[i]} </option>`;
        matiereSelect2.innerHTML +=`<option value="${i}">${tabMatieres[i]} </option>`;
    }
}


//calcul de moyenne lorsque que aucun eleve est selectionné
function calculMoyenneClasse (valueMatiere){
    let somme = 0, nbNotes=0;
    tabDisplayNote.innerHTML = ""
    if(valueMatiere == ""){
        tabEleves.forEach(eleve =>{
            for (let matiere in eleve.matieres){
                for (let note of eleve.matieres[matiere]){
                    somme+=note;
                    nbNotes++;
                    tabDisplayNote.innerHTML += `<tr><td>${eleve.nom}</td> <td>${eleve.prenom}</td> <td>${matiere}</td> <td>${note}</td></tr>`
                }
            }
        })
        
    }
    else {
        let intitule = tabMatieres[Number(valueMatiere)]
        tabEleves.forEach(eleve =>{
                for (let note of eleve.matieres[intitule]){
                    somme+=note;
                    nbNotes++;
                    tabDisplayNote.innerHTML += `<tr><td>${eleve.nom}</td> <td>${eleve.prenom}</td> <td>${intitule}</td> <td>${note}</td></tr>`
                }
        })
    }
    return Math.round((somme/nbNotes)*100)/100;
}
//calcul de moyenne lorsque un eleve est selectionné
function calculMoyenne (indexEleve,valueMatiere){
    let somme =0,nbNotes=0;
    tabDisplayNote.innerHTML = ""
    if(valueMatiere==""){
        for(let matiere in tabEleves[Number(indexEleve)].matieres){
            for (let note of tabEleves[Number(indexEleve)].matieres[matiere]){
                somme+=note;
                nbNotes++;
                tabDisplayNote.innerHTML += `<tr><td>${tabEleves[Number(indexEleve)].nom}</td> <td>${tabEleves[Number(indexEleve)].prenom}</td> <td>${matiere}</td> <td>${note}</td></tr>`
            }
        }
        
    }
    else{
        let intitule = tabMatieres[Number(valueMatiere)]
        for (let note of tabEleves[Number(indexEleve)].matieres[intitule]){
            somme+=note;
            nbNotes++;
            tabDisplayNote.innerHTML += `<tr><td>${tabEleves[Number(indexEleve)].nom}</td> <td>${tabEleves[Number(indexEleve)].prenom}</td> <td>${intitule}</td> <td>${note}</td></tr>`
        }
    }
    return Math.round((somme/nbNotes)*100)/100;
}

function affichageMoyenne (indexEleve,indexMatiere,moyenne){
    if(indexEleve == ""){
        if(indexMatiere == ""){
            displayMoyenne.innerHTML = `La moyenne <b>generale</b> de <b>classe</b> est de <b>${moyenne}</b>`
        }
        else{
            displayMoyenne.innerHTML = `La moyenne <b>${tabMatieres[indexMatiere]}</b> de <b>classe</b> est de <b>${moyenne}</b>`
        }
    }
    else{
        if(indexMatiere == ""){
            displayMoyenne.innerHTML = `La moyenne <b>generale</b> de <b>${tabEleves[indexEleve].nom} ${tabEleves[indexEleve].prenom}</b> est de <b>${moyenne}</b>`
        }
        else{
            displayMoyenne.innerHTML = `La moyenne <b>${tabMatieres[indexMatiere]}</b> de <b>${tabEleves[indexEleve].nom} ${tabEleves[indexEleve].prenom}</b> est de <b>${moyenne}</b>`
        }
    }
}

function selecteurNote(){
    let mean = 0;
    if(eleveSelect2.value == ""){
        mean =calculMoyenneClasse (matiereSelect2.value);
        affichageMoyenne (eleveSelect2.value,matiereSelect2.value,mean);

    }
    else{
        mean = calculMoyenne (eleveSelect2.value,matiereSelect2.value);
        affichageMoyenne (eleveSelect2.value,matiereSelect2.value,mean);
    }
}


//btn display form
btnDisplayEleve.addEventListener('click',()=>{
    testBtnDisplayEleve= affichage(btnDisplayEleve,testBtnDisplayEleve,document.getElementById('form1'));
    displayFormContainer();
});
btnDisplayMatiere.addEventListener('click',()=>{
    testBtnDisplayMatiere= affichage(btnDisplayMatiere,testBtnDisplayMatiere,document.getElementById('form2'));
    displayFormContainer();
});
btnDisplayNote.addEventListener('click',()=>{
    refreshEleve();
    refreshMatiere();
    testBtnDisplayNote= affichage(btnDisplayNote,testBtnDisplayNote,document.getElementById('form3'));
    displayFormContainer();

});

//btn ajout des elements
btnAjoutEleve.addEventListener('click',()=>{
    let prenom = majPremiereLettre([...(inputs[1].value).toLowerCase()]);
    ajoutEleve((inputs[0].value).toUpperCase(),prenom);
    resetInput(0);
    resetInput(1);
});

btnAjoutMatiere.addEventListener('click',()=>{
    let intitule = majPremiereLettre([...(inputs[2].value).toLowerCase()]);
    ajoutMatiere(intitule);
    resetInput(2);
}); 

btnAjoutNote.addEventListener('click',()=>{
    ajoutNote(eleveSelect1.value,matiereSelect1.value,Number(inputs[3].value));
    resetInput(3);
});

//selecteur des notes pour l'affichage/calcul de moyenne
eleveSelect2.addEventListener('change',()=>{
    selecteurNote();

});
matiereSelect2.addEventListener('change',(e)=>{
    selecteurNote();
})

onload = () => {
    refreshEleve();
    refreshMatiere(); 
};