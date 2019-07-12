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
    data = data.concat('&color='+color);
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
    console.log(response);
    alert('jaja');
  });

  // var data = 'limit='+limit+'&offset='+offset+'&apikey='+apiKey;
}