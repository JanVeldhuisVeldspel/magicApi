var apiUrl = 'https://api.magicthegathering.io/v1/cards';
var color;
var types;
var name;
var rarity;

var page;

var pageSize;
var random;

var data = '';
var response;

// INPUTS
var nameInput = document.getElementById('name');
var colorInput = document.getElementById('color');
var typesInput = document.getElementById('type');
var rarityInput = document.getElementById('rarity');

// CARD INFO
var cards = [];

var cardList = document.getElementById('cardList');

var cardImage;

// LAYOUT CODE
var cardLine = false;

var HttpClient = function()
{
  this.get = function(aUrl, aCallback)
  {
    var anHttpRequest = new XMLHttpRequest();
    anHttpRequest.onreadystatechange = function()
    { 
      if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
      {
        aCallback(anHttpRequest.responseText);
      }
    }
    anHttpRequest.open( "GET", aUrl, true );            
    anHttpRequest.send( null );
  }
}

// FUNCTIONS
function search()
{
  name = nameInput.value;
  color = colorInput.value;
  types = typesInput.value;
  rarity = rarityInput.value;

  data = '';

  if (name != '')
  {
    data = data.concat('name='+name);
  }
  if (color != 'Any')
  {
    data = data.concat('&colors='+color);
  }
  if (types != 'Any')
  {
    data = data.concat('&types='+types);
  }
  if (rarity != 'Any')
  {
    data = data.concat('&rarity='+rarity);
  }
  if (data.substring(0, 1) === '&')
  {
    data = data.substring(1);
  }

  client = new HttpClient();
  console.log(client);
  client.get(apiUrl+"?"+data, function(response)
  {
    response = JSON.parse(response);
    parseResponse(response);
  });

  function parseResponse(response)
  {
    var cardAmount = response.cards.length;
    if(cardAmount > 99)
    {
      alert('wayoo nieuwe page');
    }
    if(cardAmount >0)
    {
      for (var i = 0; i < cardAmount; i++)
      {
          console.log(response.cards[i].name);
          var card = document.createElement("span");
          var ulist = document.getElementById("cardList");
          var newItem = document.createElement("li");
          newItem.className = 'cardLi';
          card.className = 'cardRow';
          cardLine = !cardLine;
          if(cardLine)
          {
            newItem.classList.add("rowDark");
          }
          card.textContent = response.cards[i].name;
          card.setAttribute('href', '#');
          card.setAttribute('target', '_blank');
          // card.addEventListener('click', openCardDetail);
          newItem.appendChild(card);
          ulist.appendChild(newItem);
      }
      cardList.classList.add('show');
    }
    else
    {
      console.log('kak');
      // showError('no result'); NOG DOEN
    }
  }
  // var data = 'limit='+limit+'&offset='+offset+'&apikey='+apiKey;
}

