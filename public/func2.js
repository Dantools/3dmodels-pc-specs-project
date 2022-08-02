let element=document.querySelector("#epikoinwnia");
var conta=document.querySelector('.form-container');


element.addEventListener('click', function(){
    conta.scrollIntoView({behavior:"smooth"});
})