var fakeResponse = '{"cards":[{"name":"Archangel Avacyn","names":["Archangel Avacyn","Avacyn, the Purifier"],"manaCost":"{3}{W}{W}","cmc":5,"colors":["White"],"colorIdentity":["W"],"type":"Legendary Creature — Angel","supertypes":[    "Legendary"],"types":[    "Creature"],"subtypes":[    "Angel"],"rarity":"Mythic Rare","set":"SOI","text":"Flash\nFlying, vigilance\nWhen Archangel Avacyn enters the battlefield, creatures you control gain indestructible until end of turn.\nWhen a non-Angel creature you control dies, transform Archangel Avacyn at the beginning of the next upkeep.","artist":"James Ryman","number":"5a","power":"4","toughness":"4","layout":"double-faced","multiverseid":409741,"imageUrl":"http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=409741&type=card","rulings":[    {    "date":"2016-04-08",    "text":"Archangel Avacyn’s delayed triggered ability triggers at the beginning of the next upkeep regardless of whose turn it is."},    {    "date":"2016-04-08",    "text":"Archangel Avacyn’s delayed triggered ability won’t cause it to transform back into Archangel Avacyn if it has already transformed into Avacyn, the Purifier, perhaps because several creatures died in one turn."},    {    "date":"2016-04-08",    "text":"For more information on double-faced cards, see the Shadows over Innistrad mechanics article (http://magic.wizards.com/en/articles/archive/feature/shadows-over-innistrad-mechanics)."}],"foreignNames":[{"name":"大天使艾维欣",    "language":"Chinese Simplified",    "multiverseid":410071},    {"name":"大天使艾維欣",    "language":"Chinese Traditional","multiverseid":410401},    {"name":"Archange Avacyn",    "language":"French",    "multiverseid":411061},    {  "name":"Erzengel Avacyn",    "language":"German",    "multiverseid":410731},    {  "name":"Arcangelo Avacyn",    "language":"Italian",    "multiverseid":411391},    {  "name":"大天使アヴァシン",    "language":"Japanese",    "multiverseid":411721},    {  "name":"대천사 아바신",    "language":"Korean",    "multiverseid":412051},    {  "name":"Arcanjo Avacyn",    "language":"Portuguese (Brazil)",    "multiverseid":412381},    {  "name":"Архангел Авацина",    "language":"Russian",    "multiverseid":412711},    {  "name":"Arcángel Avacyn",    "language":"Spanish",    "multiverseid":413041}],"printings":["SOI"],"originalText":"Flash\nFlying, vigilance\nWhen Archangel Avacyn enters the battlefield, creatures you control gain indestructible until end of turn.\nWhen a non-Angel creature you control dies, transform Archangel Avacyn at the beginning of the next upkeep.","originalType":"Legendary Creature — Angel","id":"02ea5ddc89d7847abc77a0fbcbf2bc74e6456559"}]}';

var apiUrl = 'https://api.magicthegathering.io/v1/cards';
var color;
var types;
var name;
var rarity;

var page = 1;

var pageSize;
var random;

var data = '';
var response;

//BOOLS
var searchAble = true;
var nextAble = true;
var prevAble = true;
var multiplePages = false;

// INPUTS
var nameInput = document.getElementById('name');
var colorInput = document.getElementById('color');
var typesInput = document.getElementById('type');
var rarityInput = document.getElementById('rarity');

// CARD INFO
var cardList = document.getElementById('cardList');

var cardImageUrl;
var cardBackImageDefault = "images/cardBack.png";
var cardBackImageNone = "images/cardBackNone.png";
var cardName;
var cardColors;
var cardRar;
var cardTypes;
var cardText;
var cardFlavor;
// var cardSet;

var cardImage = document.getElementById('cardImage');
var cardTitle = document.getElementById('cardTitle');
var cardColor = document.getElementById('cardColor');
var cardRarity = document.getElementById('cardRarity');
var cardType = document.getElementById('cardType');
var cardTeks = document.getElementById('cardTeks');
var cardQuote = document.getElementById('cardQuote');
// var cardSets = document.getElementById('cardSets');

// CARD POPUP
var cardPopUp = document.getElementById('cardPopUp');

// LAYOUT CODE
var cardLine = false;

// BOTTOM MENU
var bottomLinks = document.getElementById('bottomLinksContainer');

// ERRORS
var errorPanel = document.getElementById('errorMessage');

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
function searchInit()
{
  multiplePages = false;
  page = 1;
  search();
}

function search()
{
  errorPanel.classList.remove('show');
  if(!searchAble)
  {
    return
  }
  searchAble = false;
  cardPopUp.classList.remove('flex');
  var ulist = document.getElementById("cardList");
  ulist.innerHTML = '';
  cardList.classList.remove('show');
  name = nameInput.value;
  color = colorInput.value;
  types = typesInput.value;
  rarity = rarityInput.value;

  if(page == 1)
  {
    data = '';
  }
  else
  {
    data = 'page='+page;
  }

  if (name != '')
  {
    data = data.concat('&name='+name);
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
      multiplePages = true;
      bottomLinks.classList.add("show");
      document.getElementById('nextLink').addEventListener('click', nextPage);
      document.getElementById('prevLink').addEventListener('click', prevPage);
    }
    else if(cardAmount < 99)
    {
      if(!multiplePages)
      {
        bottomLinks.classList.remove("show");
      }
    }
    else if(cardAmount < 1)
    {
      page = page - 1;
      search();
    }
    if(cardAmount >0)
    {
      for (var i = 0; i < cardAmount; i++)
      {
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
          card.setAttribute('id', response.cards[i].id);
          card.addEventListener('click', openCardDetail);
          newItem.appendChild(card);
          ulist.appendChild(newItem);
      }
      cardList.classList.add('show');
    }
    else
    {
      showError('Search Returned No Result');
    }
    searchAble = true;
    prevAble = true;
    nextAble = true;
  }

  function nextPage()
  {
    if(!nextAble)
    {
      return
    }
    nextAble = false;
    page ++;
    data = data +'&page='+page;
    search();
  }
  function prevPage()
  {
    if(!prevAble)
    {
      return
    }
    prevAble = false;
    page --;
    if(page < 1)
    {
      page=1;
    }
    data = data +'&page='+page;
    search();
  }

  function openCardDetail()
  {
    bottomLinks.classList.remove("show");
    cardImageUrl = cardBackImageDefault;
    cardImage.src = cardImageUrl;
    cardColor.innerHTML = "";
    cardTitle.innerHTML = "";
    cardRarity.innerHTML = "";
    cardType.innerHTML = "";
    cardTeks.innerHTML = "";
    cardQuote.innerHTML = "";
    cardList.classList.remove('show');
    var cardId = this.id;
    client = new HttpClient();
    client.get(apiUrl+"/"+cardId, function(response)
    {
      response = JSON.parse(response);
      cardImageUrl = response.card.imageUrl;
      if(cardImageUrl == "" || cardImageUrl == null)
      {
        cardImageUrl = cardBackImageNone;
      }
      cardName = response.card.name;
      cardColors = response.card.colors;
      cardRar = response.card.rarity;
      cardTypes = response.card.type;
      cardText = response.card.text;

      if(cardText == "" || cardText == null)
      {
        cardText = "";
      }
      else
      {
        cardText = cardText.replace(/{B}/g, '<img src="images/Black.svg" class="colorIcon">');
        cardText = cardText.replace(/{G}/g, '<img src="images/Green.svg" class="colorIcon">');
        cardText = cardText.replace(/{R}/g, '<img src="images/Red.svg" class="colorIcon">');
        cardText = cardText.replace(/{W}/g, '<img src="images/White.svg" class="colorIcon">');
        cardText = cardText.replace(/{U}/g, '<img src="images/Blue.svg" class="colorIcon">');
        cardText = cardText.replace(/{T}/g, '<img src="images/Tap.svg" class="colorIcon">');
        cardText = cardText.replace(/{Q}/g, '<img src="images/Untap.svg" class="colorIcon">');
        cardText = cardText.replace(/{C}/g, '<img src="images/Colorless.svg" class="colorIcon">');

        cardText = cardText.split('{U/R}').join('<img src="images/UR.svg" class="colorIcon">');
        cardText = cardText.split('{U/B}').join('<img src="images/UB.svg" class="colorIcon">');
        cardText = cardText.split('{B/G}').join('<img src="images/BG.svg" class="colorIcon">');
        cardText = cardText.split('{B/R}').join('<img src="images/BR.svg" class="colorIcon">');
        cardText = cardText.split('{G/W}').join('<img src="images/GW.svg" class="colorIcon">');
        cardText = cardText.split('{G/U}').join('<img src="images/GU.svg" class="colorIcon">');
        cardText = cardText.split('{R/G}').join('<img src="images/RG.svg" class="colorIcon">');
        cardText = cardText.split('{R/W}').join('<img src="images/RW.svg" class="colorIcon">');
        cardText = cardText.split('{W/B}').join('<img src="images/WB.svg" class="colorIcon">');
        cardText = cardText.split('{W/U}').join('<img src="images/WU.svg" class="colorIcon">');

        cardText = cardText.split('{0}').join('<img src="images/0.svg" class="colorIcon">');
        cardText = cardText.split('{1}').join('<img src="images/1.svg" class="colorIcon">');
        cardText = cardText.split('{2}').join('<img src="images/2.svg" class="colorIcon">');
        cardText = cardText.split('{3}').join('<img src="images/3.svg" class="colorIcon">');
        cardText = cardText.split('{4}').join('<img src="images/4.svg" class="colorIcon">');
        cardText = cardText.split('{6}').join('<img src="images/6.svg" class="colorIcon">');
        cardText = cardText.split('{7}').join('<img src="images/7.svg" class="colorIcon">');
        cardText = cardText.split('{8}').join('<img src="images/8.svg" class="colorIcon">');
        cardText = cardText.split('{9}').join('<img src="images/9.svg" class="colorIcon">');
        cardText = cardText.split('{10}').join('<img src="images/10.svg" class="colorIcon">');
        cardText = cardText.split('{11}').join('<img src="images/11.svg" class="colorIcon">');
        cardText = cardText.split('{12}').join('<img src="images/12.svg" class="colorIcon">');
        cardText = cardText.split('{13}').join('<img src="images/13.svg" class="colorIcon">');
        cardText = cardText.split('{14}').join('<img src="images/14.svg" class="colorIcon">');
        cardText = cardText.split('{16}').join('<img src="images/16.svg" class="colorIcon">');
        cardText = cardText.split('{17}').join('<img src="images/17.svg" class="colorIcon">');
        cardText = cardText.split('{18}').join('<img src="images/18.svg" class="colorIcon">');
        cardText = cardText.split('{19}').join('<img src="images/9.svg" class="colorIcon">');
        cardText = cardText.split('{20}').join('<img src="images/20.svg" class="colorIcon">');
      }

      cardFlavor = response.card.flavor;
      if(cardFlavor == "" || cardFlavor == null)
      {
        cardFlavor = "";
      }
      // cardSet = response.card.setName;

      for (var i = 0; i < cardColors.length; i++)
      {
        var icon = document.createElement("img");
        icon.setAttribute('src', "images/"+cardColors[i]+".svg");
        icon.classList.add('colorIcon');
        document.getElementById('cardColor').appendChild(icon);
      }

      cardImage.src = cardImageUrl;
      cardTitle.innerHTML = cardName;
      cardRarity.innerHTML = cardRar;
      cardType.innerHTML = cardTypes;
      cardTeks.innerHTML = cardText;
      cardQuote.innerHTML = cardFlavor;
      // cardSets.innerHTML = cardSet;

      cardPopUp.classList.add('flex');
    });

  }

  function closePop()
  {
    if(multiplePages)
    {
      bottomLinks.classList.add("show");
    }
    cardPopUp.classList.remove('flex');
    cardList.classList.add('show');
  }

  function showError(error)
  {
    errorPanel.innerHTML = error;
    errorPanel.classList.add('show');
  }

  document.getElementById('closePopup').addEventListener('click', closePop);
}