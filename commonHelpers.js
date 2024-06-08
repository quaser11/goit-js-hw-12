import{a as g,S as _,n as c}from"./assets/vendor-5f12c9c8.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function i(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=i(r);fetch(r.href,s)}})();const h="https://pixabay.com/api/",p="44168245-b85e0b025332670cfa54a187d";class m{constructor(t){this.query=t,this.page=1}async fetchByQuery(){const i={key:p,q:this.query,image_type:"photo",orientation:"horizontal",safesearch:"true",page:this.page,per_page:15};return{...(await g.get(h,{params:i})).data,perPage:15}}resetPage(){this.page=1}incrementPage(){this.page+=1}}class y{constructor(t,i=!0){this.selector=t,i&&this.hide()}getRef(){const t=document.querySelector(`${this.selector}`),i=t.querySelector(".spinner-border"),n=t.querySelector(".btn-primary__text");return{viewMoreBtn:t,spinner:i,text:n}}disabled(){const t=this.getRef().viewMoreBtn,i=this.getRef().text,n=this.getRef().spinner;t.classList.remove("is-hidden"),i.innerHTML="Loading",t.disabled=!0,n.classList.remove("is-hidden")}enabled(){const t=this.getRef().viewMoreBtn,i=this.getRef().text,n=this.getRef().spinner;t.disabled=!1,i.innerHTML="View More",n.classList.add("is-hidden")}hide(){this.getRef().viewMoreBtn.classList.add("is-hidden")}}function v(e){return`<div class="request-info-section__card">
        <div class="request-info-section__card__image">
                    <a href="${e.largeImageURL}" class="original-image"><img src="${e.webformatURL}" alt="" title="${e.tags}"/></a>
        </div>
        <div class="request-info-section__card__image__info">
          <div class="request-info-section__card__user__info">
            <div class='request-info-section__card__user__info__image'><img src="${e.userImageURL}" alt=""></div>
            <span class="request-info-section__card__user__info__name">${e.user}</span>
          </div>
          <div class="request-info-section__card__user__info__about">
            <div class="request-info-section__card__user__info__about__first">
              <div class="request-info-section__card__user__info__about__info">
                <div class="request-info-section__card__user__info__about__info__first__block">
                  <p style="margin:0;">Views: <span>${e.views}</span></p>
                  <p style="margin:0;">Downloads: <span>${e.downloads}</span></p>
                </div>
                <div class="request-info-section__card__user__info__about__info__second__block">
                  <p style="margin:0;">Likes: <span>${e.likes}</span></p>
                  <p style="margin:0;">Comments: <span>${e.comments}</span></p>
                </div>
              </div>
            </div>
            <div>
              <h6>Image Size</h6>
              <div class="request-info-section__card__user__info__about__image__size">${e.imageWidth}x${e.imageHeight}</div>
            </div>
          </div>
        </div>
        <div class="url__thumb">
          <a href="${e.pageURL}">Pixabay Image URL</a>
        </div>
      </div>`}const b=document.getElementById("search-form"),u=document.querySelector(".request-info-section__cards"),a=new m,o=new y(".btn-primary");b.addEventListener("submit",q);o.getRef().viewMoreBtn.addEventListener("click",w);function q(e){e.preventDefault();const t=document.getElementsByName("searchQuery")[0].value;t&&(a.query=t,u.innerHTML="",a.resetPage(),L())}function l(e){return e.map(i=>v(i)).join("")}function w(){a.incrementPage(),B()}function L(e){o.disabled(),a.fetchByQuery().then(t=>{f(t),u.insertAdjacentHTML("beforeend",l(t.hits));var i=new _(".request-info-section__cards .original-image",{captionDelay:250});i.refresh(),o.enabled()}).catch(t=>c.Notify.failure("failure"))}function B(){o.disabled(),a.fetchByQuery().then(e=>{f(e),u.insertAdjacentHTML("beforeend",l(e.hits));var t=new _(".request-info-section__cards .original-image",{captionDelay:250});t.refresh(),o.enabled(),M()}).catch(e=>c.Notify.failure("failure"))}function f(e){if(Number(a.page)>=Math.ceil(Number(e.totalHits)/e.perPage)&&(c.Notify.warning("We're sorry, but you've reached the end of search results."),o.hide()),e.hits.length===0){c.Notify.failure("Sorry, there are no img matching your search query. Please try again."),o.hide();return}}function M(){const{height:e}=document.querySelector(".request-info-section__cards").firstElementChild.getBoundingClientRect();window.scrollBy({top:e*1.6,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
