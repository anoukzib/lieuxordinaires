var images = [];
var images_preload = [];
x = -1;
var sons = [];
var soustitre = document.querySelector(".soustitre");
var txt = document.querySelector(".txt");


var currSound = 0;

var voix = new Howl({
  src: ['src/film2/audio/islande_temoignage02.mp3'],
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
  //this.txt = txt;
  // this.txt = document.getElementById("txt");
  console.log(this.url);
  //document.getElementById("txt").classList.add("txt")
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
    if (srt) {
      this.loadSrt(srt);

    } else {
      console.log("no subtitles found ... ");
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
    document.location.href = "../filmintro/film_2.html";
  }


  if (x == 0) {
    document.getElementById("video0").classList.add("transi")
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
    console.log(images[x].texte);


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

var black = "src/film2/rectangle-noir.jpeg";
var ville = "http://213.181.118.210/mjpg/video.mjpg";
var maison = "http://82.73.97.26/mjpg/video.mjpg?camera=1&timestamp=1557409283210";
var ville_maison = "http://212.30.240.7/mjpg/video.mjpg";
var village = "http://157.157.138.235/mjpg/video.mjpg?timestamp=1558087419722";
var montagne = "http://37.205.34.130/mjpg/video.mjpg";
var port = "http://213.167.135.161/mjpg/video.mjpg";
var port_bis = "http://213.167.135.169/mjpg/video.mjpg";
var maison_perdue = "http://94.139.67.154:50000/mjpg/video.mjpg?timestamp=1558103018324";
var maison_port = "http://85.93.226.222:8081/mjpg/video.mjpg";
var paysage = "http://185.179.77.110:8080/GetData.cgi?CH=1";
var port2 = "http://31.209.240.244/mjpg/video.mjpg";
var maison_paysage = "http://31.128.222.218:8888/mjpg/video.mjpg";
var port3 = "http://212.30.221.176:8080/mjpg/video.mjpg";
var montagne_fixe= "http://88.149.63.131:83/cgi-bin/viewer/video.jpg?r=1637507261";
var remonte_mecanique = "http://157.157.222.184:81/mjpg/video.mjpg";



images.push(new Sequence(black, 1000));
images.push(new Sequence(black, 3000, "", "", "Islande, tout au nord"));
images.push(new Sequence(village, 6000));
images.push(new Sequence(ville, 2000));
images.push(new Sequence(montagne, 10000));
images.push(new Sequence(port, 4000));
images.push(new Sequence(port_bis, 3000));
images.push(new Sequence(port, 2000));
images.push(new Sequence(ville_maison, 6000));
images.push(new Sequence(village, 10000));
images.push(new Sequence(montagne_fixe, 3000));
images.push(new Sequence(maison_port, 4000));
images.push(new Sequence(port2, 13000));
images.push(new Sequence(paysage, 7000));
images.push(new Sequence(port3, 6000));
images.push(new Sequence(remonte_mecanique, 3000));
images.push(new Sequence(montagne, 3000));
images.push(new Sequence(black, 2000));
images.push(new Sequence(black, 3000, "Produit par", "lieuxordinaires.live"));
images.push(new Sequence(black, 3000, "Images", "insecam.org"));
images.push(new Sequence(black, 3000, "Voix-off","Témoignage d'Ava Olafson"));
images.push(new Sequence(black, 3000, "Lieu de tournage","Islande"));
images.push(new Sequence(black, 3000));

let sounds = [];
sounds.push(new Son('src/film2/audio/silence.mp3', 0));
sounds.push(new Son("src/film2/audio/islande_temoignage02.mp3", 2));


function draw() {

  for (var i = 0; i < sounds.length; i++) {
    sounds[i].drawSubtitle();
  }
  requestAnimationFrame(draw);
}

draw();
