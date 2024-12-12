import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImg } from './js/pixabay-api';
import { createGallery, clearGallery } from './js/render-functions';

const form = document.querySelector('.form');
const loader = document.querySelector('.loader');
const gallery = document.querySelector('.gallery');
const btnMore = document.querySelector('.load-more');

let lightbox = null;
let currentPage = 1;
let perPage = 15;
let currentQuery = '';

loader.hidden = true;
btnMore.hidden = true;

form.addEventListener('submit', searchImg);
btnMore.addEventListener('click', addMoreImg);

async function searchImg(event) {
  event.preventDefault();
  currentQuery = event.target.elements.search.value.trim();
  currentPage = 1;
  if (!currentQuery) {
    iziToast.warning({
      message: 'Warning! The form is empty, please fill searching form.',
      position: 'topRight',
    });
    form.reset();
    return;
  }

    clearGallery();
    form.reset();
    
  btnMore.hidden = true;
  loader.hidden = false;

  try {
    const data = await fetchImg(currentQuery, currentPage);

    if (data.hits.length === 0) {
      iziToast.error({
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        backgroundColor: '#ef4040',
        messageColor: '#fafafb',
        messageSize: '16px',
        titleColor: '#ffffff',
        maxWidth: '322px',
      });
      return;
    }

    createGallery(data.hits);
    if (data.hits.length === perPage) {
      btnMore.hidden = false;
    }

    if (!lightbox) {
      lightbox = new SimpleLightbox('.gallery-link', {
        captionsData: 'alt',
        captionDelay: 250,
      });
    } else {
      lightbox.refresh();
    }
  } catch (error) {
    iziToast.error({
      message: 'Error!',
      position: 'topRight',
    });
  } finally {
    loader.hidden = true;
  }
}

async function addMoreImg() {
  currentPage += 1;
  loader.hidden = false;
  try {
    const data = await fetchImg(currentQuery, currentPage);
    const maxPage = Math.ceil(data.totalHits / perPage);
    createGallery(data.hits);
    lightbox.refresh();

    const firstCard = gallery.firstElementChild;
    if (firstCard) {
      const { height: cardHeight } = firstCard.getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }

    if (currentPage === maxPage) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      btnMore.hidden = true;
    }
  } catch (error) {
    iziToast.error({
      message: 'Error!',
      position: 'topRight',
    });
  } finally {
    loader.hidden = true;
  }
}