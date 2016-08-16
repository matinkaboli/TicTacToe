var paint;
var content;
var win;
var turn = 0;
var zero = 0;

window.onload = () => {
    draw();
    paint = new Array();
    content = new Array();
    win = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

    for (var i = 0; i < 9; i++) {
        paint[i] = false;
        content[i] = '';
    }
}

function draw () {
  var body = document.getElementsByTagName('body')[0];
  for (var i = 0; i < 9; i++) {
    var x = document.createElement('canvas');
    x.height = 50;
    x.width = 50;
    x.style.border = '1px solid black';
    x.id = 'canvas' + i;

    var make = (min) => {
      return () => {
        Click(min);
      };
    };
    x.onclick = make(i);

    body.appendChild(x);
    if (i == 2 || i == 5){
      var br = document.createElement('br');
      body.appendChild(br);
    }

  }
}

function Click(num) {
    var canvas = 'canvas' + num;
    var c = document.getElementById(canvas);
    var cxt = c.getContext('2d');

    if (paint[num] == false) {
        if (turn % 2 == 0) {
            cxt.beginPath();
            cxt.moveTo(15, 15);
            cxt.lineTo(30, 30);
            cxt.moveTo(30, 15);
            cxt.lineTo(15, 30);
            cxt.stroke();
            cxt.closePath();
            content[num] = 'X';
        } else {
          cxt.beginPath();
          cxt.arc(25, 25, 8, 0, Math.PI*2, true);
          cxt.stroke();
          cxt.closePath();
          content[num] = 'O';
        }

        turn++;
        paint[num] = true;

        zero++;
        checkWin(content[num]);

        if(zero == 9) {
            alert('Game Over');
            location.reload(true);
        }
    } else {
        alert('No, here is full :|');
    }
}

function checkWin(s) {
    for (var a = 0; a < win.length; a++) {
        if(content[win[a][0]] == s && content[win[a][1]] == s && content[win[a][2]] == s) {
            alert(s + ' won!');
            location.reload(true);
        }
    }
}
