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
  volume: 0.6,
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
  console.log(this.generic);
  //document.getElementById("txt").classList.add("txt")
  }
}

function incrementSoundLoader() {
  soundsLoaded++;
  console.log("ccc")
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
      volume: 0.9,
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
    console.log("Arrivé à la fin");
    //
    document.location.href = "../filmintro/film_1.html";
  }

  console.log(x + " : " + (new Date().getTime() - timeStart))

  if (x == 0) {
    document.getElementById("video0").classList.add("transi")
  }

  if (x == (images.length - 5)) {
    sounds[currSound].howl.fade(1, 0, 8000);
    radio.fade(0.6, 0, 8000);
  }

  if (x == 0) {

    radio.play();
    radio.fade(0, 0.6, 8000);
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
var otarie_360 = "http://64.251.74.45/-wvhttp-01-/GetOneShot?image_size=640x480&frame_count=1000000000";
var rue_proche = "http://23.246.89.122:81/mjpg/video.mjpg";
var eglise_interieur = "http://74.142.49.38:8001/mjpg/video.mjpg";
var lac_immeuble_haut_large = "http://64.223.67.219/mjpg/video.mjpg";
var port_360 = "http://50.248.29.158/mjpg/video.mjpg";
var ville_mer_360 = "http://206.40.97.180/mjpg/video.mjpg";
var ville_bulding_large = "http://192.206.48.49/mjpg/video.mjpg";
var village_mer = "http://216.25.186.19/mjpg/video.mjpg";
var parc_enfant = "http://166.155.71.82:8080/mjpg/video.mjpg";
var zone_indus = "http://192.251.94.203/mjpg/video.mjpg";
var immeuble_haut = "http://166.159.2.218/-wvhttp-01-/GetOneShot?image_size=640x480&frame_count=1000000000";
var route_universite = "http://192.149.109.245:8000/-wvhttp-01-/GetOneShot?image_size=640x480&frame_count=1000000000";
var skatepark = "http://166.251.68.71/-wvhttp-01-/GetOneShot?image_size=640x480&frame_count=1000000000";
var usine_exterieur = "http://209.142.170.161/cgi-bin/viewer/video.jpg?r=1638306278";
var autoroute = "http://75.109.245.42:8001/mjpg/video.mjpg";
var maison_montagne = "http://162.245.149.142/-wvhttp-01-/GetOneShot?image_size=640x480&frame_count=1000000000";
var gros_batiment_haut = "http://136.142.166.244/-wvhttp-01-/GetOneShot?image_size=640x480&frame_count=1000000000";
var pavillon_proche = "http://166.165.50.72:8081/-wvhttp-01-/GetOneShot?image_size=640x480&frame_count=1000000000";
var route_proche = "http://162.249.148.59:8000/mjpg/video.mjpg";
var rue_proche_bis = "http://184.153.48.37:81/mjpg/video.mjpg";
var rue_proche_bis_bis = "http://184.153.48.37:82/mjpg/video.mjpg";
var ville_large = "http://96.94.90.35/mjpg/video.mjpg";
var ville_monument = "http://24.97.151.11/mjpg/video.mjpg";
var couloir_proche = "http://184.74.137.62:84/mjpg/video.mjpg";
var usine_interieur = "http://173.21.101.78:81/mjpg/video.mjpg";
var route_pavillon = "http://166.152.57.86/-wvhttp-01-/GetOneShot?image_size=640x480&frame_count=1000000000";
var route_pavillon_bis = "http://166.149.183.30/-wvhttp-01-/GetOneShot?image_size=640x480&frame_count=1000000000";
var plage_arc = "http://66.27.112.65/mjpg/video.mjpg";
var tennis_arc = "http://12.145.136.107/mjpg/video.mjpg";
var usine = "http://153.156.230.207:8081/-wvhttp-01-/GetOneShot?image_size=640x480&frame_count=1000000000";
var usine2 = "http://153.156.230.207:8084/-wvhttp-01-/GetOneShot?image_size=640x480&frame_count=1000000000";
var usine3 = "http://153.156.230.207:8087/-wvhttp-01-/GetOneShot?image_size=640x480&frame_count=1000000000";
var usine4 = "http://153.156.230.207:8089/-wvhttp-01-/GetOneShot?image_size=640x480&frame_count=1000000000";
var usinex4 = "http://132.160.98.215/mjpg/video.mjpg";
var billboard = "http://184.174.148.205:8001/mjpg/video.mjpg";
var aquarium = "http://98.11.198.177/mjpg/video.mjpg";

//
images.push(new Sequence(black, 1000));
images.push(new Sequence(black, 3000, "", "", "Arcos Iris"));
images.push(new Sequence(black, 1000));
images.push(new Sequence(ville_bulding_large, 10000));
images.push(new Sequence(gros_batiment_haut, 6000));
images.push(new Sequence(pavillon_proche, 4000));
images.push(new Sequence(skatepark, 5000));
images.push(new Sequence(rue_proche_bis_bis, 5000));
images.push(new Sequence(rue_proche_bis, 5000));
images.push(new Sequence(couloir_proche, 5000));
images.push(new Sequence(aquarium, 5000));
images.push(new Sequence(immeuble_haut, 5000));
images.push(new Sequence(rue_proche, 5000));
images.push(new Sequence(ville_bulding_large, 9000));
images.push(new Sequence(route_universite, 3000));
images.push(new Sequence(parc_enfant, 3000));
images.push(new Sequence(immeuble_haut, 5000));
images.push(new Sequence(billboard, 5000));
images.push(new Sequence(autoroute, 3000));
images.push(new Sequence(route_pavillon, 5000));
images.push(new Sequence(route_pavillon_bis, 3000));
images.push(new Sequence(usine_exterieur, 3000));
images.push(new Sequence(usine, 3000));
images.push(new Sequence(usine2, 7000));
images.push(new Sequence(usine_exterieur, 3000));
images.push(new Sequence(route_proche, 3000));
images.push(new Sequence(ville_large, 3000));
images.push(new Sequence(ville_monument, 3000));
images.push(new Sequence(pavillon_proche, 5000));
images.push(new Sequence(tennis_arc, 3000));
images.push(new Sequence(eglise_interieur, 3000));
images.push(new Sequence(route_proche, 3000));
images.push(new Sequence(route_pavillon_bis, 3000));
images.push(new Sequence(route_pavillon, 5000));
images.push(new Sequence(autoroute, 3000));
images.push(new Sequence(route_pavillon_bis, 3000));
images.push(new Sequence(route_pavillon, 5000));
images.push(new Sequence(lac_immeuble_haut_large, 3000));
images.push(new Sequence(ville_mer_360, 3000));
images.push(new Sequence(village_mer, 3000));
images.push(new Sequence(port_360, 3000));
images.push(new Sequence(otarie_360, 3000));
images.push(new Sequence(black, 3000));
images.push(new Sequence(black, 4000, "Produit par", "lieuxordinaires.live"));
images.push(new Sequence(black, 4000, "Imagies", "insecam.org"));
images.push(new Sequence(black, 4000, "Bande-son", "Birds by Chassol"));
images.push(new Sequence(black, 4000, "Lieu de tournage", "Italie, France, Allemagne, Bulgarie et Russie"));
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
