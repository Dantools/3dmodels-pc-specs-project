let element=document.querySelector("#epikoinwnia");
var conta=document.querySelector('.form-container');
let protaseis=document.querySelector("#protaseis");
var more=document.querySelector('.parallax');

element.addEventListener('click', function(){
    conta.scrollIntoView({behavior:"smooth"});
})

let back=document.querySelector(".top");
let carousel=document.querySelector("#carouselph");


back.addEventListener('click', function(){
    carousel.scrollIntoView({behavior:"smooth"});
    console.log("clicked")
})

protaseis.addEventListener('click', function(){
    more.scrollIntoView({behavior:"smooth"});
})