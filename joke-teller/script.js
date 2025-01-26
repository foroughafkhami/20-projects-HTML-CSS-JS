const button = document.getElementById("button");
const jokeApiUrl = "https://v2.jokeapi.dev/joke/Any";

async function createJoke() {
  try {
    const response = await fetch(jokeApiUrl);
    joke = await response.json();
    if (joke.setup) {
      return joke.setup + joke.delivery;
    } else {
      return joke.joke;
    }
  } catch (error) {
    console.log(error);
  }
}

async function readJoke() {
  try {
    let joke = new SpeechSynthesisUtterance();
    const text = await createJoke();
    joke.text = text ? text : "Try Again";

    window.speechSynthesis.speak(joke);
  } catch (error) {
    console.log("whoops", error);
  }
}

button.addEventListener("click", readJoke);
