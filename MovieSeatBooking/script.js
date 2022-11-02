const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count") ;
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
populateUI();

let ticketPrice = +movieSelect.value; //Adding + in the front typecasts from string to number

// Save selected Movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex',movieIndex);
    localStorage.setItem('selectedMoviePrice',moviePrice);
}

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll(".row .seat.selected");

    // Copy selected seats to an array
    // Map through the array
    // return a new array indexes

    const seatsIndex = [...selectedSeats].map(seat => 
        [...seats].indexOf(seat));
    localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex));
    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

// Get data from local storage and populate UI
function populateUI() {
    const seletedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    
    if(seletedSeats !== null && seletedSeats.length >0 ) {
        seats.forEach((seat, index) => {
            if(seletedSeats.indexOf(index) > -1 ) {
                seat.classList.add('selected');
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
    
}

// Movie select element 
movieSelect.addEventListener('change', (event) => {
    ticketPrice = +event.target.value;
    setMovieData(event.target.selectedIndex, event.target.value);
    updateSelectedCount();
})

// Seat click event
container.addEventListener('click', (event) => {
    if(
        event.target.classList.contains('seat') && 
        !event.target.classList.contains('occupied') 
    ) {
        event.target.classList.toggle('selected');
        updateSelectedCount();
    }
})

// Initial count and total set
updateSelectedCount();