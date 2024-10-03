// public/script.js

async function searchBooks() {
    const searchInput = document.getElementById("searchInput").value;
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";
  
    if (!searchInput) {
      alert("Please enter a book title.");
      return;
    }
  
    try {
      const response = await fetch(`/search?query=${searchInput}`);
      const data = await response.json();
  
      if (data.items && data.items.length > 0) {
        data.items.forEach((item) => {
          const bookInfo = item.volumeInfo;
          const title = bookInfo.title;
          const authors = bookInfo.authors
            ? bookInfo.authors.join(", ")
            : "Unknown Author";
          const description = bookInfo.description
            ? bookInfo.description
            : "No description available";
          const thumbnail = bookInfo.imageLinks
            ? bookInfo.imageLinks.thumbnail
            : "";
          const buyLink = bookInfo.infoLink ? bookInfo.infoLink : "#";
  
          const bookCard = `
            <div class="book">
              <img src="${thumbnail}" alt="${title}" />
              <div>
                <h2>${title}</h2>
                <p>Author(s): ${authors}</p>
                <p>${description}</p>
                <a href="${buyLink}" target="_blank">Buy Now</a>
              </div>
            </div>
          `;
  
          resultsDiv.innerHTML += bookCard;
        });
      } else {
        resultsDiv.innerHTML = "No results found.";
      }
    } catch (error) {
      console.error(error);
    }
  }
  