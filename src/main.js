import {Notify} from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import PixabayApi from "./js/pixabay-api.js";
import ViewMoreBtnService from "./js/view-more-btn-service.js";
import './css/index.css'
import 'modern-normalize'
import renderMarkup from './js/render-functions.js'


const searchForm = document.getElementById('search-form');
const cardsBlock = document.querySelector('.request-info-section__cards')

const pixabayApiService = new PixabayApi();
const viewMoreBtnService = new ViewMoreBtnService('.btn-primary');

searchForm.addEventListener('submit', onSubmit)
viewMoreBtnService.getRef().viewMoreBtn.addEventListener('click', onViewMoreBtnClick)

function onSubmit(e) {
  e.preventDefault()
  const query = document.getElementsByName('searchQuery')[0].value;

  if (!query) return;
  pixabayApiService.query = query

  cardsBlock.innerHTML = '';
  pixabayApiService.resetPage()

  getInfoAndAppend()
}


function makeMarkUp(arr) {
  const result = arr.map((item) => {
    return renderMarkup(item)
  }).join('')

  return result
}

function onViewMoreBtnClick() {
  pixabayApiService.incrementPage()
  getInfoAndAppendOnViewMoreBtn()
}

function getInfoAndAppend(scroll) {
  viewMoreBtnService.disabled()
  pixabayApiService.fetchByQuery().then(response => {
    checkOn(response)
    cardsBlock.insertAdjacentHTML('beforeend', makeMarkUp(response.hits))
    var lightbox = new SimpleLightbox('.request-info-section__cards .original-image', {captionDelay: 250})
    lightbox.refresh()
    viewMoreBtnService.enabled()
  }).catch(error => Notify.failure('failure'))
}

function getInfoAndAppendOnViewMoreBtn() {
  viewMoreBtnService.disabled()
  pixabayApiService.fetchByQuery().then(response => {
    checkOn(response)
    cardsBlock.insertAdjacentHTML('beforeend', makeMarkUp(response.hits))
    var lightbox = new SimpleLightbox('.request-info-section__cards .original-image', {captionDelay: 250})
    lightbox.refresh()
    viewMoreBtnService.enabled()
    doSmoothScroll()
  }).catch(error => Notify.failure('failure'))
}
function checkOn(response){
  if (Number(pixabayApiService.page) >= Math.ceil(Number(response.totalHits) / response.perPage)) {
    Notify.warning('We\'re sorry, but you\'ve reached the end of search results.')
    viewMoreBtnService.hide()
  }
  if (response.hits.length === 0) {
    Notify.failure('Sorry, there are no img matching your search query. Please try again.')
    viewMoreBtnService.hide()
    return
  }
}
function doSmoothScroll() {
  const {height: cardHeight} = document
    .querySelector(".request-info-section__cards")
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top:cardHeight / 3,
    behavior: "smooth",
  });
}