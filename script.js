window.addEventListener("load", () => {
  // const search = document.querySelector(".search");
  const load = document.querySelector(".page-load");
  const logo = document.querySelector(".logo");

  setTimeout(() => {
    logo.classList.add("show");
    load.classList.add("out");
    resolve(); // Resolve the promise after the code execution
  }, 500);
});

const passwordForm = document.getElementById("passwordForm");
const passwordBlock = document.querySelector(".password");

function passwordVerification(input) {
  const passwords = [
    "vI998k",
    "94o9zF",
    "c97z3D",
    "80BA8u",
    "Jzd631",
    "944dNq",
    "3z47Nz",
    "Q263Lu",
    "cDo386",
    "hH643J",
  ];
  return passwords.includes(input) ? true : false;
}

passwordForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const passwordInput = document.getElementById("password");
  const password = passwordInput.value;

  if (passwordVerification(password)) {
    alert("Access granted!");
    passwordBlock.classList.add("out");
  } else {
    alert("Incorrect password. Please try again.");
    passwordInput.value = ""; // Clear the input field
    passwordInput.focus(); // Set focus back to the input field
  }
});

const container = document.querySelector(".container");

function getUserInput() {
  const input = document.querySelector('[type="text"]');
  const chineseRegex = /[\u4e00-\u9fa5]/;

  container.innerHTML = "";

  return new Promise((resolve, reject) => {
    if (chineseRegex.test(input.value) && input.value.length >= 1) {
      resolve(input.value);
    } else {
      throw new Error("請輸入中文");
    }
  })
    .then((messages) => {
      let words = messages.split("");
      return words;
    })
    .then((words) => {
      for (let i = 0; i < words.length; i++) {
        createBoard(i, words[i]);
        const practice = new Character(
          HanziWriter.create(`character-target-${i}`, words[i], {
            width: 250,
            height: 250,
            showCharacter: false,
          }),
          i
        );
      }
      const container = document.querySelector(".container");
      container.classList.add("show");
    })
    .then(() => {
      console.log(container);
    })
    .catch((error) => {
      alert("請輸入中文");
    });
}

function createBoard(index, word) {
  const board = document.createElement("div");
  board.classList.add("board");

  const character = document.createElement("div");
  character.classList.add("character");

  const btnsContainer = document.createElement("div");
  btnsContainer.classList.add("btns-container");

  const characterTarget = document.createElement("div");
  characterTarget.setAttribute("id", `character-target-${index}`);

  const reset = document.createElement("button");
  reset.setAttribute("id", `reset-${index}`);
  reset.textContent = "測驗";

  const animate = document.createElement("button");
  animate.setAttribute("id", `animate-${index}`);
  animate.textContent = "動畫";

  container.appendChild(board);
  board.appendChild(character);
  character.appendChild(characterTarget);
  btnsContainer.appendChild(reset);
  btnsContainer.appendChild(animate);
  character.appendChild(btnsContainer);
  container.appendChild(board);
}

class Character {
  constructor(char, num) {
    this.char = char;
    this.num = num;
    this.animation();
    this.quiz();
  }
  animation() {
    document
      .getElementById(`animate-${this.num}`)
      .addEventListener("click", () => {
        this.char.animateCharacter();
      });
  }
  quiz() {
    this.char.quiz();
    document
      .getElementById(`reset-${this.num}`)
      .addEventListener("click", () => {
        this.char.quiz();
      });
  }
}
