
document.querySelector(".control-buttons").onclick = function(){
    let yourName = prompt("whats Your Name?")
    if(yourName == null || yourName == ""){
        document.querySelector(".name span").innerHTML = "Unknown"
    }else {
        document.querySelector(".name span").innerHTML = yourName;
    }
    document.querySelector(".control-buttons").remove();
}
let duration =1000;
let blocksContainer = document.querySelector(".memory-game-block");
let blocks = Array.from(blocksContainer.children);
let oredrRange = [...Array(blocks.length).keys()]; 
// console.log(oredrRange);
shuffle(oredrRange);
// console.log(oredrRange);

blocks.forEach((block, index) => {
    block.style.order = oredrRange[index];  
    block.addEventListener('click' , function(){
        flipBlock(block);

    })
});
function flipBlock(selectedBlock) {
    selectedBlock.classList.add('is-flipped');
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));
    if(allFlippedBlocks.length === 2 ){
        stopClicking();
        checkMatchedBlocks(allFlippedBlocks[0],allFlippedBlocks[1]);
    }
}
function stopClicking(){
    blocksContainer.classList.add('no-clicking');
    setTimeout(() => {

        blocksContainer.classList.remove('no-clicking'); 


    },duration)
}

function checkMatchedBlocks(firstBlocks , secondBlock){
    let triesElement = document.querySelector('.tries span')
    if(firstBlocks.dataset.technology === secondBlock.dataset.technology){
        firstBlocks.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');
        firstBlocks.classList.add('has-match')
        secondBlock.classList.add('has-match')
        document.getElementById('success').play()

    }else {
        setTimeout(() => {

            triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1 ;
        firstBlocks.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');
        document.getElementById('fail').play()

        },duration)};
}
  function shuffle(array) { 
    let current = array.length,
    temp,
    random;
    while (current > 0 ){
        random = Math.floor(Math.random()* current);
        current--;
        temp = array[current];
        array[current] = array[random];
        array[random] = temp ;
     }
     return array ;  
  }
