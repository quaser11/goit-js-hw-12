export default function renderMarkup(item){
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
}