var images = [];
var images_preload = [];
x = -1;
var sons = [];
var soustitre = document.querySelector(".soustitre");
var txt = document.querySelector(".txt");


var currSound = 0;

var radio = new Howl({
  src: ['src/film1/audio/ChassolBirds.mp3'],
  loop: false,
  format: ['mp3'],
  html5: true,
  volume: 0.9,
});



class Sequence {
  constructor(url, duree, generic, texte, titre) {
    this.url = url;
    this.duree = duree;
    this.texte = texte;
    this.titre = titre;
    this.generic = generic;
  //this.txt = txt;
  // this.txt = document.getElementById("txt");
  //console.log(this.generic);
  //document.getElementById("txt").classList.add("txt")
  }
}

function incrementSoundLoader() {
  soundsLoaded++;
  //console.log("ccc")
  if (soundsLoaded == sounds.length - 1) {
    init();
  }
}

class Son {
  constructor(url, index, srt) {
    this.parsed = [];
    this.url = url;
    this.elSoustitre = document.querySelector(".soustitre");

    this.howl = new Howl({
      src: [url],
      format: ['mp3'],
      html5: true,
      volume: 1,
      loop: false,
    });

    this.howl.on("load", incrementSoundLoader);

    if (srt) {
      this.loadSrt(srt);

    } else {
      //console.log("no subtitles found ... ");
    }
    this.index = index;

  }

  async loadSrt(srt) {
    //console.log("load srt")
    var f = await fetch(srt);
    var text = await f.text();

    this.parsed = window.Subtitle.parse(text);
    this.i = 0;
    this.displayed = false;

    soustitre.style.display = "none";
  }

  drawSubtitle() {
    if (this.parsed.length == 0) return;
    var that = this;
    //console.log(this.parsed)
    if (that.howl.playing()) {

      var elapsed = that.howl.seek() * 1000;
      // console.log(elapsed)
      // console.log(this.parsed[this.i].start)
      // console.log(this.parsed[this.i].end)
      // console.log(this.parsed[this.i].text)

      if (this.parsed[this.i].start < elapsed && elapsed < this.parsed[this.i].end && !this.displayed) {
        this.displayed = true;
        that.elSoustitre.style.display = "inherit";
        that.elSoustitre.innerHTML = this.parsed[this.i].text;
        // console.log("hhhh")

      } else if (elapsed > this.parsed[this.i].end) {

        this.i = (this.i + 1) % this.parsed.length;
        soustitre.style.display = "none";
        this.displayed = false;
      }
    }
  }
}

var timeStart;
var btn = document.querySelector('input');

btn.addEventListener('click', updateBtn);

function updateBtn() {
  if (btn.value === ' ') {
    // btn.value = 'Arrêter la machine';
    // txt.textContent = 'La machine est démarrée !';

  nextImage();
  document.getElementsByClassName("imageResponsive")[0].classList.add("visible");

  var elem = document.getElementById('bouton');
    elem.parentNode.removeChild(elem);
    return false;

  timeStart = new Date().getTime();

  } else {
    btn.value = 'start';
  }
}



function nextImage() {

  x++;
  if (x >= images.length - 1) {
    //console.log("Arrivé à la fin");
    //
    document.location.href = "../filmintro/film_1.html";
  }

  //console.log(x + " : " + (new Date().getTime() - timeStart))

  if (x == 0) {
    document.getElementById("video0").classList.add("transi")
  }

  if (x == (images.length - 6)) {
    sounds[currSound].howl.fade(1, 0, 15000);
    radio.fade(0.6, 0, 8000);
  }

  if (x == 0) {

    radio.play();
    radio.fade(0, 0.4, 8000);
  }

  if (x == (images.length - 1)) {
    document.getElementById("video0").style.opacity = 0;
    document.getElementById("texte").innerHTML = " ";

  } else {
    document.getElementById("video0").style.opacity = 1;
    document.getElementById("video0").src = images[x].url;
    document.getElementById("texte").innerHTML = images[x].texte;
    document.getElementById("titre").innerHTML = images[x].titre;
    document.getElementById("generic").innerHTML = images[x].generic;
    //console.log(images[x].texte);


    if (images[x].texte) {

    } else {
      document.getElementById("texte").innerHTML = " ";

    }

    if (images[x].titre) {

    } else {
      document.getElementById("titre").innerHTML = "";

    }

        if (images[x].generic) {

    } else {
      document.getElementById("generic").innerHTML = "";

    }
    if (x > -1 && x != images.length - 1) setTimeout(nextImage, images[x].duree);
  }

  for (i = 0; i < sounds.length; i++) {

    // console.log(sounds[i].index)
    if (x == sounds[i].index) {
      if (x != 0) {
        sounds[i - 1].howl.mute(true);
      }
      sounds[i].howl.play();
      // sounds[i].howl.fade(0, 0.6, 4000);
      currSound = i;
    }
  }
}

///entracte
// var chroniqueete = "src/entracte/chroniqueete.jpg";
// var lieux = "src/entracte/lieux.jpg";
// var bresson = "src/entracte/RobertBresson1983.jpg";


/////video
var black = "src/film1/rectangle-noir.jpeg";
var batiment = "http://80.147.14.79:9000/mjpg/video.mjpg";
var jeu_enfant = "http://95.161.27.60:80/mjpg/video.mjpg";
var coiffeur = "http://81.149.36.95:8082/mjpg/video.mjpg";
var magasin_interieur = "http://128.206.113.98:80/mjpg/video.mjpg";
var maison_rue = "http://80.56.146.104:83/mjpg/video.mjpg";
var ville2 = "http://217.91.145.152/mjpg/video.mjpg";
var laverie = "http://82.65.5.211:8082/mjpg/video.mjpg";
var bar_interieur = "http://217.128.254.187:8083/mjpg/video.mjpg";
var feteforaine = "http://87.140.122.56/mjpg/video.mjpg"; 
// http://213.219.157.15/mjpg/video.mjpg
var place_bis = "http://83.160.112.104:82/mjpg/video.mjpg"; 
var place_bis_bis = "http://217.24.53.18/cgi-bin/faststream.jpg?stream=half&fps=15&rand=COUNTER";
var rue = "http://136.143.110.66:8083/mjpg/video.mjpg";
var rue_commercante = "http://178.203.165.119:8082/mjpg/video.mjpg";
var rue_commercante_bis = "http://178.203.165.119:8081/mjpg/video.mjpg";
var rue_bis = "http://213.193.89.202/mjpg/video.mjpg";
var tennis = "http://77.161.66.139:81/mjpg/video.mjpg";
var route = "http://131.211.147.34/mjpg/video.mjpg";
var maison = "http://88.64.239.72/jpgmulreq/1/image.jpg?key=1516975535684&lq=1&1586788202";
var place = "http://86.125.16.254/cgi-bin/faststream.jpg?stream=half&fps=15&rand=COUNTER";
var fontaine = "http://217.91.208.210/mjpg/video.mjpg";
var avion = "http://66.193.209.217/mjpg/video.mjpg";
var entree = "http://81.82.250.137:8081/mjpg/video.mjpg";
var couloir = "http://184.74.137.62:81/mjpg/video.mjpg?timestamp=1557478970399";
var ville_montagne = "http://82.150.208.122:82/mjpg/video.mjpg?timestamp=1557481184297";
var montagne = "http://185.73.247.27:8082/mjpg/video.mjpg?camera=1&timestamp=1557479210222";
var aquarium = "http://62.153.147.100:8080/axis-cgi/mjpg/video.cgi?camera=&resolution=640x480";
var village_montagne = "http://80.122.70.154:8000/cgi-bin/faststream.jpg?stream=half&fps=15&rand=COUNTER";
var eglise = "http://85.95.109.23:8081/mjpg/video.mjpg";
var eglise_proche = "http://62.94.90.51:81/mjpg/video.mjpg";
var bar = "http://87.26.209.203/mjpg/video.mjpg";
var monument = "http://89.252.222.121/cgi-bin/faststream.jpg?stream=half&fps=15&rand=COUNTER";
var coin_rue = "http://46.26.42.148:85/mjpg/video.mjpg";
var foot = "http://145.131.75.42/mjpg/video.mjpg";
var mer = "http://86.44.40.201/mjpg/video.mjpg";
var jardin = "http://90.129.229.41:81/mjpg/video.mjpg";
var maison_bis = "http://87.132.111.108:8084/cgi-bin/faststream.jpg?stream=half&fps=15&rand=COUNTER";
var manege = "http://80.11.62.20:1024/mjpg/video.mjpg";
var hotel = "http://158.58.130.148/mjpg/video.mjpg";
var parc = "http://185.18.130.194:8001/mjpg/video.mjpg";
var statue_priere = "http://80.13.120.225:8082/mjpg/video.mjpg";
var route = "http://87.57.111.162/mjpg/video.mjpg";
var marche_proche = "http://93.87.72.254:8090/mjpg/video.mjpg";

//
images.push(new Sequence(black, 1000));
images.push(new Sequence(ville2, 14000));
images.push(new Sequence(batiment, 6000));
images.push(new Sequence(black, 3000, "", "", "Place centrale"));
images.push(new Sequence(bar, 4000));
images.push(new Sequence(bar_interieur, 4000));
//images.push(new Sequence(fontaine, 5000));
images.push(new Sequence(place_bis_bis, 10000));
images.push(new Sequence(marche_proche, 5000));
images.push(new Sequence(jeu_enfant, 3000));
images.push(new Sequence(rue, 5000));
images.push(new Sequence(place, 5000));
images.push(new Sequence(hotel, 4000));
images.push(new Sequence(maison_rue, 5000));
images.push(new Sequence(manege, 7000));
images.push(new Sequence(maison, 5000));
images.push(new Sequence(parc, 3000));
images.push(new Sequence(maison_bis, 5000));
images.push(new Sequence(place_bis, 2000));
images.push(new Sequence(ville2, 3000));
images.push(new Sequence(feteforaine, 4000));
images.push(new Sequence(marche_proche, 5000));
images.push(new Sequence(rue_commercante_bis, 5000));
images.push(new Sequence(foot, 6000));
images.push(new Sequence(eglise, 7000));
images.push(new Sequence(eglise_proche, 7000));
images.push(new Sequence(statue_priere, 4000));
images.push(new Sequence(maison_rue, 5000));
images.push(new Sequence(route, 5000));
images.push(new Sequence(laverie, 5000));
images.push(new Sequence(tennis, 7000));
images.push(new Sequence(rue_bis, 5000));
images.push(new Sequence(entree, 3000));
images.push(new Sequence(jardin, 3000));
images.push(new Sequence(place, 5000));
images.push(new Sequence(ville2, 7000));
images.push(new Sequence(black, 3000));
images.push(new Sequence(black, 4000, "Produit par", "lieuxordinaires.live"));
images.push(new Sequence(black, 4000, "Images", "insecam.org"));
images.push(new Sequence(black, 4000, "Bande-son", "Birds - Chassol"));
images.push(new Sequence(black, 4000, "Lieu de tournage", "Italie, France, Allemagne, Bulgarie"));
images.push(new Sequence(black, 5000));

let sounds = [];
let soundsLoaded = 0;
sounds.push(new Son('src/film1/audio/silence.mp3', 0))
sounds.push(new Son("src/film1/audio/ChroniquedUnEte.mp3", 4, "src/film1/intro_EN.srt"))
sounds.push(new Son("src/film1/audio/ChroniquedUnEte3.mp3", 19, "src/film1/end_EN.srt"))


function draw() {

  for (var i = 0; i < sounds.length; i++) {
    sounds[i].drawSubtitle();
  }
  requestAnimationFrame(draw);
}

draw();
