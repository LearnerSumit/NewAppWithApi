const API_KEY = "https://newsapi.org/v2/everything?q=jobs&apiKey=aba6ec5b3af547a2a6d24362b84a3f02";

const img = document.querySelector(".img");
const title = document.querySelector(".heading");
const paragraph = document.querySelector(".paragraph");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");
const readmore = document.querySelector("#readmore");
const publish_date = document.querySelector(".publish_date");

const imgurl = "ImageNoteAvailable.jpeg";

// Retrieve the index from localStorage, or generate a new random index
let i = localStorage.getItem("newsIndex");
if (i === null) {
    i = getRandomIndex();
} else {
    i = parseInt(i, 10);
}

// First Time Website Loading
window.addEventListener("load", () => newsFetch(i));

// API Calling
async function newsFetch(i) {
    const response = await fetch(API_KEY);
    const json = await response.json();

    // Date and Time Formatting
    const timestamp = json.articles[i].publishedAt;
    const date = new Date(timestamp);
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    const imageUrl = json.articles[i].urlToImage || imgurl;
    console.log(imageUrl);

    // HTML Content
    img.innerHTML = `<img src="${imageUrl}" alt="image">`;
    title.innerHTML = `<h4>${json.articles[i].title}</h4>`;
    paragraph.innerHTML = `<p>${json.articles[i].description}</p>`;
    readmore.innerHTML = `<a href="${json.articles[i].url}">Read More</a>`;
    publish_date.innerHTML = `<h5>${formattedDate}</h5>`;
}

// Next Button
next.addEventListener("click", () => {
    i = (i + 1) % 101; // Adjust the modulo value based on your array length (101 for 0 to 100)
    newsFetch(i);
    localStorage.setItem("newsIndex", i);
});

// Previous Button
previous.addEventListener("click", () => {
    i = (i - 1 + 101) % 101; // Adjust the modulo value based on your array length (101 for 0 to 100)
    newsFetch(i);
    localStorage.setItem("newsIndex", i);
});

// Function to get a random index
function getRandomIndex() {
    return Math.floor(Math.random() * 101); // Adjust the upper limit based on your array length (101 for 0 to 100)
}
