let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Life is really simple, but we insist on making it complicated.", category: "Philosophy" },
    { text: "Creativity is intelligence having fun.", category: "Inspiration" }
];

const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");

function showRandomQuote() {    
    quoteDisplay.innerHTML = "";
    if (quotes.length === 0) {
        quoteDisplay.textContent = "No quotes available. Add one!";
        return;
    }

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    const blockquote = document.createElement("blockquote");
    blockquote.textContent = `"${quote.text}"`;

    const category = document.createElement("small");
    category.textContent = `Category: ${quote.category}`;

    quoteDisplay.appendChild(blockquote);
    quoteDisplay.appendChild(category);
}

function createAddQuoteForm() {
    const textInput = document.getElementById("newQuoteText");
    const categoryInput = document.getElementById("newQuoteCategory");

    const newText = textInput.value.trim();
    const newCategory = categoryInput.value.trim();

    if (!newText || !newCategory) {
        alert("Please enter both a quote and a category.");
        return;
    }

    const newQuote = { text: newText, category: newCategory };
    quotes.push(newQuote);

    displaySingleQuote(newQuote);

    textInput.value = "";
    categoryInput.value = "";
}

function displaySingleQuote(quote) {
    quoteDisplay.innerHTML = "";

    const blockquote = document.createElement("blockquote");
    blockquote.textContent = `"${quote.text}"`;

    const category = document.createElement("small");
    category.textContent = `Category: ${quote.category}`;

    quoteDisplay.appendChild(blockquote);
    quoteDisplay.appendChild(category);
}

newQuoteBtn.addEventListener("click", showRandomQuote);
showRandomQuote();