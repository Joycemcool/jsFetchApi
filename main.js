//IFFI
(function(){
    
    //Part B:Make an API Call 
    function btnLoad(){
        var url = 'https://trackapi.nutritionix.com/v2/search/instant/?query=hamburger'
        fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'x-app-id': '50582d67',
              'x-app-key':'ec6d259c1d2325f6537d106bd639de31'
            } // fetch second parameter
      })
          .then(response => response.json())
          .then(data => {
            console.log('nutricient');
            console.log(data);
            for (let key in data) { //loop through key
              if (data.hasOwnProperty(key)) {
                if(key==="common"){
                  data[key].forEach((item, index) => {
                    var name_p = document.createElement('span');
                    name_p.innerHTML =key+" "+ (index+1) +' '+ item.food_name
                    document.getElementById('foodInfo').appendChild(name_p); 

                    var img = document.createElement('img');
                    img.src = item.photo.thumb;
                    document.getElementById('foodInfo').appendChild(img);        
                    console.log(item.photo.thumb)        
                  });
                }             
              }
            }

          })
          .catch(error => console.error('Error:', error));
    }
    
    window.btnLoad = btnLoad;

    //Park C Poker Hands
    var poker_url = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
    fetch(poker_url)
        .then (function(response){
            return response.json();
        })
        .then (function (data){
            var deck_id = data.deck_id;
            var card_count = 5;
            var poker_draw_url = `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=${card_count}`
            fetch(poker_draw_url)
            .then(function(response){
                return response.json();
            })
            .then(function(data){
                data.cards.forEach((card)=>{
                    var img = document.createElement('img');
                    img.src = card.image;
                    document.getElementById('card').appendChild(img); 
                })
                var high_card = determineHighestHand(data.cards);
                var high_card_display = document.createElement('h4');
                high_card_display.innerHTML = "Initial Poken Hands is " + high_card;
                document.getElementById('card').appendChild(high_card_display); 
            });
        })

    //Test function

    const royal_flush = 'https://prog2700.onrender.com/pokerhandtest/royalflush';
    const straight_flush = 'https://prog2700.onrender.com/pokerhandtest/straightflush';
    const four_of_a_kind = 'https://prog2700.onrender.com/pokerhandtest/fourofakind';
    const full_house = 'https://prog2700.onrender.com/pokerhandtest/fullhouse';
    const flush = 'https://prog2700.onrender.com/pokerhandtest/flush';
    const straight = 'https://prog2700.onrender.com/pokerhandtest/straight';
    const three_of_a_kind = 'https://prog2700.onrender.com/pokerhandtest/threeofakind';
    const two_pair = 'https://prog2700.onrender.com/pokerhandtest/twopair';
    const one_pair = 'https://prog2700.onrender.com/pokerhandtest/onepair';
    const high_card = 'https://prog2700.onrender.com/pokerhandtest/highcard';
    const random = 'https://prog2700.onrender.com/pokerhandtest/random';

    async function poker_hands_call(url){
        const response = await fetch(url);
        const re_cards = await response.json();
        return re_cards.cards;
    }

    function display(cards){
        cards.forEach((card)=>{
            var img = document.createElement('img');
            img.src = card.image;
            document.getElementById('display').appendChild(img); 
        })

        var high_card = determineHighestHand(cards);
                var high_card_display = document.createElement('h4');
                high_card_display.innerHTML = "Your Poker Hands is "+high_card;
                document.getElementById('display').appendChild(high_card_display); 

    }

    //Royal Flush
    function btnRF(){
        poker_hands_call(royal_flush)
        .then(cards=>{
          display(cards);
        })
    }
    window.btnRF = btnRF;

    //Straight Flush
    function btnSF(){
        poker_hands_call(straight_flush)
        .then(cards=>{
        display(cards);
        })
    }
    
    window.btnSF = btnSF;

    //four_of_a_kind
    function btnFK(){
        poker_hands_call(four_of_a_kind)
        .then(cards=>{
        display(cards);
        })
    }
    
    window.btnFK = btnFK;

    //Full House
    function btnFH(){
        poker_hands_call(full_house)
        .then(cards=>{
        display(cards);
        })
    }

    window.btnFH = btnFH;

    //Flush
    function btnFlush(){
        poker_hands_call(flush)
        .then(cards=>{
        display(cards);
        })
    }
    
    window.btnFlush = btnFlush;

    //straight
    function btnStr(){
        poker_hands_call(straight)
        .then(cards=>{
        display(cards);
        })
    }
    
    window.btnStr = btnStr;

    //three_of_a_kind
    function btnTK(){
        poker_hands_call(three_of_a_kind)
        .then(cards=>{
        display(cards);
        })
    }
    
    window.btnTK = btnTK;

    //two_pair
    function btnTP(){
        poker_hands_call(two_pair)
        .then(cards=>{
        display(cards);
        })
    }
    
    window.btnTP = btnTP;

    //one_pair
    function btnOP(){
        poker_hands_call(one_pair)
        .then(cards=>{
        display(cards);
        })
    }
    
    window.btnOP = btnOP;

    //high_card
    function btnHC(){
        poker_hands_call(high_card)
        .then(cards=>{
        display(cards);
        })
    }
    
    window.btnHC = btnHC;

    //random_hand
    function btnRH(){
        poker_hands_call(random)
        .then(cards=>{
        display(cards);
        })
    }
    
    window.btnRH = btnRH;
    

    //Question 4	WRITE A FUNCTION THAT WILL DETERMINE THE HIGHEST POKER HAND 
    function determinRank(value){
        const faceCards = { JACK: 11, QUEEN: 12, KING: 13, ACE: 14 };
        return faceCards[value] || parseInt(value);
    }

    function determineHighestHand(cards) {
        // Sort cards by rank
        cards.sort((a, b) => determinRank(a.value) -  determinRank(b.value));
    

        // Check for specific hand combinations
        if (isRoyalFlush(cards)) {
            console.log(cards)
            return "Royal Flush";
        }

        if (isStraightFlush(cards)) {
            console.log(cards)
            return "Straight Flush";
        }
        if (isFourOfAKind(cards)) {
            return "Four of a Kind";
        }
        if (isFullHouse(cards)) {
            return "Full House";
        }
        if (isFlush(cards)) {
            return "Flush";
        }
        if (isStraight(cards)) {
            return "Straight";
        }
        if (isThreeOfAKind(cards)) {
            return "Three of a Kind";
        }
        if (isTwoPair(cards)) {
            return "Two Pair";
        }
        if (isOnePair(cards)) {
            return "One Pair";
        }
        
        // If no specific hand is found, default to High Card
        return "High Card";
    }
    
    // Helper functions to determine specific hand combinations
    function isStraightFlush(cards) {
        return isStraight(cards) && isFlush(cards);
    }
    
    function isFourOfAKind(cards) {
        return cards[0].value === cards[1].value && cards[1].value === cards[2].value && cards[2].value === cards[3].value ||
               cards[1].value === cards[2].value && cards[2].value === cards[3].value && cards[3].value === cards[4].value;
    }
    
    function isFullHouse(cards) {
        return (cards[0].value === cards[1].value && cards[2].value === cards[3].value && cards[3].value === cards[4].value) ||
               (cards[0].value === cards[1].value && cards[1].value === cards[2].value && cards[3].value === cards[4].value);
    }
    
    function isFlush(cards) {
        return cards.every(card => card.suit === cards[0].suit);
    }
    
    function isRoyalFlush(cards) {
        return cards.every(card =>determinRank(card.value)>=10) && cards.every(card => card.suit === cards[0].suit);
    }

    function isStraight(cards) {
        for (let i = 1; i < cards.length; i++) {           
            if (determinRank(cards[i].value) !== determinRank(cards[i - 1].value)+1) {
                return false;
            }
        }
        return true;
    }
    
    function isThreeOfAKind(cards) {
        return cards[0].value === cards[1].value && cards[1].value === cards[2].value ||
               cards[1].value === cards[2].value && cards[2].value === cards[3].value ||
               cards[2].value === cards[3].value && cards[3].value === cards[4].value;
    }
    
    function isTwoPair(cards) {
        return (cards[0].value === cards[1].value && cards[2].value === cards[3].value) ||
               (cards[0].value === cards[1].value && cards[3].value === cards[4].value) ||
               (cards[1].value === cards[2].value && cards[3].value === cards[4].value);
    }
    
    function isOnePair(cards) {
        return cards[0].value === cards[1].value ||
               cards[1].value === cards[2].value ||
               cards[2].value === cards[3].value ||
               cards[3].value === cards[4].value;
    }

})()

