let state = 0;
let currentIndex = 0;
let sections = document.querySelectorAll('section');

let SlidesLocked = 0;

let sectionIndex = 0;
let sectionItems = [];
let currentFloatingItem = null;
let currentFloatingItemIndx = 0;
let currentFloatingItemStartIndx = 0;


function getOffset( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft;
        _y += el.offsetTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}


function scrollSlide(direction) {

    if (direction == 1) {
        currentIndex++;
    } else {
        currentIndex--;
    }

    if (currentIndex < 0) {
        currentIndex = 0;
    }

    if (currentIndex > sections.length - 1) {
        currentIndex = sections.length - 1;
    }



    sections[currentIndex].scrollIntoView({
        behavior: 'smooth'
    });

    console.log("current is", currentFloatingItem, currentFloatingItemIndx, currentIndex);


    if(direction == 1 && currentFloatingItem && currentFloatingItemIndx <= currentIndex){
        console.log("ermoving");;
        currentFloatingItem.classList.remove("fixed");
        currentFloatingItem.style.top = currentFloatingItem.getAttribute('data-top')  + "px";
    }

    

    

    if(direction == 1 && currentFloatingItem && currentFloatingItemIndx > currentIndex && currentFloatingItemStartIndx == currentIndex -1){

        currentFloatingItem.setAttribute('data-top', (getOffset(currentFloatingItem).top - window.scrollY) - currentFloatingItem.offsetHeight); 


        currentFloatingItem.classList.add("fixed");
        currentFloatingItem.style.left = 0 + "px";
        currentFloatingItem.style.top = (getOffset(currentFloatingItem).top - window.scrollY) - currentFloatingItem.offsetHeight + "px";

    }

    if(sections[currentIndex].querySelector('[data-stay]')){
        currentFloatingItem = sections[currentIndex].querySelector('[data-stay]');
    }
    
    



    if(currentFloatingItem){
        console.log("current", currentFloatingItem, currentFloatingItemStartIndx, currentFloatingItemIndx, currentIndex);
        currentFloatingItemIndx = currentFloatingItem.getAttribute('data-stay');    
        currentFloatingItemStartIndx = currentFloatingItem.getAttribute('data-start'); 
    }

    sectionIndex = -1;
    sectionItems = sections[currentIndex].querySelectorAll('.sectionItem');

    sectionItems.forEach(function (item) {
        item.classList.remove('activated');
        item.classList.remove('current');
    })





    console.log(sectionItems);
}





document.addEventListener('keydown', function (e) {


    

    if (e.code == "KeyA") {
        if (SlidesLocked == 0) {
            SlidesLocked = 1;
        } else {
            SlidesLocked = 0;
        }

    }

    if (SlidesLocked == 1) {
        e.preventDefault();
        return;
    }


    let iFrame = document.querySelector('#captions');


    if (e.code == "KeyB") {

        if (state == 0) {
            iFrame.style.bottom = "-60px";
            document.querySelector('#hero').style.height = "calc(100vh - 180px)";
            state = 1;
            return;
        }
        if (state == 1) {
            iFrame.style.bottom = "10px";
            document.querySelector('#hero').style.height = "calc(100vh - 180px)";
            state = 2;
            return;
        }
        if (state == 2) {
            iFrame.style.bottom = "-400px";
            document.querySelector('#hero').style.height = "100vh"
            state = 0;
            return;
        }
    }

    if (e.code == "ArrowDown" || e.code == "PageDown") {

        e.preventDefault();
        if (sectionIndex < sectionItems.length - 1) {
            sectionIndex++;
        }else{
            scrollSlide(1)
            return;
        }
        if (sectionItems.length == 0) {
            scrollSlide(1)
            return;
        }

        sectionItems.forEach(function (item) {
            item.classList.remove('current');
        })


        sectionItems[sectionIndex].classList.add('activated');
        sectionItems[sectionIndex].classList.add('current');

    }

    if (e.code == "ArrowUp" || e.code == "PageUp") {
    e.preventDefault();
        if (sectionIndex > -1) {
            sectionIndex--;
        }else{
            scrollSlide(0)
            return;
        }
        if (sectionItems.length == 0) {
            scrollSlide(0)
            return;
        }

        sectionItems.forEach(function (item) {
            item.classList.remove('current');
        })


        sectionItems[sectionIndex + 1].classList.remove('activated');
        sectionItems[sectionIndex].classList.add('current');



        
    }


    if (e.code == "ArrowLeft") {
        

    }



});
