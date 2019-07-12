var apiUrl = 'https://api.magicthegathering.io/v1/cards';
var color;
var types;
var name;

var page;

var pageSize;
var random;

var data = 'limit='+limit+'&offset='+offset+'&apikey='+apiKey;
var responseje;

// POPUP ELEMENTS

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