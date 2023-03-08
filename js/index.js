var category = "mmorpg";
var allGames = [];
var allGamesDetails = [];
var gameId;
async function getGames() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '542b233764msh11fe6b77d5d2390p12c40fjsnb9ce30eb974b',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
    const games = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, options);
    const finalResponse = await games.json();
    allGames = finalResponse
    displayGames();
}
function displayGames() {
    let gamesBag = "";
    for (let i = 0; i < allGames.length; i++) {
        gamesBag += `
            <div class="col-md-4" gameId = "${allGames[i].id}">
                <div class ="card" gameId = "${allGames[i].id}">
                    <div class="game-img" gameId = "${allGames[i].id}">
                        <img gameId = "${allGames[i].id}" src="${allGames[i].thumbnail}" class="w-100 rounded-3" alt="">
                    </div>
                    <div class="game-des pt-3 px-3 text-center" gameId = "${allGames[i].id}">
                        <div class="desc-header d-flex justify-content-between" gameId = "${allGames[i].id}" >
                            <h6 gameId = "${allGames[i].id}" class="text-white" >${allGames[i].title}</h6>
                            <P gameId = "${allGames[i].id}" class="free">Free</P>
                        </div>
                        <div  gameId = "${allGames[i].id}" class = "desc">
                            <p gameId = "${allGames[i].id}" >${allGames[i].short_description}</p> 
                        </div>
                    </div>
                    <footer gameId = "${allGames[i].id}"  class=" d-flex justify-content-between px-2 pt-2">
                            <p gameId = "${allGames[i].id}" >${allGames[i].genre}</p>
                            <p gameId = "${allGames[i].id}" >${allGames[i].platform}</p>  
                </footer>
                </div>
                
            </div>
        `
        
        document.querySelector(".first-row").innerHTML = gamesBag;

        $(".col-md-4").click(e => {

            gameId = e.target.attributes[0].value;
            console.log(gameId);
        })
        $(".col-md-4").click(async function getGamesDetails(gameX) {
        document.querySelector("#spinner").classList.remove("d-none")
            gameX = gameId;
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '542b233764msh11fe6b77d5d2390p12c40fjsnb9ce30eb974b',
                    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
                }
            };
            const details = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameX}`, options);
            allGamesDetails = await details.json();
            document.querySelector(".cards").classList.add("d-none")
            document.querySelector(".details").classList.replace("d-none","d-block")
            displayGamesDetails()
            $(".fa-xmark").click(function(e){
                document.querySelector(".details").classList.add("d-none")
                document.querySelector(".cards").classList.replace("d-none","d-block")
            })
            document.querySelector("#spinner").classList.add("d-none")
        })
    }
}

getGames()

$("li a").click(function (e) {

    category = e.target.attributes.myref.value;
    getGames(category)

    displayGames();
    $("li a").css("color", "white")
    $(e.target).css("color", "rgb(7, 144, 195)")

})


function displayGamesDetails() {
    
    let gamesDetailsBag = `
    <div class="col-md-4">
        <img src="${allGamesDetails.thumbnail}" alt="" class="w-100">
    </div>
    <div class="col-md-8">
        <h6><span class="fw-bold text-white-50">Title : </span> ${allGamesDetails.title}</h6>
        <p><span class="fw-bold text-white-50">Category : </span> ${allGamesDetails.genre}</p>
        <p><span class="fw-bold text-white-50">Platform : </span> ${allGamesDetails.platform}</p>
        <p><span class="fw-bold text-white-50">Status : </span>${allGamesDetails.status}</p>
        <p>${allGamesDetails.short_description}</p>
        <button class="show-game btn btn-outline-warning px-5 py-3"><a href= "${allGamesDetails.game_url}">Show Game</a></button>
    </div>
    `

        document.querySelector(".sec-row").innerHTML = gamesDetailsBag
    
}
$(window).scroll(() => {
    changeNav();
})
function changeNav(){
    if ($(window).scrollTop() > $("header").outerHeight(true)){
        $(".navbar").css("position", "fixed")
        $(".navbar").css("top", "34px")
    }else{
        $(".navbar").css("position", "absolute")
        $(".navbar").css("top", "150px")
    }
}
changeNav();