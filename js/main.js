$(document).ready(() => {
    var test = sessionStorage.getItem("apiKey");
    if (test) {
        $("#searchKey").val(test);
        console.log("key; " + test);
    } else {
        console.log("key is empty");
    }

    $("#searchForm").on("submit", (e) => {

        let searchText = $("#searchText").val();
        key = ($("#searchKey").val() || sessionStorage.getItem("apiKey"));
        sessionStorage.setItem("apiKey", key);
        console.log("key: " + key);
        getMovies(searchText);
        e.preventDefault();
    });
});

function getMovies(sText) {




    axios.get("https://www.omdbapi.com/?apikey=" + key + "&s=" + sText)

        .then((response) => {
            console.log(response);
            console.log(response.data.Response);

            if(response.data.Response ==="True"){
                console.log("truetrueture");
                let movies = response.data.Search;
                let output = "";
                $.each(movies, (index, movie) => {
                    output += `
                <div class="col-md-3">
                    <div class="well text-center">
                    <img src="${movie.Poster}" >
                    <h5>${movie.Title}</h5>
                    <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                    </div>
                </div>
                `
                });
    
                $("#movies").html(output);
                
            } else {
                
                alert ("movie not found"); 
                $("#searchText").val("");

            }
            
           

        })
        .catch((err) => {
            console.log(err);
        });
}



function movieSelected(id) {

    sessionStorage.setItem("movieId", id);
    window.location = "movie.html";
    return false;
}

function getMovie() {
    let movieID = sessionStorage.getItem("movieId");
    var key = sessionStorage.getItem("apiKey");
    console.log("movie id " + movieID)
    axios.get("https://www.omdbapi.com/?&apikey=" + key + "&i=" + movieID)

        .then((response) => {
            console.log(response);
            let movie = response.data;
            let output = `
                <div class="row">
                    <div class="col-md-4">
                        <img src="${movie.Poster}" class="thumbnail">
                    </div>
                    <div class="col-md-8">
                        <h2>${movie.Title}</h2>
                        <ul class="list-group">
                            <li class="list-group-item"><strong>Genre: </strong>${movie.Genre}</li>
                            <li class="list-group-item"><strong>Released: </strong>${movie.Released}</li>
                            <li class="list-group-item"><strong>Rating: </strong>${movie.Rated}</li>
                            <li class="list-group-item"><strong>IMDB Rating: </strong>${movie.GenreimdbRating}</li>
                            <li class="list-group-item"><strong>Director: </strong>${movie.Director}</li>
                            <li class="list-group-item"><strong>Writer: </strong>${movie.Writer}</li>
                            <li class="list-group-item"><strong>Actors: </strong>${movie.Actors}</li>
                        
                        </ul>
                    </div>
                </div>
                <div class="row">
                    <div class="well">
                        <h3>Plot</h3>
                        ${movie.Plot}
                        <hr>
                        <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
                        <a href="index.html" class="btn btn-success">Go Back to Search</a>
                    </div>
                </div>
            `;

            $("#movie").html(output);
        })
        .catch((err) => {
            console.log(err);
        });
}