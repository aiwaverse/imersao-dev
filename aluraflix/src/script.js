function addMovie(){
  const fieldFavoriteMovie = document.querySelector("#movie");
  let favoriteMovie = fieldFavoriteMovie.value;
  if (favoriteMovie.endsWith(".jpg") || favoriteMovie.endsWith(".png")){
     showMovieOnScreen(favoriteMovie); 
  }
  else{
    alert("Invalid image!");
  }
  favoriteMovie = "";
}

function showMovieOnScreen(movie){
  const listMovies = document.querySelector("#movieList");
  const elementMovie = "<img src=" + movie + ">";
  listMovies.innerHTML += elementMovie;
}