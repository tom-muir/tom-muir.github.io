window.mobileCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

var colors = {
  blue: "rgba(0, 0, 0,",
  green: "rgba(103, 197, 8,",
  pink: "rgba(5, 77, 111,",
  yellow: "rgba(255, 216, 1,"
};
var return_acc = 0.5;

var songs = ["Allen Mock x Chow Chow - Phantom_ZWTvAwbVrjM.mp3"];

var analyser;
var ctx;

function Point(colour) {
  this.x = 0;
  this.y = 0;
  this.xv = (Math.floor(Math.random() * 50 + 1) - 25) / 20;
  this.yv = (Math.floor(Math.random() * 50 + 1) - 25) / 20;

  this.alpha = 0.1;
}

Point.prototype = {
  constructor: Point,

  update_position: function(i) {
    this.x += this.xv * (-i / 50);
    this.y += this.yv * (-i / 50);
  },

  update_velocity: function() {
    if (this.x <= -canvasW / 2) {
      this.xv *= -1;
    }
    if (this.x >= canvasW / 2) {
      this.xv *= -1;
    }

    if (this.y <= -canvasH / 2) {
      this.yv *= -1;
    }
    if (this.y >= canvasH / 2) {
      this.yv *= -1;
    }
  },

  update_alpha: function(hight) {
    this.alpha = hight;
  }
};

canvasW = 0;
canvasH = 0;

var points = [];
var nopoints = 100;
var globalalpha = 0.9;
var context;

var shift = 0;
var shift_direction = 1;

function init() {
  var audio = document.getElementById("audio");
  audio.crossOrigin = "anonymous";
  audio.src = songs[Math.floor(Math.random() * songs.length)];
  audio.load();

  audio.oncanplaythrough = function() {
    if (audio.currentTime == 0) {
      audio.currentTime = 50;

      var AudioContext = window.AudioContext || window.webkitAudioContext;
      context = new AudioContext();
      var src = context.createMediaElementSource(audio);
      analyser = context.createAnalyser();

      src.connect(analyser);
      analyser.connect(context.destination);

      analyser.fftSize = 128;

      var bufferLength = analyser.frequencyBinCount;
      var dataArray = new Uint8Array(bufferLength);

      for (i = 0; i < bufferLength; i++) {
        point = new Point();
        points.push(point);
      }

      canvas = document.getElementById("main");
      canvas.width = document.body.clientWidth;
      canvas.height = document.body.clientHeight;
      canvasW = canvas.width;
      canvasH = canvas.height;

      ctx = document.getElementById("main").getContext("2d");

      ctx.shadowBlur = 10;
      ctx.shadowColor = "white";

      ctx.fillStyle = colors["green"] + globalalpha.toString() + ")";
      ctx.strokeStyle = colors["green"] + globalalpha.toString() + ")";

      ctx.restore();

      var img = new Image();
      img.onload = function() {
        ctx.drawImage(img, canvasW / 2 - 150, canvasH / 2 - 150, 300, 300);
      };
      img.src = "play-button-svgrepo-com.svg";

      function draw() {
        if (shift >= canvasW / 2 - 500) {
          shift_direction = shift_direction * -1;
        } else if (shift <= canvasW / -2 + 500) {
          shift_direction = shift_direction * -1;
        }

        shift = 0;

        canvas.width = document.body.clientWidth;
        canvas.height = document.body.clientHeight;
        canvasW = canvas.width;
        canvasH = canvas.height;

        ctx.globalCompositeOperation = "destination-over";
        ctx.clearRect(0, 0, canvasW, canvasH);

        ctx.fillStyle = colors["blue"] + globalalpha.toString() + ")";
        ctx.strokeStyle = colors["blue"] + globalalpha.toString() + ")";

        analyser.getByteFrequencyData(dataArray);

        for (i = 0; i < points.length; i++) {
          var point = points[i];

          point.update_velocity();
          point.update_position(dataArray[i]);

          ctx.beginPath();
          ctx.arc(
            canvasW / 2 + point.x + (shift * dataArray[i]) / 100,
            canvasH / 2 + point.y + dataArray[i],
            dataArray[i] / 10,
            0,
            Math.PI * 2,
            false
          );
          ctx.fill();
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(
            canvasW / 2 + (shift * dataArray[i]) / 200 + Math.random() * 5,
            canvasH / 2 + dataArray[i] - 275 + Math.random() * 5 ,
            dataArray[i] + 10,
            0,
            Math.PI * 2,
            false
          );
          ctx.stroke();
        }

        var grd = ctx.createLinearGradient(
          0,
          0,
          canvasW * (dataArray[10] / 100),
          canvasH * (dataArray[10] / 100)
        );
        grd.addColorStop(0, colors["yellow"] + globalalpha.toString() + ")");
        grd.addColorStop(1, colors["blue"] + globalalpha.toString() + ")");

        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, canvasW, canvasH);

        window.requestAnimationFrame(draw);
      }
      document.body.addEventListener(
        "click",
        function() {
          if (context.state === "suspended") {
            context.resume();
            audio.play();
            window.requestAnimationFrame(draw);
          } else {
            context.suspend();
          }
        },
        true
      );
    }
  };
}

if (!window.mobileCheck()) {
  init();
}
