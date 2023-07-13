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
