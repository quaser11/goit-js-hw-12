import{a as g,S as u,n as c}from"./assets/vendor-5f12c9c8.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const h="https://pixabay.com/api/",p="44168245-b85e0b025332670cfa54a187d";class m{constructor(e){this.query=e,this.page=1}async fetchByQuery(){const t={key:p,q:this.query,image_type:"photo",orientation:"horizontal",safesearch:"true",page:this.page,per_page:40};return{...(await g.get(h,{params:t})).data,perPage:40}}resetPage(){this.page=1}incrementPage(){this.page+=1}}class y{constructor(e,t=!0){this.selector=e,t&&this.hide()}getRef(){const e=document.querySelector(`${this.selector}`),t=e.querySelector(".spinner-border"),n=e.querySelector(".btn-primary__text");return{viewMoreBtn:e,spinner:t,text:n}}disabled(){const e=this.getRef().viewMoreBtn,t=this.getRef().text,n=this.getRef().spinner;e.classList.remove("is-hidden"),t.innerHTML="Loading",e.disabled=!0,n.classList.remove("is-hidden")}enabled(){const e=this.getRef().viewMoreBtn,t=this.getRef().text,n=this.getRef().spinner;e.disabled=!1,t.innerHTML="View More",n.classList.add("is-hidden")}hide(){this.getRef().viewMoreBtn.classList.add("is-hidden")}}const v=document.getElementById("search-form"),_=document.querySelector(".request-info-section__cards"),a=new m,o=new y(".btn-primary");v.addEventListener("submit",b);o.getRef().viewMoreBtn.addEventListener("click",q);function b(i){i.preventDefault();const e=document.getElementsByName("searchQuery")[0].value;e&&(a.query=e,_.innerHTML="",a.resetPage(),w())}function l(i){return i.map(t=>`<div class="request-info-section__card">
        <div class="request-info-section__card__image">
                    <a href="${t.largeImageURL}" class="original-image"><img src="${t.webformatURL}" alt="" title="${t.tags}"/></a>
        </div>
        <div class="request-info-section__card__image__info">
          <div class="request-info-section__card__user__info">
            <div class='request-info-section__card__user__info__image'><img src="${t.userImageURL}" alt=""></div>
            <span class="request-info-section__card__user__info__name">${t.user}</span>
          </div>
          <div class="request-info-section__card__user__info__about">
            <div class="request-info-section__card__user__info__about__first">
              <div class="request-info-section__card__user__info__about__info">
                <div class="request-info-section__card__user__info__about__info__first__block">
                  <p style="margin:0;">Views: <span>${t.views}</span></p>
                  <p style="margin:0;">Downloads: <span>${t.downloads}</span></p>
                </div>
                <div class="request-info-section__card__user__info__about__info__second__block">
                  <p style="margin:0;">Likes: <span>${t.likes}</span></p>
                  <p style="margin:0;">Comments: <span>${t.comments}</span></p>
                </div>
              </div>
            </div>
            <div>
              <h6>Image Size</h6>
              <div class="request-info-section__card__user__info__about__image__size">${t.imageWidth}x${t.imageHeight}</div>
            </div>
          </div>
        </div>
        <div class="url__thumb">
          <a href="${t.pageURL}">Pixabay Image URL</a>
        </div>
      </div>`).join("")}function q(){a.incrementPage(),L()}function w(i){o.disabled(),a.fetchByQuery().then(e=>{f(e),_.insertAdjacentHTML("beforeend",l(e.hits));var t=new u(".request-info-section__cards .original-image",{captionDelay:250});t.refresh(),o.enabled()}).catch(e=>c.Notify.failure("failure"))}function L(){o.disabled(),a.fetchByQuery().then(i=>{f(i),_.insertAdjacentHTML("beforeend",l(i.hits));var e=new u(".request-info-section__cards .original-image",{captionDelay:250});e.refresh(),o.enabled(),B()}).catch(i=>c.Notify.failure("failure"))}function f(i){if(Number(a.page)>=Math.ceil(Number(i.totalHits)/i.perPage)&&(c.Notify.warning("We're sorry, but you've reached the end of search results."),o.hide()),i.hits.length===0){c.Notify.failure("Sorry, there are no images matching your search query. Please try again."),o.hide();return}}function B(){const{height:i}=document.querySelector(".request-info-section__cards").firstElementChild.getBoundingClientRect();window.scrollBy({top:i/3,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
