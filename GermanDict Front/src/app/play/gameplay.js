
//shuffle array function
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
//function to add color to each card
export function formatCards(color, cards){
    if(cards){
        
        if (color == "red"){
            cards.forEach(element => {
                    element.color = color
                });
            return cards
        }
        if (color == "yellow"){
            cards.forEach(element => {
                element.color = color

            })
            return cards
        }
        if (color == "green"){
            cards.forEach(element => {
                element.color = color
            }) 
            return cards
        }
        if (color == "white"){
            cards.forEach(element => {
                element.color = color
            })
            return cards
        }
    }
}
// Set card arrays to play
export function gameCardsFormatted(cards){
    const redCards = formatCards("red", cards.red_cards)
    const yellowCards = formatCards("yellow", cards.yellow_cards)
    const greenCards = formatCards("green", cards.green_cards)
    const unclassifiedCards = formatCards("white", cards.unclassified_cards)
    let array = unclassifiedCards.concat(redCards, redCards, redCards, yellowCards, yellowCards, greenCards)
    return (array)
}

export function cardQueue(cards){
    const queue = shuffleArray(gameCardsFormatted(cards))
    return queue
}
// Check answer and decide how to proceed with the word's score
export function checkCard(card, input, time){
    let points = 0
    let trans1 = card.translation1
    let trans2 = card.translation2
    let trans3 = card.translation3
    let fast = time <= 4
    let slow = time <= 10 && time > 4
    let wrong = time > 10
    let userInput = input.toLowerCase()
    if ((userInput == trans1 || userInput == trans2 || userInput == trans3) && fast){
        points = 1
    
    }
    if ((userInput == trans1 || userInput == trans2 || userInput == trans3) && slow){
        points = 0
     
    }
    if(userInput != trans1 && userInput != trans2 && userInput != trans3 || wrong){
        points = -1
        
    }
    return points
}

