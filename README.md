FreeCodeCamp API Basejump: URL Shortener Microservice
=======================================================

User stories:
--------------
I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
When I visit that shortened URL, it will redirect me to my original link.

#### Input Format
> https://fcc-url-shortener-api.glitch.me/new/<original_url>  

#### Example Input 1
> https://fcc-url-shortener-api.glitch.me/new/https://www.google.com

#### Output
{ 

  "original_url" : "https://www.google.com", 
  
  "short_url"    : "https://fcc-url-shortener-api.glitch.me/3004" 

}

#### Example Input 2
> https://fcc-url-shortener-api.glitch.me/new/https://www.twitter.com

#### Output
{

  "original_url"  :  "https://www.twitter.com",
  
  "short_url"     :  "https://fcc-url-shortener-api.glitch.me/S16EKNH4M"

}

#### Usage:

When you type the shortURL in address bar

> https://fcc-url-shortener-api.glitch.me/3004

It Will get redirected to original URL

>  https://www.google.com