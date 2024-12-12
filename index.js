import{a as b,i as a,S as w}from"./assets/vendor-DEenWwFD.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const f of s.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&o(f)}).observe(document,{childList:!0,subtree:!0});function i(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=i(e);fetch(e.href,s)}})();const p="47484582-92e080108706ddb17b6ec6a5b",m=async(r,t=1)=>{const i=new URLSearchParams({key:p,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:t});return(await b.get(`https://pixabay.com/api/?key=${p}&q=${i}`)).data};function g(r){const t=document.querySelector(".gallery"),i=r.map(o=>`<li class="li-item">
                    <a class="gallery-link" href="${o.largeImageURL}">
                    <img class="gallery-img" src="${o.webformatURL}" alt="${o.tags}" width="360">
                    </a>
                <ul class="image-descr">
                    <li class>
                        <h2 class="title">Likes</h2>
                        <p>${o.likes}</p>
                    </li>
                    <li>
                        <h2 class="title">Views</h2>
                        <p>${o.views}</p>
                    </li>
                    <li>
                        <h2 class="title">Comments</h2>
                        <p>${o.comments}</p>
                    </li>
                    <li>
                        <h2 class="title">Downloads</h2>
                        <p>${o.downloads}</p>
                    </li>
                </ul>
                </li>`).join("");t.insertAdjacentHTML("beforeend",i)}function L(){const r=document.querySelector(".gallery");r.innerHTML=""}const h=document.querySelector(".form"),l=document.querySelector(".loader"),S=document.querySelector(".gallery"),c=document.querySelector(".load-more");let d=null,n=1,y=15,u="";l.hidden=!0;c.hidden=!0;h.addEventListener("submit",q);c.addEventListener("click",P);async function q(r){if(r.preventDefault(),u=r.target.elements.search.value.trim(),n=1,!u){a.warning({message:"Warning! The form is empty, please fill searching form.",position:"topRight"}),h.reset();return}L(),h.reset(),c.hidden=!0,l.hidden=!1;try{const t=await m(u,n);if(t.hits.length===0){a.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",backgroundColor:"#ef4040",messageColor:"#fafafb",messageSize:"16px",titleColor:"#ffffff",maxWidth:"322px"});return}g(t.hits),t.hits.length===y&&(c.hidden=!1),d?d.refresh():d=new w(".gallery-link",{captionsData:"alt",captionDelay:250})}catch{a.error({message:"Error!",position:"topRight"})}finally{l.hidden=!0}}async function P(){n+=1,l.hidden=!1;try{const r=await m(u,n),t=Math.ceil(r.totalHits/y);g(r.hits),d.refresh();const i=S.firstElementChild;if(i){const{height:o}=i.getBoundingClientRect();window.scrollBy({top:o*2,behavior:"smooth"})}n===t&&(a.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),c.hidden=!0)}catch{a.error({message:"Error!",position:"topRight"})}finally{l.hidden=!0}}
//# sourceMappingURL=index.js.map
