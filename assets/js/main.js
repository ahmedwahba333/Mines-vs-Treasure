// start set in localstorage in index.html

let myName = document.getElementById("myName");
let result = {
  myName: "",
  score: 0,
  level: "",
};
function start() {
  let myLevel = document.getElementById("myLevel");
  let myLevelSelected = myLevel.options[myLevel.selectedIndex].value;
  if (myName.value != "" && myLevelSelected != "select") {
    result.myName = myName.value;
    result.level = myLevelSelected;
    localStorage.setItem("result", JSON.stringify(result));
    window.location.href = "./game.html";
  } else {
    let errorName = "please insert your name";
    document.getElementById("myErrorName").innerHTML = `<p>${errorName}</p>`;
    let errorLevel = "please select the Level";
    document.getElementById("myErrorLevel").innerHTML = `<p>${errorLevel}</p>`;
  }
}
// end set in localstorage in index.html

if (window.location.pathname == "/game.html") {
  let getNameScore = JSON.parse(localStorage.getItem("result"));
  myName.innerText = getNameScore["myName"];
  let myScore = document.getElementById("myScore");
  myScore.innerText = 100;

  let myImg = document.querySelectorAll(".myImg");
  let arrRes = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
    40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58,
    59, 60, 61, 62, 63,
  ];

  let newArr = [];

  // make random array
  function shuffleArray(arrRes) {
    for (let i = arrRes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrRes[i], arrRes[j]] = [arrRes[j], arrRes[i]];
    }
    newArr = arrRes;
    return newArr;
  }
  shuffleArray(arrRes);

  let cardResult = document.querySelectorAll(".card-result");
  if (getNameScore["level"] == "easy") {
    // define from 0 to 10
    function isBetweenZeroAndTen(num) {
      return num >= 0 && num <= 10;
    }

    // define from 11 to 63
    function isBetweenElevenAndsixtyThree(num) {
      return num >= 11 && num <= 63;
    }
  } else if (getNameScore["level"] == "hard") {
    // define from 0 to 10
    function isBetweenZeroAndTen(num) {
      return num >= 0 && num <= 20;
    }

    // define from 11 to 63
    function isBetweenElevenAndsixtyThree(num) {
      return num >= 21 && num <= 63;
    }
  }

  // set values in html
  for (let i = 0; i < cardResult.length; i++) {
    if (isBetweenZeroAndTen(i + 1)) {
      cardResult[
        newArr[i]
      ].innerHTML = `<p>Mine</p><i class="fa-solid fa-bomb"></i>`;
      cardResult[newArr[i]].style.backgroundColor = "#ff0000";
    } else if (isBetweenElevenAndsixtyThree(i + 1)) {
      cardResult[newArr[i]].innerHTML = `<p>Safe</p>`;
      cardResult[newArr[i]].style.backgroundColor = "#ff9900";
    } else {
      cardResult[
        newArr[i]
      ].innerHTML = `<p>Treasure</p><i class="fa-solid fa-gem"></i>`;
      cardResult[newArr[i]].style.backgroundColor = "#008000";
    }
  }
  document.getElementById("times").innerText = 10;
  myImg.forEach((e) => {
    e.addEventListener("click", () => {
      e.className = "clicked myImg";
      let finalScore = document.querySelectorAll(".clicked").length;
      document.getElementById("times").innerText = 10 - finalScore;
      let finalScoreResult = eval(((10 - finalScore) / 10) * 100);
      getNameScore["score"] = finalScoreResult;
      localStorage.setItem("result", JSON.stringify(getNameScore));
      if (finalScore < 10) {
        if (e.nextElementSibling.innerText != "Treasure") {
          if (e.nextElementSibling.innerText != "Mine") {
            e.style.display = "none";
            e.nextElementSibling.style.display = "flex";
            if (e.parentElement.nextElementSibling != null) {
              if (
                e.parentElement.nextElementSibling.firstChild.nextElementSibling
                  .innerText == "Treasure"
              ) {
                alert("Almost Reaching the treasure");
              }
            }
            if (e.parentElement.previousElementSibling != null) {
              if (
                e.parentElement.previousElementSibling.firstChild
                  .nextElementSibling.innerText == "Treasure"
              ) {
                alert("Almost Reaching the treasure");
              }
            }
            if (e.nextElementSibling.innerText != null) {
              if (e.nextElementSibling.innerText == "Safe") {
                localStorage.setItem("result", JSON.stringify(getNameScore));
                myScore.innerText = getNameScore["score"];
                document.getElementById("myAudio").innerHTML =
                  "<audio src='./assets/media/warning.mp3' autoplay hidden></audio>";
              }
            }
          } else {
            document.getElementById("score").style.opacity = 1;
            myScore.innerText = eval(100 - myScore.innerText);
            e.style.display = "none";
            e.nextElementSibling.style.display = "flex";
            document.getElementById("resStatus").innerText =
              "You lost, game over";
            document.getElementById("resStatus").style.opacity = 1;
            document
              .getElementById("resStatus")
              .classList.add("btn", "btn-danger", "fst-italic", "fs-1");

            myImg.forEach((i) => {
              i.style.pointerEvents = "none";
            });
            document.getElementById("myAudio").innerHTML =
              "<audio src='./assets/media/wrong.mp3' autoplay hidden></audio>";
            window.scrollTo(0, 0);
          }
        } else {
          document.getElementById("score").style.opacity = 1;
          myImg.forEach((i) => {
            i.style.pointerEvents = "none";
          });
          e.style.display = "none";
          e.nextElementSibling.style.display = "flex";
          document.getElementById("myAudio").innerHTML =
            "<audio src='./assets/media/win.mp3' autoplay hidden></audio>";
          document.getElementById("resStatus").innerText =
            "Congratulations, you won";
          document.getElementById("resStatus").style.opacity = 1;
          document
            .getElementById("resStatus")
            .classList.add("btn", "btn-success", "fst-italic", "fs-1");
          window.scrollTo(0, 0);
        }
      } else {
        document.getElementById("score").style.opacity = 1;
        alert("Game Over");
        myScore.innerText = 0;
        myImg.forEach((i) => {
          i.style.pointerEvents = "none";
        });
        document.getElementById("myAudio").innerHTML =
          "<audio src='./assets/media/lose.mp3' autoplay hidden></audio>";
        window.scrollTo(0, 0);
      }
    });
  });

  function repeat() {
    window.location.reload();
    getNameScore["score"] = 0;
    localStorage.setItem("result", JSON.stringify(getNameScore));
  }
}
