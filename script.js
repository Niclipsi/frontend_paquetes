const slider = document.querySelector('.slider');

var sectionIndex = 0;

function reset(){
    for(var i = 0; i < slider.children.length; i++){
        slider.children[i].style.opacity = 0;
        slider.children[i].style.zIndex = 0;
    }
}

function desvanecer(){
    reset();
    sectionIndex = sectionIndex + 1 >= slider.children.length ? 0 : sectionIndex + 1;
    slider.children[sectionIndex].style.zIndex = 1;
    slider.children[sectionIndex].style.opacity = 1;
}

setInterval(desvanecer, 10000);