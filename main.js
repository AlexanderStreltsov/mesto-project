(()=>{"use strict";var e=function(e){document.removeEventListener("keydown",n),document.removeEventListener("mousedown",r),e.classList.remove("popup_opened")},t=function(){return document.querySelector(".popup_opened")},n=function(n){"Escape"===n.key&&e(t())},r=function(n){var r=n.target.classList;(r.contains("popup")||r.contains("popup__close-button"))&&e(t())},o=function(e){document.addEventListener("keydown",n),document.addEventListener("mousedown",r),e.classList.add("popup_opened")},c={cardSelector:".cards__list-item",imageSelector:".cards__picture",nameSelector:".cards__title",likeClass:"cards__like-button",likeSelector:".cards__like-button",likeActiveClass:"cards__like-button_active",likeCountSelector:".cards__like-count",deleteClass:"cards__delete-button",deleteSelector:".cards__delete-button",deleteVisibleClass:"cards__delete-button_visible",imageOverlaySelector:".cards__overlay"},a=document.querySelector(".profile__title"),i=document.querySelector(".profile__subtitle"),l=document.querySelector(".profile__edit-button"),u=document.querySelector("#edit-popup"),s=u.querySelector(".form"),d=u.querySelector("#title"),f=u.querySelector("#job"),m=s.querySelector(".form__button"),v=document.querySelector("#card-template").content,p=document.querySelector(".cards__list"),y=document.querySelector(".profile__add-button"),_=document.querySelector("#add-popup"),b=_.querySelector(".form"),S=_.querySelector("#name-card"),h=_.querySelector("#link-img-card"),C=_.querySelector(".form__button"),g=document.querySelector("#image-viewer-popup"),q=g.querySelector(".image-viewer__picture"),k=g.querySelector(".image-viewer__caption"),L=document.querySelector(".profile__avatar"),E=document.querySelector("#edit-avatar-popup"),A=E.querySelector(".form"),w=E.querySelector("#url-avatar"),x=E.querySelector(".form__button"),I=document.querySelector("#confirm-action"),U=I.querySelector(".form"),D=I.querySelector(".form__button"),O={formSelector:".form",inputSelector:".form__input",errorClass:"form__input-error-message_visible",errorSelector:".form__input-error-message_visible",inputInvalidClass:"form__input_invalid",inputInvalidSelector:".form__input_invalid",buttonSelector:".form__button",buttonDisabledClass:"form__button_disabled"},j={baseUrl:"https://nomoreparties.co/v1/plus-cohort-8",headers:{"Content-type":"application/json",authorization:"45def5a2-c1e5-4149-8cae-fca78747b383"}},T=document.querySelector(".spinner"),P=document.querySelector(".content"),N=function(e){return e.ok?e.json():Promise.reject(e)},J=function(e,t){return Array.from(e.querySelectorAll(t))},H=function(e,t){return e.forEach((function(e){return e.classList.remove(t)}))},M=function(e,t,n,r){var o,c;e.textContent=n.likes.length,o=t,c=r.likeActiveClass,o.classList.toggle(c)},V=function(e,t,n,r,c,i){var l=v.querySelector(i.cardSelector).cloneNode(!0),u=l.querySelector(i.imageSelector),s=l.querySelector(i.imageOverlaySelector),d=l.querySelector(i.nameSelector),f=l.querySelector(i.likeSelector),m=l.querySelector(i.likeCountSelector),p=l.querySelector(i.deleteSelector);return l.setAttribute("data-card-id",e),u.src=r,u.alt=n,d.textContent=n,m.textContent=c.length,function(e){return e.some((function(e){return e._id===a.getAttribute("data-owner-id")}))}(c)&&f.classList.add(i.likeActiveClass),function(e){return e===a.getAttribute("data-owner-id")}(t)&&p.classList.add(i.deleteVisibleClass),s.addEventListener("click",(function(){!function(e,t){q.src=t,q.alt=e,k.textContent=e,o(g)}(n,r)})),f.addEventListener("click",(function(){!function(e,t,n,r,o){var c,a,i,l;i=t,l=r.likeActiveClass,i.classList.contains(l)?(c=e,a=o,fetch("".concat(a.baseUrl,"/cards/likes/").concat(c),{method:"DELETE",headers:a.headers}).then(N)).then((function(e){M(n,t,e,r)})).catch((function(e){return console.log(e)})):function(e,t){return fetch("".concat(t.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:t.headers}).then(N)}(e,o).then((function(e){M(n,t,e,r)})).catch((function(e){return console.log(e)}))}(e,f,m,i,j)})),p.addEventListener("click",(function(){D.setAttribute("data-card-id",e),o(I)})),l},z=function(e,t){switch(e){case"appendSomeCards":t.forEach((function(e){return p.append(e)}));break;case"prependOneCard":p.prepend(t);break;default:console.log("Insert type ".concat(e," not in select"))}},$=function(e,t,n){var r=e.querySelector(n.buttonSelector);!function(e){return e.some((function(e){return!e.validity.valid}))}(t)?function(e,t){e.classList.remove(t.buttonDisabledClass),e.disabled=!1}(r,n):function(e,t){e.classList.add(t.buttonDisabledClass),e.disabled=!0}(r,n)};function B(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var F,G=function(e,t){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];e.textContent=t,e.disabled=n},K=function(e){var t=J(e,O.errorSelector),n=J(e,O.inputInvalidSelector);H(t,O.errorClass),H(n,O.inputInvalidClass)};function Q(e){e?(T.classList.add("spinner_visible"),P.classList.add("content_hidden")):(T.classList.remove("spinner_visible"),P.classList.remove("content_hidden"))}l.addEventListener("click",(function(){d.value=a.textContent,f.value=i.textContent,K(u),$(u,[d,f],O),o(u)})),y.addEventListener("click",(function(){b.reset(),K(_),$(_,[S,h],O),o(_)})),L.addEventListener("click",(function(){A.reset(),K(E),$(E,[w],O),o(E)})),s.addEventListener("submit",(function(t){var n,r;t.preventDefault(),G(m,"Сохранение..."),(n={name:d.value,about:f.value},r=j,fetch("".concat(r.baseUrl,"/users/me"),{method:"PATCH",headers:r.headers,body:JSON.stringify(n)}).then(N)).then((function(t){a.textContent=t.name,i.textContent=t.about,e(u)})).catch((function(e){return console.log(e)})).finally((function(){return G(m,"Сохранение")}))})),b.addEventListener("submit",(function(t){var n,r;t.preventDefault(),G(C,"Сохранение..."),(n={name:S.value,link:h.value},r=j,fetch("".concat(r.baseUrl,"/cards"),{method:"POST",headers:r.headers,body:JSON.stringify(n)}).then(N)).then((function(t){var n=V(t._id,t.owner._id,t.name,t.link,t.likes,c);z("prependOneCard",n),e(_)})).catch((function(e){return console.log(e)})).finally((function(){return G(C,"Создать")}))})),A.addEventListener("submit",(function(t){var n,r;t.preventDefault(),G(x,"Сохранение..."),(n={avatar:w.value},r=j,fetch("".concat(r.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:r.headers,body:JSON.stringify(n)}).then(N)).then((function(t){L.style.backgroundImage="url(".concat(t.avatar,")"),e(E)})).catch((function(e){return console.log(e)})).finally((function(){return G(x,"Сохранить")}))})),U.addEventListener("submit",(function(t){return function(t,n,r){t.preventDefault(),G(D,"Удаление..."),function(e,t){return fetch("".concat(t.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:t.headers}).then(N)}(n,r).then((function(){document.querySelector('[data-card-id="'.concat(n,'"]')).remove(),e(I)})).catch((function(e){return console.log(e)})).finally((function(){return G(D,"Да",!1)}))}(t,D.getAttribute("data-card-id"),j)})),F=O,J(document,F.formSelector).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=J(e,t.inputSelector);n.forEach((function(r){r.addEventListener("input",(function(){!function(e,t,n){var r=e.querySelector("#error-".concat(t.id));t.validity.valid?function(e,t,n){e.classList.remove(n.inputInvalidClass),t.classList.remove(n.errorClass),t.textContent=""}(t,r,n):function(e,t,n,r){e.classList.add(r.inputInvalidClass),t.classList.add(r.errorClass),t.textContent=n}(t,r,t.validationMessage,n)}(e,r,t),$(e,n,t)}))}))}(e,F)})),Q(!0),Promise.all([function(e){return fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then(N)}(j),function(e){return fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then(N)}(j)]).then((function(e){var t,n,r,o=(r=2,function(e){if(Array.isArray(e))return e}(n=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c=[],a=!0,i=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(c.push(r.value),!t||c.length!==t);a=!0);}catch(e){i=!0,o=e}finally{try{a||null==n.return||n.return()}finally{if(i)throw o}}return c}}(n,r)||function(e,t){if(e){if("string"==typeof e)return B(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?B(e,t):void 0}}(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),l=o[0],u=o[1];t=l,L.style.backgroundImage="url(".concat(t.avatar),a.textContent=t.name,a.setAttribute("data-owner-id",t._id),i.textContent=t.about,function(e){var t=e.map((function(e){return V(e._id,e.owner._id,e.name,e.link,e.likes,c)}));z("appendSomeCards",t)}(u)})).catch((function(e){return console.log(e)})).finally((function(){return Q(!1)}))})();