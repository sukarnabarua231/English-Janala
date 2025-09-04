const loadLessons = () =>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data))
}
const loadLevelWord = (id) =>{
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevelWord(data.data))
}

const displayLesson = (lessons) =>{
    // get the container and empty
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = "";
    // get into every lesson
    for(const lesson of lessons){
        // create element
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML =`<button onclick = "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary ">
        <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}</button>`
        // append element
        levelContainer.append(btnDiv);
    }
};
const displayLevelWord = (words) => {
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = "";
    
   words.forEach((word)=>{
    const card = document.createElement("div");
    card.innerHTML = ` <div class="bg-white text-center px-8 py-10 rounded-lg">
            <h2 class="font-bold text-lg">${word.word}</h2>
            <p class="font-semibold py-3">Meaning /Pronounciation</p>
            <p class="text-xl font-medium">${word.meaning} / ${word.pronounciation}</p>
            <div class="flex justify-between items-center mt-3">
                <button class="btn bg-[#1a91ff1a] "><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1a91ff1a]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div> `
    wordContainer.append(card);
   })
}
loadLessons();