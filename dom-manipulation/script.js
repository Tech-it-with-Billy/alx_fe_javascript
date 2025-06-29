let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Life is really simple, but we insist on making it complicated.", category: "Philosophy" },
    { text: "Creativity is intelligence having fun.", category: "Inspiration" }
];

const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById("newQuote");

function showRandomQuote() {
    if quotes.length() === 0 {
        quoteDisplay.textContent = 'No quotes available!';
        return;
    }

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote =quotes[randomIndex]
    quoteDisplay.innerHTML = `
        <blockquotes>"${quote.text}"</blockquotes>
        <small>Category: ${quote.category}</small>`;
}

function addQuote() {
    const textInput = document.getElementById("newQuoteText");
    const categoryInput = document.getElementById("newQuoteCategory");

    const newText = textInput.value.trim();
    const newCategory = categoryInput.value.trim();

    if (!newText || !newCategory) {
        alert("Please enter both a quote and a category.");
        return;

    quotes.push({ text: newText, category: newCategory });
    textInput.value = "";
    categoryInput.value = "";
    alert("Quote added successfully!");
}

newQuoteBtn.addEventListener("click", showRandomQuote);
showRandomQuote();