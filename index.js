import { catsData } from "./data.js";

const renderEmotionEl = document.getElementById("moodsPartId");
const getImgBtnEl = document.getElementById("getImgBtn");
const giftOnly = document.getElementById("giftOnly");
const innerMeme = document.getElementById("innerMeme");
const containerMeme = document.getElementById("containerMeme");
const closeMemeBtn = document.getElementById("closeBtn");

renderEmotionEl.addEventListener("change", changeStyleOfInput);

getImgBtnEl.addEventListener("click", renderMeme);

closeMemeBtn.addEventListener("click", closeMeme);

function closeMeme() {
  containerMeme.style.display = "none";
}

function renderMeme() {
  const catObject = getSingleCat();
  innerMeme.innerHTML = `
        <img 
        class="cat-img" 
        src="./images/${catObject.image}"
        alt="${catObject.alt}"
        >
        `;
  containerMeme.style.display = "flex";
}

function getSingleCat() {
  const catsArray = getMatchingCat();

  if (catsArray.length === 1) {
    return catsArray[0];
  } else {
    const randomCat = Math.floor(Math.random() * catsArray.length);
    return catsArray[randomCat];
  }
}

function getMatchingCat() {
  if (document.querySelector('input[type="radio"]:checked')) {
    const selectedEmotion = document.querySelector(
      'input[type="radio"]:checked'
    ).value;
    const isGif = giftOnly.checked;

    const matchingCatsArray = catsData.filter(function (cat) {
      if (isGif) {
        return cat.emotionTags.includes(selectedEmotion) && cat.isGif;
      } else {
        return cat.emotionTags.includes(selectedEmotion);
      }
    });

    return matchingCatsArray;
  }
}

function changeStyleOfInput(e) {
  const radios = document.getElementsByClassName("radio");
  for (let radio of radios) {
    radio.classList.remove("highlight");
  }
  document.getElementById(e.target.id).parentElement.classList.add("highlight");
}

function showAllData(cats) {
  let emotionArray = [];

  for (let cat of cats) {
    for (let emotion of cat.emotionTags) {
      if (!emotionArray.includes(emotion)) {
        emotionArray.push(emotion);
      }
    }
  }
  return emotionArray;
}

function renderEmotionCats(cats) {
  let emotionString = "";
  const emotions = showAllData(cats);
  for (let emotion of emotions) {
    emotionString += `<div class="radio">
                            <label for="${emotion}">${emotion}</label>
                            <input type='radio' id="${emotion}" name='emotions' value='${emotion}'>
    
                    </div>`;
  }

  renderEmotionEl.innerHTML = emotionString;
}

renderEmotionCats(catsData);
