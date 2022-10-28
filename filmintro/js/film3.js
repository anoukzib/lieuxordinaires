var images = [];
var images_preload = [];
x = -1;
var sons = [];
var soustitre = document.querySelector(".soustitre");
var txt = document.querySelector(".txt");


var currSound = 0;

var bruitRue = new Howl({
  src: ['src/film3/audio/bruitRue.mp3'],
  format: ['mp3'],
  html5: true,
  volume: 0.3,
});




class Sequence {
  constructor(url, duree, generic, texte, titre) {
    this.url = url;
    this.duree = duree;
    this.texte = texte;
    this.titre = titre;
    this.generic = generic;
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
      // console.log("no subtitles found ... ");
    }
    this.index = index;

  }

  async loadSrt(srt) {
    // console.log("load srt")
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

// function init() {
//   nextImage();
//   document.getElementsByClassName("imageResponsive")[0].classList.add("visible")
// }

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
    document.location.href = "../filmintro/film_3.html";
  }

  if (x == 0) {
    document.getElementById("video0").classList.add("transi")
  }

  if (x == (images.length - 8)) {

    setTimeout(function() {
      sounds[currSound].howl.fade(1, 0, 18000);
    });
  }

  if (x == (images.length - 1)) {
    document.getElementById("video0").style.opacity = 0;
    document.getElementById("texte").innerHTML = " ";

    // setTimeout(function() {
    //   sounds[currSound].howl.fade(1, 0, 8000);

    // }, 3000);

  } else {
    document.getElementById("video0").style.opacity = 1;
    document.getElementById("video0").src = images[x].url;
    document.getElementById("texte").innerHTML = images[x].texte;
    document.getElementById("titre").innerHTML = images[x].titre;
    document.getElementById("generic").innerHTML = images[x].generic;
    if (images[x].texte) {

    } else {
      document.getElementById("texte").innerHTML = " ";

    }

    if (images[x].titre) {

    } else {
      document.getElementById("titre").innerHTML = " ";

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
      currSound = i;
    }
  }
}

var black = "src/film3/rectangle-noir.jpeg";
var assemble = "http://217.41.42.231:1024/mjpg/video.mjpg?timestamp=1558006898612";
var patinage = "http://72.36.8.116/mjpg/video.mjpg";
var electrocardio = "http://149.220.61.172/mjpg/video.mjpg";
var usine = "http://153.156.230.207:8081/-wvhttp-01-/GetOneShot?image_size=640x480&frame_count=1000000000";
var usine2 = "http://153.156.230.207:8084/-wvhttp-01-/GetOneShot?image_size=640x480&frame_count=1000000000";
var usine3 = "http://153.156.230.207:8087/-wvhttp-01-/GetOneShot?image_size=640x480&frame_count=1000000000";
var usine4 = "http://153.156.230.207:8089/-wvhttp-01-/GetOneShot?image_size=640x480&frame_count=1000000000";
var usinex4 = "http://132.160.98.215/mjpg/video.mjpg";
var aquarium = "http://98.11.198.177/mjpg/video.mjpg";
var chiffre = "http://192.188.51.47:80/mjpg/video.mjpg";
var beugPaysage = "http://80.153.222.47:50001/cgi-bin/faststream.jpg?stream=half&fps=15&rand=COUNTER";
var antenne = "http://83.239.123.250/mjpg/video.mjpg?timestamp=1557404918111";
var construction = "http://217.6.86.39/mjpg/video.mjpg?timestamp=1558108132908";
var travaux = "http://88.150.15.233/mjpg/video.mjpg?camera=1&timestamp=1557406513187";
var maison_bizarre_pano = "http://161.72.22.244/mjpg/video.mjpg?timestamp=1557407657008";
var maison_bizarre_rapproche = "http://161.72.25.11/mjpg/video.mjpg";
var maison_bizarre_large = "http://150.214.222.100/mjpg/video.mjpg?timestamp=1558021369511";
var maison_bizarre_large_bis = "http://150.214.222.102/mjpg/video.mjpg?camera=1&timestamp=1558021623805";
var maison_bizarre_large_bis_bis = "http://90.152.134.207:8081/mjpg/video.mjpg";
var antenne = "http://83.239.123.252/mjpg/video.mjpg";
var beug = "http://173.160.175.141/mjpg/video.mjpg";
var bouton = "http://37.53.87.83/axis-cgi/mjpg/video.cgi?camera=&resolution=640x480";
var bouda = "http://24.47.99.94/mjpg/video.mjpg";
var plage_arc = "http://66.27.112.65/mjpg/video.mjpg";
var tennis_arc = "http://12.145.136.107/mjpg/video.mjpg";
var antenne_arc = "http://206.230.61.90/mjpg/video.mjpg";
var usine_exterieur = "http://209.142.170.161/cgi-bin/viewer/video.jpg?r=1638473080";
var usine_interieur = "http://173.21.101.78:81/mjpg/video.mjpg";
var autoroute = "http://93.122.229.165:9000/mjpg/video.mjpg";
var route ="http://84.167.85.153/mjpg/video.mjpg";
var arc_en_ciel = "http://216.201.154.36:81/mjpg/video.mjpg";
var billboard = "http://174.90.224.128:8080/mjpg/video.mjpg";
var immeuble_color = "http://185.76.109.218:8080/mjpg/video.mjpg";
var ecran_cardio = "http://217.119.144.24/mjpg/video.mjpg";
var pont ="http://94.30.51.166:50000/mjpg/video.mjpg";
var parking_usine ="http://91.210.204.243/mjpg/video.mjpg";
var counter ="http://88.84.34.38/cgi-bin/viewer/video.jpg?r=COUNTER";
var remonte_mecanique_ski ="http://80.88.123.92/mjpg/video.mjpg";
var cable ="http://130.79.48.23/mjpg/video.mjpg";
var tunnel = "http://92.244.232.46:91/mjpg/video.mjpg";
var ecran_ordi = "http://137.229.53.64/mjpg/video.mjpg";
var machine = "http://2.139.200.170:1024/video/mjpg.cgi";
var concert = "http://80.232.164.51/cgi-bin/faststream.jpg?stream=half&fps=15&rand=COUNTER";


images.push(new Sequence(maison_bizarre_large, 2000));
images.push(new Sequence(maison_bizarre_pano, 3000));
images.push(new Sequence(maison_bizarre_large_bis, 2000));
images.push(new Sequence(antenne, 3000));
images.push(new Sequence(usine, 7000));
images.push(new Sequence(black, 3000, "", "","Arcos Iris"));
images.push(new Sequence(electrocardio, 3000));
images.push(new Sequence(beugPaysage, 3000));
images.push(new Sequence(usine_exterieur, 3000));
images.push(new Sequence(plage_arc, 8000));
images.push(new Sequence(assemble, 3000));
images.push(new Sequence(aquarium, 4000));
images.push(new Sequence(antenne_arc, 4000));
images.push(new Sequence(electrocardio, 2000));
images.push(new Sequence(parking_usine, 4000));
images.push(new Sequence(usine2, 9000));
images.push(new Sequence(usine_interieur, 3000));
images.push(new Sequence(maison_bizarre_pano, 5000));
images.push(new Sequence(electrocardio, 1000));
images.push(new Sequence(maison_bizarre_large_bis_bis, 3000));
images.push(new Sequence(immeuble_color, 3000));
images.push(new Sequence(beug, 3000));
images.push(new Sequence(maison_bizarre_large, 6000));
images.push(new Sequence(arc_en_ciel, 3000));
images.push(new Sequence(cable, 3000));
images.push(new Sequence(tunnel, 3000));
// images.push(new Sequence(tennis_arc, 8000));
images.push(new Sequence(usine4, 5000));
images.push(new Sequence(route, 3000));
images.push(new Sequence(autoroute, 4000));
images.push(new Sequence(pont, 4000));
images.push(new Sequence(concert, 4000));
images.push(new Sequence(ecran_ordi, 4000));
images.push(new Sequence(maison_bizarre_large_bis, 2000));
images.push(new Sequence(usine, 7000));
images.push(new Sequence(billboard, 4000));
images.push(new Sequence(antenne, 2000));
images.push(new Sequence(ecran_cardio, 3000));
images.push(new Sequence(remonte_mecanique_ski, 3000));
images.push(new Sequence(counter, 5000));
images.push(new Sequence(maison_bizarre_pano, 3000));
images.push(new Sequence(machine, 3000));
images.push(new Sequence(assemble, 2000));
images.push(new Sequence(patinage, 6000));
images.push(new Sequence(usine4, 5000));
images.push(new Sequence(black, 2000));
images.push(new Sequence(black, 3000, "Produit par", "lieuxordinaires.live"));
images.push(new Sequence(black, 3000, "Images", "insecam.org"));
images.push(new Sequence(black, 3000, "Musique", "<i> Arcos iris </i> Flavien Berger, Étienne Jaumet"));
images.push(new Sequence(black, 3000, "Lieux de tournage","Allemagne, Espagne, France, Japon, Russie"));
images.push(new Sequence(black, 4000));


let sounds = [];
let soundsLoaded = 0;

//sounds.push(new Son('http://chai5she.lb.vip.cdn.dvmr.fr/francemusiquelacontemporaine-hifi.mp3', 0))
sounds.push(new Son('src/film3/audio/flavien-berger-etienne-jaumet-arco-iris.mp3', 0))

function draw() {

  for (var i = 0; i < sounds.length; i++) {
    sounds[i].drawSubtitle();
  }
  requestAnimationFrame(draw);
}

draw();
