const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote'); 
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show Loading
function loading () {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete () {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Show New Quote

function newQuote () {
    loading();
    // Pick random quotes
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }
    // Set quote, hide loader
    quoteText.textContent = quote.text;
    complete();

}

// Get quote from API

async function getQuote() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes/';
 try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
    } catch (error) {
        getQuote();
    console.log("Whoops, no quote!", error);
    };
};

// Tweet a quote

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listener
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();

