const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const xBtn = document.getElementById("x");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");
// Get Quotes from API
let apiQuotes = [];

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}
function newQuote() {
  showLoadingSpinner();
  // pick a random quote from apiQuotes array
  const quote =
    apiQuotes.quotes[Math.floor(Math.random() * apiQuotes.quotes.length)];
  if (!quote.author) {
    authorText.textContent = "unknown";
  } else {
    authorText.textContent = quote.author;
  }
  //Check Quote length to detemine styling
  if (quote.quote.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  // Set Quote,hide loader
  quoteText.textContent = quote.quote;
  removeLoadingSpinner();
}
async function getQuotes() {
  showLoadingSpinner();
  // use proxy if you have cors error
  // const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const apiUrl = "https://dummyjson.com/quotes";
  try {
    const response = await fetch(/*proxyUrl +*/ apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // Catch error here
    getQuotes();
  }
}

// tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}
  `;
  window.open(twitterUrl, "_blank");
}
// Event listeners
newQuoteBtn.addEventListener("click", newQuote);
xBtn.addEventListener("click", tweetQuote);
// On load
getQuotes();
