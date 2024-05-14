var preload = document.getElementById("preload");
var wrapp = document.getElementById("wrapp");
var playerName = document.getElementById("playerName");
var startBtn = document.getElementById("startBtn");
var sec = document.getElementById("sec");
var clicks = document.getElementById("clicks");
var icons = [
  "one.png",
  "two.png",
  "three.png",
  "four.png",
  "five.png",
  "six.png",
  "seven.png",
  "eight.png",
  "one.png",
  "two.png",
  "three.png",
  "four.png",
  "five.png",
  "six.png",
  "seven.png",
  "eight.png",
];
var back = document.getElementsByClassName("back");
var front = document.getElementsByClassName("front");
var boxes = document.getElementsByClassName("boxes");
var turned = 0;
var turnedArr = [];
var hit = [];
sec.innerHTML = 30;
var clicksCounter = 0;
clicks.innerHTML = clicksCounter;
var time = 0;
var result = 0;

// ON LOAD
window.addEventListener("load", function () {
  preload.innerHTML += `<div id="logInBgr">
		<div id="logInData">
			<label for="logInName">Enter your name: </label>
			<input type="text"  id="logInName">
			<button type="button" data-toggle="modal" data-target="#score">
  				Scores
			</button>
			<button type="button" id="play">Lets play</button>
			<button type="button" data-toggle="modal" data-target="#rules">
  				Rules
			</button>
		</div>
	</div>
	<div class="modal fade" id="score" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	          <span aria-hidden="true">&times;</span>
	        </button>
	      </div>
	      <div class="modal-body">
	       Best scores
	       <ul>
				<li>1) 870</li>
				<li>2) 520</li>
				<li>3) 350</li>
				<li>4) 200</li>
				<li>5) 100</li>
	       </ul>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-secondary rounded-0" data-dismiss="modal">Close</button>
	      </div>
	    </div>
	  </div>
	</div>

	<div class="modal fade" id="rules" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        The memory game.........
        <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima accusantium porro similique aperiam exercitationem illum itaque quo, sunt eum, quis aspernatur, perspiciatis, ut. Sapiente omnis aperiam excepturi, iusto blanditiis qui?</div><div>Doloremque in atque veritatis illum pariatur ipsa dolor odio inventore, a nemo quisquam obcaecati velit eius, vel illo dignissimos ex quis voluptatem magni? Aliquid rerum maxime nulla temporibus doloremque reiciendis!</div><div>Odio quibusdam, recusandae assumenda beatae a quod! Eum vero velit laboriosam magnam deserunt ratione alias quasi? Quasi doloribus autem omnis quaerat animi alias, nostrum ipsum tempore a, officiis et. Accusamus?</div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary rounded-0" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
	`;
  var play = document.getElementById("play");
  play.addEventListener("click", function () {
    var logInName = document.getElementById("logInName");
    if (logInName.value != "") {
      playerName.innerHTML = logInName.value;
      preload.style.display = "none";
      makeBoxes();
    }
  });
});
// make boxes
function makeBoxes() {
  startBtn.addEventListener("click", startGame);
  for (let i = 0; i < 16; i++) {
    var rand = Math.floor(Math.random() * icons.length);
    wrapp.innerHTML += `
		<div class="boxes position-relative" id=${i}>
			<div class="front position-absolute"></div>
				
			<div class="back position-absolute text-center">
				<img src="css/images/level1/${icons[rand]}" alt="icons"></div>
			</div>
		</div>
		`;
    icons.splice(rand, 1);
  }
}
// START game
function startGame() {
  var loop = setInterval(function () {
    sec.innerHTML--;
    if (sec.innerHTML == 0) {
      clearInterval(loop);
      for (var i = 0; i < boxes.length; i++) {
        boxes[i].removeEventListener("click", clikcFn);
      }
    } else if (hit.length == 16) {
      clearInterval(loop);
      bonus();
    }
  }, 1000);

  startBtn.removeEventListener("click", startGame);

  addClicks();

  function addClicks() {
    for (var i = 0; i < boxes.length; i++) {
      boxes[i].addEventListener("click", clikcFn);
    }
    for (var i = 0; i < hit.length; i++) {
      hit[i].removeEventListener("click", clikcFn);
    }
  }

  function clikcFn() {
    turned++;
    turnedArr.push(this);
    clicksCounter++;
    clicks.innerHTML = clicksCounter;

    this.childNodes[3].style.transform = "rotateY(0)";
    this.removeEventListener("click", clikcFn);

    if (turned == 2 && sec.innerHTML != 0) {
      checkTwo();
    }
  }

  function checkTwo() {
    for (var i = 0; i < boxes.length; i++) {
      boxes[i].removeEventListener("click", clikcFn);
    }
    if (turnedArr[0].innerHTML == turnedArr[1].innerHTML) {
      sec.innerHTML = parseInt(sec.innerHTML) + 5;
      hit.push(turnedArr[0]);
      hit.push(turnedArr[1]);

      turnedArr.length = 0;
      turned = 0;
      addClicks();
    } else {
      setTimeout(function () {
        if (turned == 2 && sec.innerHTML == 0) {
          for (var i = 0; i < boxes.length; i++) {
            boxes[i].removeEventListener("click", clikcFn);
          }
        } else {
          turnedArr[0].childNodes[3].style.transform = "rotateY(180deg)";
          turnedArr[1].childNodes[3].style.transform = "rotateY(180deg)";

          turned = 0;
          turnedArr.length = 0;
          addClicks();
        }
      }, 500);
    }
  }
  function bonus() {
    if (sec.innerHTML < 15) {
      result += 10;
    } else if (sec.innerHTML < 30) {
      result += 25;
    } else if (sec.innerHTML < 45) {
      result += 50;
    } else if (sec.innerHTML < 60) {
      result += 75;
    } else if (sec.innerHTML < 75 || sec.innerHTML > 75) {
      result += 100;
    }
    if (clicksCounter == 16) {
      result += 100;
    } else if (clicksCounter < 25) {
      result += 75;
    } else if (clicksCounter < 30) {
      result += 50;
    } else if (clicksCounter < 40) {
      result += 25;
    } else if (clicksCounter < 50 || clicksCounter > 50) {
      result += 10;
    }
    console.log(result);
    console.log(clicksCounter);
  }
} // end START game function
