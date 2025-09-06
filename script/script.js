const loadLessons = () =>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data))
}
const removeActive =() => {
    const lessonButtons = document.querySelectorAll(".lesson-btn");
    lessonButtons.forEach((btn) => btn.classList.remove("active"))
}
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}
const manageSpinner = (status) =>{
    if(status == true){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-container").classList.add('hidden');
    }
     else{
        document.getElementById("word-container").classList.remove("hidden");
        document.getElementById("spinner").classList.add('hidden');
    }
}
const loadLevelWord = (id) =>{
    manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        removeActive();
        const clickBtn = document.getElementById(`lesson-btn-${id}`);
        clickBtn.classList.add("active")
        displayLevelWord(data.data)
    })
}
const createElement = (arr) =>{
    const htmlElements = arr.map((el) =>`<span class ="btn"> ${el}</span>`);
    return htmlElements.join(" ");
}
const loadWordDetail = async(id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayDetailWord(details.data)
}

const displayDetailWord = (word) =>{
    const detailBox = document.getElementById('details-container');
    detailBox.innerHTML =`<div>
            <h2 class="text-lg font-semibold">${word.word} (<i class="fa-solid fa-microphone-lines"></i> :${word.pronunciation})</h2>
        </div>
         <div>
            <h2 class="text-sm font-semibold">Meaning</h2>
            <p>${word.meaning}</p>
        </div>
         <div>
            <h2 class="text-lg font-semibold">Example</h2>
            <p>${word.sentence}</p>
        </div>
        <div>
            <h2 class="text-lg font-semibold py-3">সমার্থক শব্দ গুলো</h2>
            <div> ${createElement(word.synonyms)}</div>
            </div>
          
        <button class="btn btn-active btn-primary">Complete Learning</button>`
    document.getElementById("word_modal").showModal();
}

const displayLesson = (lessons) =>{
    // get the container and empty
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = "";
    // get into every lesson
    for(const lesson of lessons){
        // create element
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML =`<button id="lesson-btn-${lesson.level_no}" onclick = "loadLevelWord(${lesson.level_no})"
         class="btn btn-outline btn-primary lesson-btn">
        <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}</button>`
        // append element
        levelContainer.append(btnDiv);
    }
};
const displayLevelWord = (words) => {
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = "";

    if(words.length === 0){
         wordContainer.innerHTML = ` <div class="text-center col-span-full font-bangla">
          <img class="mx-auto" src="assets/alert-error.png" alt="">
         <h2 class="text-sm mt-5 text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</h2>
         <p class="text-4xl font-medium py-8" >নেক্সট Lesson এ যান</p>
         </div>`
         manageSpinner(false);
         return;
    }
    
   words.forEach((word)=>{
    const card = document.createElement("div");
    card.innerHTML = ` <div class="bg-white text-center px-8 py-10 rounded-lg">
            <h2 class="font-bold text-lg">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
            <p class="font-semibold py-3">Meaning /Pronounciation</p>
            <p class="text-xl font-medium">${word.meaning ? word.meaning :"অর্থ পাওয়া যায়নি"}
             / ${word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায়নি" }</p>
            <div class="flex justify-between items-center mt-3">
                <button   onclick="loadWordDetail(${word.id})" class="btn bg-[#1a91ff1a] "><i class="fa-solid fa-circle-info"></i></button>
                <button onclick = " pronounceWord('${word.word}')" class="btn bg-[#1a91ff1a]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div> ` 
    wordContainer.append(card);

   })
   manageSpinner(false);
}
loadLessons();

document.getElementById("btn-search").addEventListener("click",() => {
    removeActive();
    const input = document.getElementById("input-search");
    const searchValue = input.value.trim().toLowerCase();

    fetch("https://openapi.programming-hero.com/api/words/all")
    .then((res) =>res.json())
    .then((data) =>{
        const allWords = data.data;
        const filterWords = allWords.filter((word) =>
             word.word.toLowerCase().includes(searchValue)
        )
        displayLevelWord(filterWords);
    })
})