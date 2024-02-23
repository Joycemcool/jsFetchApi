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
                    var name_p = document.createElement('p');
                    name_p.innerHTML =key + index +' '+ item.food_name
                    document.getElementById('body').appendChild(name_p); 

                    var img = document.createElement('img');
                    img.src = item.photo.thumb;
                    document.getElementById('body').appendChild(img);        
                    console.log(item.photo.thumb)        
                  });
                }             
              }
            }

          })
          .catch(error => console.error('Error:', error));
    }
    
    window.btnLoad = btnLoad;

    var poker_url = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
    fetch(poker_url)
        .then (function(response){
            return response.json();
        })
        .then (function (data){
            if(data.success ===true){
                console.log("api fetch ok");
                console.log(data.deck_id)
            }
            var deck_id = data.deck_id;
            var card_count = 5;
            var poker_draw_url = `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=${card_count}`
            fetch(poker_draw_url)
            .then(function(response){
                return response.json();
            })
            .then(function(data){
                console.log(data.cards);
                data.cards.forEach((card)=>{
                    var img = document.createElement('img');
                    img.src = card.image;
                    document.getElementById('body').appendChild(img); 
                })
                var high_card = determineHighestHand(data.cards);
                var high_card_display = document.createElement('h4');
                high_card_display.innerHTML = high_card;
                document.getElementById('body').appendChild(high_card_display); 
            });
        })

    //Async fetch function

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
        console.log(re_cards);
        console.log(re_cards.cards);
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
    
  poker_hands_call(full_house)
  .then(cards=>{
    display(cards);
  })


    function determinRank(value){
        const faceCards = { JACK: 11, QUEEN: 12, KING: 13, ACE: 14 };
        return faceCards[value] || parseInt(value);
    }

    function determineHighestHand(cards) {
        // Sort cards by rank
        cards.sort((a, b) => determinRank(a.value) -  determinRank(b.value));
    
        // Check for specific hand combinations
        if (isStraightFlush(cards)) {
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
    
    function isStraight(cards) {
        for (let i = 1; i < cards.length; i++) {
            if (determinRank(cards[i].value) !== determinRank(cards[i - 1].value + 1)) {
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

