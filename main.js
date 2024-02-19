//IFFI
(function(){
    
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
                    // var name_p = document.createElement('p');
                    // name_p.innerHTML = index 
                    // document.getElementById('body').appendChild(name_p); 

                    var img = document.createElement('img');
                    img.src = card.image;
                    document.getElementById('body').appendChild(img); 
                })
                
                
            });


        })

})()

