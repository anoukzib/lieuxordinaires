if (window.location.protocol != "http:") {
   window.location.protocol = "http:";
   window.location.reload();
}

window.addEventListener('load', function() {

    //console.log("hello");

    let body = document.querySelector("body");

    let filmNav=document.querySelector(".nav__film");
    let filmLink=document.querySelector(".link--films");

    //console.log(filmNav);

    // filmLink.addEventListener("click",function(){
    //     console.log("click link")
    //     filmNav.classList.toggle("open");
    // })

    if(body.classList.contains("home")){
        //console.log("home")
        if(!!window.IntersectionObserver){
            let observer = new IntersectionObserver((entries, observer) => { 
              entries.forEach((entry) => {
              if (entry.intersectionRatio > 0) {
                body.style.background=entry.target.getAttribute("data-color");
              }
              });
            }, {rootMargin: "0px 0px -300px 0px"});
            document.querySelectorAll('.preview').forEach(img => { observer.observe(img) });
          }
          
          else document.querySelector('#warning').style.display = 'block';
    } 
    
    else if(body.classList.contains("page--preview")){
        //console.log("page--preview");
        $('.slick-slider').slick({
            className: "center",
            centerMode: true,
            infinite: true,
            centerPadding: "60px",
            slidesToShow: 2,
            adaptiveHeight : true,
            speed: 50,
            responsive: [
              {
                breakpoint: 800,
                settings: {
                  slidesToShow: 1,
                  centerPadding: "20px",
                }
              },
            ]
          });
    }


    // let container = document.querySelector('.main-container'),
    //     imgs = document.querySelector('.background-container').children,
    //     topPage = false;

    // container.addEventListener('scroll', scroll, {
    //     capture: true,
    //     passive: true
    // });

    // scroll.call(container);

    // function scroll() {
    //     let value = this.scrollTop / window.innerHeight;

    //     //remove auto snap when scroll near end of page
    //     container.classList[value >= imgs.length ? 'add' : 'remove']('proxsnap');

    //     value = Math.round(value - 1);

    //     //if topPage, choose random image
    //     if (value >= 0) {
    //         showImg(value);
    //         topPage = false;
    //     } else if (!topPage) {
    //         value = chooseRandomId(imgs);

    //         showImg(value);
    //         topPage = true;
    //     }
    // }

    // function showImg(i) {
    //     //hide others
    //     for (let img of imgs) {
    //         img.classList.add('hide');
    //     }
        
    //     imgs[Math.min(i, imgs.length - 1)].classList.remove('hide');
    // }

    // function chooseRandomId(arr) {
    //     return ~~(Math.random() * arr.length);
    // }
});

window.addEventListener('beforeunload', function() {
    document.body.classList.add('hide');
});
