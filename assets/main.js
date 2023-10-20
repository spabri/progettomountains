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

// cambia slide ogni 3 secondi
},2000)