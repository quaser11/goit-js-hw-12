import {Notify} from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import PixabayApiService from "./pixabay-api-service";
import ViewMoreBtnService from "./view-more-btn-service";


const searchForm = document.getElementById('search-form');
const cardsBlock = document.querySelector('.request-info-section__cards')

const pixabayApiService = new PixabayApiService();
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
    return `<div class="request-info-section__card">
        <div class="request-info-section__card__image">
                    <a href="${item.largeImageURL}" class="original-image"><img src="${item.webformatURL}" alt="" title="${item.tags}"/></a>
        </div>
        <div class="request-info-section__card__image__info">
          <div class="request-info-section__card__user__info">
            <div class='request-info-section__card__user__info__image'><img src="${item.userImageURL}" alt=""></div>
            <span class="request-info-section__card__user__info__name">${item.user}</span>
          </div>
          <div class="request-info-section__card__user__info__about">
            <div class="request-info-section__card__user__info__about__first">
              <div class="request-info-section__card__user__info__about__info">
                <div class="request-info-section__card__user__info__about__info__first__block">
                  <p style="margin:0;">Views: <span>${item.views}</span></p>
                  <p style="margin:0;">Downloads: <span>${item.downloads}</span></p>
                </div>
                <div class="request-info-section__card__user__info__about__info__second__block">
                  <p style="margin:0;">Likes: <span>${item.likes}</span></p>
                  <p style="margin:0;">Comments: <span>${item.comments}</span></p>
                </div>
              </div>
            </div>
            <div>
              <h6>Image Size</h6>
              <div class="request-info-section__card__user__info__about__image__size">${item.imageWidth}x${item.imageHeight}</div>
            </div>
          </div>
        </div>
        <div class="url__thumb">
          <a href="${item.pageURL}">Pixabay Image URL</a>
        </div>
      </div>`
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
    Notify.failure('Sorry, there are no images matching your search query. Please try again.')
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