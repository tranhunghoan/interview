document.addEventListener("DOMContentLoaded", function () {
    const jokeText = document.getElementById("joke-text");
    const funnyBtn = document.getElementById("funny-btn");
    const notFunnyBtn = document.getElementById("not-funny-btn");

    function fetchJokes() {
        fetch("http://localhost:3000/jokes/all",{
        method: "get",
        headers: {
            "Content-Type": "application/json"
        },
    })
          .then((response) => response.json())
          .then((data) => {
            // Lưu jokes vào local storage
            localStorage.setItem("jokes", JSON.stringify(data));

            displayRandomJoke();
          })
          .catch((error) => console.error("Error fetching jokes:", error));
      }

      function displayRandomJoke() {
        const jokes = JSON.parse(localStorage.getItem("jokes"));
        if (jokes && jokes.length > 0) {
          const randomIndex = Math.floor(Math.random() * jokes.length);
          const randomJoke = jokes[randomIndex].text.replace(/\n/g, "<br />"); // Lấy nội dung văn bản của joke
          jokeText.innerHTML = randomJoke; // Hiển thị nội dung văn bản của joke trong phần tử "jokeText"
        //   // Lấy ra joke đã hiển thị và loại bỏ nó khỏi mảng jokes
        //   const jokeToRemove = jokes.splice(randomIndex, 1)[0];
        //   // Lưu lại danh sách jokes đã cập nhật vào localStorage
        //   localStorage.setItem("jokes", JSON.stringify(jokes));
        } else {
          const jokeTextElement = document.getElementById("jokeText");
          jokeTextElement.textContent = "No more jokes available!";
        }
      }

    // Function to remove a joke from local storage
    function removeJoke(jokeToRemove) {
      const jokes = JSON.parse(localStorage.getItem("jokes"));
      console.log(jokeToRemove);
      const updatedJokes = jokes.filter((joke) => joke.text !== jokeToRemove);
      console.log(updatedJokes);
      localStorage.setItem("jokes", JSON.stringify(updatedJokes));
    }

    // Event listener for funny button
    funnyBtn.addEventListener("click", function () {
      const currentJoke = jokeText.textContent;
      removeJoke(currentJoke);
      displayRandomJoke();
    });

    // Event listener for not funny button
    notFunnyBtn.addEventListener("click", function () {
      const currentJoke = jokeText.textContent;
      removeJoke(currentJoke);
      displayRandomJoke();
    });

    // Fetch jokes when the page loads
    fetchJokes();
  });