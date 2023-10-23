//CAROSELLO

// variabili per immagini e titoli

const images = [

    {
        image: '/media/header-1.jpg',
        title: '<h1>Live <span>Wonderful</span> life</h1>',
        
    }, {
        image: '/media/header-2.jpg',
        title: '<h1>Perfect <span>Vacation</span> Place</h1>',
        
    }, {
        image: '/media/header-3.jpg',
        title: '<h1>The <span>Hideaway</span> Inn</h1>',
        
    }, {
        image: '/media/header-4.jpg',
        title: '<h1>Live <span>Wonderful</span> Life</h1>',
        
    }, {
        image: '/media/header-5.jpg',
        title: '<h1>Perfect <span>Vacation</span> Place</h1>',
        
    }
];


//selezione carosello

let carosello = document.querySelector('.imgTextContainer')
//ciclo for per inserire immagini

for (let i=0;i<images.length; i++){
    carosello.innerHTML += `<div class="slide">
                                <div class="imgAbsolute">
                                    <img src="${images[i].image}">
                                </div>
                                <div class="col-12 testoTitolo text-center">
                                    <h5>west virginia / united states</h5>
                                    ${images[i].title}
                                </div>
                            </div>`
}
//tutti i div con classe slide
const allSlide=document.querySelectorAll('.slide')

//aggiungi classe current al valore 0(prima immagine)

allSlide[0].classList.add('current')

let current = 0;

//ciclo infinito carosello

setInterval(function(){
    //rimuovi classe slide dalla slide corrente
    allSlide[current].classList.remove('current');

    //se su ultima slide
    if (current==allSlide.length-1){
    //torna a slide 0
    current=0;
    }else{
        current= current+1
    }

    //aggiungi classe current alla slide
    allSlide[current].classList.add('current');

// cambia slide ogni 5 secondi
},5000)

// FRECCETTE**********************************************************

const nextArrow = document.querySelector('.next');
const previousArrow = document.querySelector('.previous');


nextArrow.addEventListener('click', // quando clicco su nextArrow:

        function() {
         
        // rimuovo current dalla slide corrente  

        allSlide[current].classList.remove('current');

        //se quando clicco sono sull'ultima slide:

        if (current == allSlide.length - 1) {

        //torna alla slide 0

            current = 0;
    
        //altrimenti:

        } else {
        
        //Scorri sulla slide succesiva
            current = current + 1;

        }

        //e infine, aggiungi la classe current alla slide

        allSlide[current].classList.add('current');    
    }


);


//Quando clicco su PREVIOUS arrow:

previousArrow.addEventListener('click',

        function() {
            
            // rimuovo current dalla slide corrente  

            allSlide[current].classList.remove('current');

            // SE ci troviamo sull'ultima slide, torna alla slide 0

            if (current == allSlide.length - 5) {

                current = allSlide.length - 1            
            }

            //ALTRIMENTI:

            else {
            
            // procedi alla slide precedente
            
                current = current -1;
            } 

            //e infine, aggiungi la classe current alla slide

            allSlide[current].classList.add('current');

        }

)



//SCROLL TO SECTION 1*****************

let scrollToSection1 = document.querySelector("#scrollToSection1")

scrollToSection1.addEventListener("click",()=>{
    window.location.href = '#section1';
})

window.addEventListener('scroll', ()=>{
    let scrolled = window.scrollY
    if(scrolled > 300){
     navbar.classList.add('navbarScroll')
    }else{
     navbar.classList.remove('navbarScroll')
    }
 })



//  

fetch('./assets/destinazioni.json').then((response)=>response.json()).then((data)=>{
    //ordinare gli elementi in base al prezzo, dal più piccolo al più grande utilizzando il metodo sort per un array numerico
    data.sort((a,b)=> a.price-b.price)

    //catturiamo lo spazio per i radio btn
    let inputCategory = document.querySelector('#inputCategory');
    //catturiamo il container vuoto dove andranno tutti gli annunci
    let containerCard = document.querySelector('#containerCard');


    //creiamo in modo dinamico i radiobtn per filtrare le categorie
    function radioCreate (){
        //creiamo un array con solo le categorie del file json, ma ci sono anche le ripetizione
        let destinations = data.map((annuncio)=>annuncio.travel_destination);
        //il Set restituisce un simil-array che elimina le ripetizioni
        let uniqueCategories = new Set(destinations);
        //per ogni categoria(elemento presente nel Set) creiamo un div dinamico che appendiamo al div con id inputCategory
        uniqueCategories.forEach((destination)=>{
            let div = document.createElement('div');
            //all'inteno del div inseriamo un contenuto che è il radio btn con il suo nome
            div.innerHTML = `
            <input class="form-check-input" type="radio" name="travel_destination" id="${destination}">
            <label class="form-check-label" for="${destination}">
            ${destination}
            </label>`;
            //appendiamo questi elementi astratti all'interno del div
            inputCategory.appendChild(div)
        })

    }
    radioCreate()

    //creiamo la funzione per mostrare gli annunci(tutte le card di tutti gli annunci)
    function showCards(array){
        //per ogni annuncio crea un div
        array.forEach((annuncio)=>{
            //per ogni oggetto creiamo un div
            let div = document.createElement('div')
            //aggiungiamo delle classi per dargli dello spazio
            div.classList.add('col-6','col-md-3','py-1')
            //aggiungiamo un contenuto con l'immagine, il nome, la categoria e un prezzo

            div.innerHTML=`
            <div class="contenitoreImmagine">
                            <img src="${annuncio.landscape_photo}" class="">
                        </div>
                        <h2 class="text-dark">${annuncio.apartment_name}</h2>
                        <p class="text-dark">${annuncio.travel_destination}</p>
                        <p class="text-dark">€ ${annuncio.apartment_price}</p>`





            // div.innerHTML=`
            // <img src="${annuncio.landscape_photo}" class="img-fluid">
            // <h2 class="text-dark">${annuncio.apartment_name}</h2>
            // <p class="text-dark">${annuncio.travel_destination}</p>
            // <p class="text-dark"> € ${annuncio.apartment_price}</p>`
            //le appendiamo a containerCard
            containerCard.appendChild(div)
            

        })
        
    }
    //visualizziamo tutti gli oggetti
    showCards(data)

    //creiamo la funzione per filtrare le categorie(compresa quella che ha id All, quindi tutte le categorie)

    function filterByCategories (categoria){
        //se la formalCategory è diversa da All(una qualsiasi delle categorie generate da radioCreate, tranne "tutte le categorie")
        if (categoria != 'All'){
            //filtra le categorie mostrandomi quelle uguali a category
            let filtered= data.filter((annuncio)=>annuncio.travel_destination == categoria)
            //svuota il contenitore
            containerCard.innerHTML=``
            //mostrami le card filtrate
            showCards(filtered)
        }else{
            //altrimenti mostrami tutte le card
            showCards(data)
        }

    }

    //non invochiamo la funzione perché filterByCategories deve funzionare al click

    //catturiamo i vari radio btn tramite la classe
    let radioBtn = document.querySelectorAll(".form-check-input")
    //per ogni radioBtn
    radioBtn.forEach((btn)=>{
        //al click
        btn.addEventListener('click',()=>{
            //filterByCategories in base all'id del btn (che è presente dinamicamente)
            filterByCategories(btn.id)
        })
    })

    //*******PREZZO***************/
    //catturiamo input e label
    let priceInput = document.querySelector('#priceInput')
    let priceValue = document.querySelector('#priceValue')

    //creiamo la funzione che mostra il prezzo aggiornato nella label

    function setPriceInput(){
        //creiamo una variabile che contiene solo i valori che fanno riferimento al prezzo(che nel file json sono delle stringhe, quindi vanno riconvertiti in numeri)
        let prices = data.map((annuncio)=> annuncio.apartment_price)
        //riordiniamo i prezzi dal più piccolo al più grande, ma l'abbiamo già fatto all'inizio della fetch
        prices.sort((a,b)=>a - b)
        //creiamo una variabile col prezzo maggiore, essendo i numeri ordinati possiamo prendere l'ultimo elemento dell'array
        let maxPrice = prices.pop()
        //riassegniamo questo valore a priceInput e priceValue. max e value sono degli attributi impliciti dei campi di input(come label)
        priceInput.max = maxPrice
        //
        priceInput.value= maxPrice
        //vediamo sulla label l'ultimo elemento di price(che è il piu alto)
        priceValue.innerHTML = maxPrice
    }
    //richiamare le funzioni
    setPriceInput()
    function filterByPrice(){
        //filtra gli annunci che hanno prezzo inferiore al valore di priceInput
        let filtered = data.filter((annuncio)=> annuncio.apartment_price<= priceInput.value)
        //puliamo
        containerCard.innerHTML =``
        showCards(filtered)

    }
    priceInput.addEventListener('input',()=>{
        //quando spostiamo il cursore aggiorna la label
        priceValue.innerHTML = priceInput.value
        //e mostra gli elementi che hanno prezzo inferiore a priceInput.value utilizzando la funzione di filterByPrice
        filterByPrice()
    })




})
