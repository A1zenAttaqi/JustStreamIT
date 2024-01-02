const homeUrl = "http://localhost:8000/api/v1";

document.addEventListener("DOMContentLoaded", async function () {
  const categories = ["best-movies", "Sci-Fi", "Mystery", "Romance"]; 
  const itemsPerPage = 4;

  try {
    const bestMovieId = await getBestMovieId();
    const bestMovie = await getMovieDetails(bestMovieId);
    updateHeroSection(bestMovie);
<<<<<<< HEAD

    const voirPlusButton = document.querySelector('.hero__play_button.modal-trigger');
    if (voirPlusButton) {
      voirPlusButton.dataset.movieId = bestMovieId;
    }

=======
>>>>>>> 2be4193a055802cfd63e48b61e94c8f054153978
    for (const category of categories) {
      populateCarousel(`${category}-carousel`, category);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

<<<<<<< HEAD
document.addEventListener('click', async (event) => {
  const modalTrigger = event.target.closest('.modal-trigger');
  
  if (modalTrigger) {
    event.preventDefault();
    const movieId = modalTrigger.dataset.movieId;
    const movieDetails = await getMovieDetails(movieId);
    showMovieModal(movieDetails);
  }
});


=======
>>>>>>> 2be4193a055802cfd63e48b61e94c8f054153978
async function getBestMovieId() {
  try {
    const url = `${homeUrl}/titles/?format=json&sort_by=-imdb_score&page=1`;
    const response = await fetch(url);
    const data = await response.json();

<<<<<<< HEAD
=======
    // Assuming the first result is the best movie
>>>>>>> 2be4193a055802cfd63e48b61e94c8f054153978
    const bestMovieId = data.results[0].id;

    return bestMovieId;
  } catch (error) {
    throw new Error("Failed to get the best movie ID.");
  }
}

async function getMovieDetails(movieId) {
  try {
    const url = `${homeUrl}/titles/${movieId}`;
    const response = await fetch(url);
    const movieDetails = await response.json();

    return movieDetails;
  } catch (error) {
    throw new Error("Failed to get the movie details.");
  }
}

function updateHeroSection(movie) {
  const heroPoster = document.getElementById('hero-poster');
  const heroTitle = document.getElementById('hero-title');
  const heroSummary = document.getElementById('hero-summary');

  if (!heroPoster || !heroTitle || !heroSummary) {
    console.error('One or more elements in the hero section not found.');
    return;
  }

  heroPoster.src = movie.image_url;
  heroTitle.textContent = movie.title;
  heroSummary.textContent = movie.description;
}
async function getAllData(category) {
  try {
    const url1 = await createUrls(category, 1);
    const url2 = await createUrls(category, 2);

    const response1 = await fetch(url1);
    const response2 = await fetch(url2);

    const data1 = await response1.json();
    const data2 = await response2.json();

    const movies = [...data1.results.slice(0, 5), ...data2.results.slice(0, 2)];

    return movies;
  } catch (error) {
    throw new Error("Failed to get the data of the URLs.");
  }
}
async function createUrls(category, page) {
  try {
    let url;

    if (category === "best-movies") {
      url = `http://localhost:8000/api/v1/titles/?format=json&sort_by=-imdb_score&page=${page}`;
    } else {
      url = `http://localhost:8000/api/v1/titles/?format=json&genre=${category}&sort_by=-imdb_score&page=${page}`;
    }

    return url;

  } catch (error) {
    throw new Error("Failed to create URLs.");
  }
}

async function populateCarousel(carouselId, category) {
  const carousel = document.getElementById(carouselId);
<<<<<<< HEAD
  try {

=======

  try {
>>>>>>> 2be4193a055802cfd63e48b61e94c8f054153978
    const movies = await getAllData(category);

    if (!carousel) {
      console.error(`Carousel with ID ${carouselId} not found.`);
      return;
    }

    carousel.innerHTML = "";

    movies.forEach((movie, index) => {
      if (movie) {
        const item = createMovieItem(movie);
        carousel.appendChild(item);
      } else {
        console.error(`Movie at index ${index} is undefined.`);
      }
    });

    const leftArrow = document.getElementById(`${category}-prev-slide`);
    const rightArrow = document.getElementById(`${category}-next-slide`);

    scrollCarousel(carousel, 0);

    leftArrow.addEventListener('click', () => {
      scrollCarousel(carousel, -1);
    });

    rightArrow.addEventListener('click', () => {
      scrollCarousel(carousel, 1);
    });
  } catch (error) {
    console.error(`Error fetching ${category} data:`, error);
  }
}

function createMovieItem(movie) {

  const item = document.createElement('div');
  item.classList.add('item');

  const imageUrl = movie.image_url;
  const title = movie.title;

<<<<<<< HEAD
  item.innerHTML =  `
  <a href="#" class="modal-trigger" data-movie-id="${movie.id}">
    <img src="${imageUrl}" alt="${title}" class="image-item">
  </a>
`;
=======
  item.innerHTML = `
    <a href="#">
      <img src="${imageUrl}" alt="${title}" class="image-item">
    </a>
  `;
>>>>>>> 2be4193a055802cfd63e48b61e94c8f054153978

  return item;
}

<<<<<<< HEAD
function showMovieModal(movieDetails) {

  const modalContainer = document.getElementById('modalContainer');
  const modal = document.createElement('div');
  modal.classList.add('modal');

  const actorsList = movieDetails.actors.join(', ');

  modal.innerHTML = `
    <div class="modal-content">
      <img src="${movieDetails.image_url}" alt="${movieDetails.title}" class="modal-poster">
      <h2>${movieDetails.title}</h2>
      <p><strong>Genre:</strong> ${movieDetails.genres.join(', ')}</p>
      <p><strong>Date de sortie:</strong> ${movieDetails.date_published}</p>
      <p><strong>Rated:</strong> ${movieDetails.rated}</p>
      <p><strong>IMDb Score:</strong> ${movieDetails.imdb_score}</p>
      <p><strong>Réalisateur:</strong> ${movieDetails.directors.join(', ')}</p>
      <p><strong>Acteurs:</strong> ${actorsList}</p>
      <p><strong>Durée:</strong> ${movieDetails.duration} minutes</p>
      <p><strong>Pays d'origine:</strong> ${movieDetails.countries.join(', ')}</p>
      <p><strong>Box Office:</strong> ${movieDetails.worldwide_gross_income || 'N/A'}</p>
      <p><strong>Résumé:</strong> ${movieDetails.description}</p>

      <button class="modal-close">Fermer</button>
    </div>
  `;

  modalContainer.innerHTML = ''; 
  modalContainer.appendChild(modal);

  modal.style.display = 'block';

  const modalCloseButton = modal.querySelector('.modal-close');
  modalCloseButton.addEventListener('click', () => {
    modal.style.display = 'none';
    modalContainer.innerHTML = ''; 
    console.log('Modal closed');
  });
}
=======
>>>>>>> 2be4193a055802cfd63e48b61e94c8f054153978

function scrollCarousel(container, direction) {
  const items = container.querySelectorAll('.item');
  const scrollAmount = items[0].offsetWidth * direction;

  const currentScroll = container.scrollLeft;
  const newScroll = currentScroll + scrollAmount;

  container.scrollTo({
    left: newScroll,
    behavior: 'smooth'
  });
}

<<<<<<< HEAD
=======
/* async function fetchAndDisplayTopRatedMovie() {
    try {
        const response = await fetch(`${homeUrl}/titles/?format=json&sort_by=-imdb_score`);
        const data = await response.json();

        if (data.results.length > 0) {
            const topRatedMovie = data.results[0];
            // Assuming you have elements with IDs 'hero-title' and 'hero-poster'
            document.getElementById('hero-title').textContent = topRatedMovie.title;
            document.getElementById('hero-poster').src = topRatedMovie.image_url;
        }
    } catch (error) {
        console.error('Error fetching top-rated movie:', error);
    }
} */


// Function to scroll the carousel
>>>>>>> 2be4193a055802cfd63e48b61e94c8f054153978
