
let quotes = [];

// Load quotes from localStorage if they exist
function loadQuotes() {
    const storedQuotes = localStorage.getItem("quotes");
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
    } else {
        // Default quotes if none in storage
        quotes = [
            { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
            { text: "Life is really simple, but we insist on making it complicated.", category: "Philosophy" },
            { text: "Creativity is intelligence having fun.", category: "Inspiration" }
        ];
        saveQuotes(); // Save default quotes
    }
}

// Save current quotes array to localStorage
localStorage.setItem("quotes", JSON.stringify(quotes));
function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Display a random quote
function showRandomQuote() {
    quoteDisplay.innerHTML = "";
    if (quotes.length === 0) {
        quoteDisplay.textContent = "No quotes available. Add one!";
        return;
    }

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    // Save the last viewed quote in sessionStorage
    sessionStorage.setItem("lastQuote", JSON.stringify(quote));

    displaySingleQuote(quote);
}

// Display a single quote
function displaySingleQuote(quote) {
    quoteDisplay.innerHTML = "";

    const blockquote = document.createElement("blockquote");
    blockquote.textContent = `"${quote.text}"`;

    const category = document.createElement("small");
    category.textContent = `Category: ${quote.category}`;

    quoteDisplay.appendChild(blockquote);
    quoteDisplay.appendChild(category);
}

// Add a new quote
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
    saveQuotes();

    displaySingleQuote(newQuote);
    textInput.value = "";
    categoryInput.value = "";
}

// Export quotes as JSON file
function exportToJsonFile() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "quotes.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Import quotes from uploaded JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(e) {
        try {
            const importedQuotes = JSON.parse(e.target.result);
            if (Array.isArray(importedQuotes)) {
                quotes.push(...importedQuotes);
                saveQuotes();
                alert("Quotes imported successfully!");
            } else {
                alert("Invalid file format. Must be an array of quote objects.");
            }
        } catch (err) {
            alert("Error reading JSON: " + err.message);
        }
    };
    fileReader.readAsText(event.target.files[0]);
}

// DOM Elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");

// Event Listeners
newQuoteBtn.addEventListener("click", showRandomQuote);

// Initialization
loadQuotes();
showRandomQuote(); // Show a random or last quote on load
