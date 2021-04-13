//http://www.omdbapi.com/?s=tt3896198&apikey=4ef92d25

let input = document.getElementById("search");
let searchIcon = document.getElementById("searchIcon");
input.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    let value = e.target.value;
    SearchMovies(value);
  }
});

searchIcon.addEventListener("click", (e) => {
  window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = new SpeechRecognition();
  recognition.addEventListener("result", (e) => {
    let transcript = e.results[0][0].transcript;
    let speechValue = (input.value = transcript);
    SearchMovies(speechValue);
  });
  recognition.start();
});

function SearchMovies(searchText) {
  window
    .fetch(`http://www.omdbapi.com/?s=${searchText}&apikey=f1619349`)
    .then((data) => {
      //convert response body into JSON Object
      data
        .json()
        .then((movies) => {
          let moviesData = movies.Search;
          let output = [];
          for (let movie of moviesData) {
            console.log(movie);
            output += `
                <div>
                    <img src=${movie.Poster} alt=${movie.Title} />
                    <h1>${movie.Title}</h1>
                    <p>${movie.Type}</p>
                    <p>${movie.Year}</p>
                </div>
                `;
          }
          document.getElementById("template").innerHTML = output;
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}
// parameter --q to s