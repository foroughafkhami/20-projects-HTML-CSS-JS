const button = document.getElementById("button");
const jokeApiUrl = "https://v2.jokeapi.dev/joke/Any";

async function createJoke() {
  try {
    const response = await fetch(jokeApiUrl);
    joke = await response.json();
    console.log(joke.setup + joke.delivery);

    return joke.setup + joke.delivery;
  } catch (error) {
    console.log(error);
  }
}

async function readJoke() {
  // if ("speedSynthesis" in window) {
  let joke = new SpeechSynthesisUtterance();
  const text = await createJoke();
  joke.text = text ? text : "Try Again";

  window.speechSynthesis.speak(joke);

  // } else {
  //   alert("Sorry, your browser doesn't support text to speech!");
  // }
}

button.addEventListener("click", readJoke);
