let quotes = [];

// Load quotes from localStorage if available
function loadQuotes() {
    const storedQuotes = localStorage.getItem("quotes");
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
    } else {
        quotes = [
            { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
            { text: "Life is really simple, but we insist on making it complicated.", category: "Philosophy" },
            { text: "Creativity is intelligence having fun.", category: "Inspiration" }
        ];
        saveQuotes();
    }
}

// Save quotes to localStorage
function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Populate category dropdown from quote categories
function populateCategories() {
    const categoryFilter = document.getElementById("categoryFilter");
    const uniqueCategories = [...new Set(quotes.map(q => q.category))];

    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    uniqueCategories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    // Restore previously selected category
    const savedFilter = localStorage.getItem("lastFilter");
    if (savedFilter) {
        categoryFilter.value = savedFilter;
        filterQuotes();
    }
}

// Filter and display quotes by selected category
function filterQuotes() {
    const selectedCategory = document.getElementById("categoryFilter").value;
    localStorage.setItem("lastFilter", selectedCategory);

    const filtered = selectedCategory === "all"
        ? quotes
        : quotes.filter(q => q.category === selectedCategory);

    quoteDisplay.innerHTML = "";
    if (filtered.length === 0) {
        quoteDisplay.textContent = "No quotes available for this category.";
        return;
    }

    filtered.forEach(displaySingleQuote);
}

// Display a single quote in the UI
function displaySingleQuote(quote) {
    const blockquote = document.createElement("blockquote");
    blockquote.textContent = `"${quote.text}"`;

    const category = document.createElement("small");
    category.textContent = `Category: ${quote.category}`;

    quoteDisplay.appendChild(blockquote);
    quoteDisplay.appendChild(category);
}

// Display a random quote and save to session
function showRandomQuote() {
    quoteDisplay.innerHTML = "";
    if (quotes.length === 0) {
        quoteDisplay.textContent = "No quotes available. Add one!";
        return;
    }

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    sessionStorage.setItem("lastQuote", JSON.stringify(quote));
    displaySingleQuote(quote);
}

// Add a new quote and update UI + storage
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
    populateCategories(); // update filter options

    displaySingleQuote(newQuote);
    textInput.value = "";
    categoryInput.value = "";
}

// Export quotes to a JSON file
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

// Import quotes from a JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(e) {
        try {
            const importedQuotes = JSON.parse(e.target.result);
            if (Array.isArray(importedQuotes)) {
                quotes.push(...importedQuotes);
                saveQuotes();
                populateCategories();
                alert("Quotes imported successfully!");
            } else {
                alert("Invalid file format. Expected an array of quote objects.");
            }
        } catch (err) {
            alert("Error reading JSON: " + err.message);
        }
    };
    fileReader.readAsText(event.target.files[0]);
}

// DOM elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");

// Event listeners
newQuoteBtn.addEventListener("click", showRandomQuote);
document.getElementById("categoryFilter").addEventListener("change", filterQuotes);

// Initialize app
loadQuotes();
populateCategories();
showRandomQuote();
