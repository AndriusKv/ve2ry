!function e(t,n,a){function r(s,o){if(!n[s]){if(!t[s]){var l="function"==typeof require&&require;if(!o&&l)return l(s,!0);if(i)return i(s,!0);var u=new Error("Cannot find module '"+s+"'");throw u.code="MODULE_NOT_FOUND",u}var c=n[s]={exports:{}};t[s][0].call(c.exports,function(e){var n=t[s][1][e];return r(n?n:e)},c,c.exports,e,t,n,a)}return n[s].exports}for(var i="function"==typeof require&&require,s=0;s<a.length;s++)r(a[s]);return r}({1:[function(e,t,n){"use strict";function a(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function r(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function i(){var e=new Worker("js/workers/worker1.js");return e.onmessage=function(e){var t,a=e.data;if("init"===a.action)return void(n.worker=b=i());var o=s();(t=o.tracks).push.apply(t,r(a.tracks)),g.init(o,"list",!1)},e.onerror=function(e){console.log(e)},e}function s(){var e=y.get("local-files");return e?e:y.create({id:"local-files",title:"Local files"})}function o(e){return new Promise(function(t){var n=URL.createObjectURL(e),a=new Audio(n);a.preload="metadata",a.addEventListener("loadedmetadata",function r(){var e=p.formatTime(a.duration);a.removeEventListener("loadedmetadata",r),a=null,n=URL.revokeObjectURL(n),t(e)})})}function l(e){return e.slice(0,e.lastIndexOf("."))}function u(e,t){var n=new Audio;return e.reduce(function(e,a){var r=l(a.name.trim()),i=t.some(function(e){return e.name===r});return!i&&n.canPlayType(a.type)&&e.push({name:r,audioTrack:a}),e},[])}function c(e){return new Promise(function(t){parse_audio_metadata(e,function(e){t(e)})})}function d(e,t,n){return e.length?Promise.all([c(e[0].audioTrack),o(e[0].audioTrack)]).then(function(a){return t.push({index:n+t.length,title:a[0].title.trim(),artist:a[0].artist?a[0].artist.trim():"",album:a[0].album?a[0].album.trim():"",name:e[0].name,thumbnail:a[0].picture,audioTrack:e[0].audioTrack,duration:a[1]}),e.splice(0,1),k.setAttrValue("value",t.length),e.length?d(e,t,n):t}):Promise.resolve(e)}function f(e){var t=s(),n=t.tracks,a=u([].concat(r(e)),n);k.setAttrValue("max",a.length),k.toggle(),d(a,[],n.length).then(function(e){var a;return k.toggle(),e.length?((a=t.tracks).push.apply(a,r(e)),document.getElementById("js-"+t.id)?g.appendTo(t,e,"list",!0):g.init(t,"list",!0),void b.postMessage({action:"update",playlist:n})):void h.showNotice("No valid images found")})["catch"](function(e){console.log(e)})}Object.defineProperty(n,"__esModule",{value:!0}),n.worker=n.addTracks=void 0;var p=e("./main.js"),v=e("./playlist/playlist.js"),y=a(v),m=e("./playlist/playlist.manage.js"),g=a(m),j=e("./playlist/playlist.add.js"),h=a(j),b=i(),k=function(){function e(e,t){n.setAttribute(e,t)}function t(){n.classList.toggle("show"),document.getElementById("js-local-notice").classList.toggle("show")}var n=document.getElementById("js-file-progress");return{toggle:t,setAttrValue:e}}();n.addTracks=f,n.worker=b},{"./main.js":2,"./playlist/playlist.add.js":8,"./playlist/playlist.js":9,"./playlist/playlist.manage.js":10}],2:[function(e,t,n){"use strict";function a(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function r(e,t){var n=document.querySelector("."+e+"."+t);n&&n.classList.remove(t)}function i(e,t){r("js-tab-select-btn","active"),r("tab","active"),u.set("activeTab",e),document.getElementById("js-tab-"+e).classList.add("active"),t||document.querySelector("[data-tab-item="+e+"]").classList.add("active")}function s(e,t){for(;e;){var n=e.getAttribute(t);if(n)return{element:e,attrValue:n};e=e.parentElement}}function o(e){var t="";if(e=Math.floor(e),e>=60){var n=Math.floor(e/60);t=n+":"}else t="0:";var a=e%60;return t+=10>a?"0"+a:a}Object.defineProperty(n,"__esModule",{value:!0}),n.formatTime=n.removeClassFromElement=n.getElementByAttr=n.toggleTab=n.scriptLoader=void 0;var l=e("./settings.js"),u=a(l),c=function(){function e(e,n){if(!t.includes(e)){var a=document.createElement("script");a.setAttribute("src",e),document.getElementsByTagName("body")[0].appendChild(a),t.push(e),n&&(a.onload=function(){n()})}}var t=[];return{load:e}}();n.scriptLoader=c,n.toggleTab=i,n.getElementByAttr=s,n.removeClassFromElement=r,n.formatTime=o},{"./settings.js":13}],3:[function(e,t,n){"use strict";function a(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function r(e){var t=document.getElementById("js-player-play"),n="",a="";"icon-play"===e?(n="icon-pause",a="Play"):"icon-pause"===e&&(n="icon-play",a="Pause"),t.classList.remove(n),t.classList.add(e),t.setAttribute("title",a)}function i(e){r(e?"icon-play":"icon-pause")}function s(e,t){var n=document.getElementById("js-player-"+e+"-slider"),a=n.getBoundingClientRect(),r=a.left,i=a.width,s=(t-r)/i;return 0>s?s=0:s>1&&(s=1),100*s}function o(e){var t=s("volume",e.screenX);u("volume",t),k.setVolume(t/100)}function l(){document.removeEventListener("mousemove",o),document.removeEventListener("mouseup",l)}function u(e,t){var n=document.getElementById("js-player-"+e+"-slider"),a=n.children[0],r=n.children[1];a.style.width=t+"%",r.style.left=t+"%"}function c(e){document.getElementById("js-player-elapsed").textContent=g.formatTime(e)}function d(e){var t=arguments.length<=1||void 0===arguments[1]?!0:arguments[1],n=document.getElementById("js-player-duration");n.textContent=t?g.formatTime(e):e}function f(e){u("track",s("track",e.screenX))}function p(e){var t=e.screenX;h.getCurrentTrack()&&k.seek(s("track",t)),y.set("seeking",!1),document.removeEventListener("mousemove",f),document.removeEventListener("mouseup",p)}Object.defineProperty(n,"__esModule",{value:!0}),n.updateSlider=n.showTrackDuration=n.setElapsedTime=n.addClassOnPlayBtn=n.togglePlayBtnClass=n.elapsedTime=void 0;var v=e("./../settings.js"),y=a(v),m=e("./../main.js"),g=a(m),j=e("./../playlist/playlist.js"),h=a(j),b=e("./player.js"),k=a(b),T=function(){function e(){a&&clearTimeout(a)}function t(e){var t=e.currentTime,n=e.duration,r=performance.now();return new Promise(function(e){!function i(t,r,s){var o=t/n*100,l=performance.now()-r,d=l-s;c(t),y.get("seeking")||u("track",o),a=setTimeout(function(){n>t?(t+=1,s+=1e3,i(t,r,s)):e()},1e3-d)}(Math.floor(t),r,0)})}function n(n,a){return e(),t(n,a)}var a=0;return{stop:e,start:n}}();document.getElementById("js-player-track").addEventListener("mousedown",function(e){1===e.which&&e.target.getAttribute("data-track-item")&&h.getCurrentTrack()&&(y.set("seeking",!0),u("track",s("track",e.screenX)),document.addEventListener("mousemove",f),document.addEventListener("mouseup",p))}),document.getElementById("js-volume-track").addEventListener("mousedown",function(e){1===e.which&&e.target.getAttribute("data-volume-item")&&(o(e),document.addEventListener("mousemove",o),document.addEventListener("mouseup",l))}),document.getElementById("js-player-controls").addEventListener("click",function(e){var t=e.target,n=t.getAttribute("data-control-item");switch(n){case"previous":k.playNext(-1);break;case"play":k.play();break;case"stop":k.stop();break;case"next":k.playNext(1);break;case"repeat":case"shuffle":t.classList.toggle("active"),k[n](t.classList.contains("active"));break;case"volume":document.getElementById("js-volume-track").classList.toggle("active"),t.classList.toggle("active")}}),window.addEventListener("DOMContentLoaded",function w(){var e=y.get("repeat"),t=y.get("shuffle"),n=y.get("volume");e&&document.querySelector('[data-control-item="repeat"]').classList.add("active"),t&&document.querySelector('[data-control-item="shuffle"]').classList.add("active"),u("volume",100*n),window.removeEventListener("DOMContentLoaded",w)}),n.elapsedTime=T,n.togglePlayBtnClass=i,n.addClassOnPlayBtn=r,n.setElapsedTime=c,n.showTrackDuration=d,n.updateSlider=u},{"./../main.js":2,"./../playlist/playlist.js":9,"./../settings.js":13,"./player.js":4}],4:[function(e,t,n){"use strict";function a(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function r(e,t){var n=O.getActivePlaylistId();return P.showTrackDuration(e.duration,!1),P.addClassOnPlayBtn("icon-pause"),L.showTrackInfo(e),L.showActiveIcon(n),C.showPlayingTrack(e.index,n,w.get("manual")),w.set("paused",!1),w.set("manual",!1),P.elapsedTime.start(t)}function i(e){return w.get("repeat")?(v(),void e()):void d(1)}function s(e){return"local-files"===e?"native":e.includes("yt-pl-")?"youtube":e.includes("sc-pl-")?"soundcloud":void 0}function o(e,t){var n=w.get("paused");n?e():(t(),P.elapsedTime.stop(),P.addClassOnPlayBtn("icon-play")),w.set("paused",!n)}function l(e,t){"native"===t?_.playTrack(e):"youtube"===t?S.playTrack(e):"soundcloud"===t&&V.playTrack(e)}function u(e){if(O.get(e)){var t=document.getElementById("js-"+e).querySelector(".track.selected"),n=0;t?(n=Number.parseInt(t.getAttribute("data-index"),10),w.set("manual",!0)):(O.setActive(e),n=O.getNextTrackIndex(0)),f(n,e)}}function c(){var e=w.get("player");if(!e){var t=w.get("activeTab");return void u(t)}var n=O.getCurrentTrackIndex(),a=O.getTrackAtIndex(n);O.setCurrentTrack(a),"native"===e?_.play(a):"youtube"===e?S.togglePlaying():"soundcloud"===e&&V.togglePlaying()}function d(e){var t=w.get("player"),n=O.getCurrentTrack();if(t&&n){p(n,t);var a=O.getNextTrack(e);l(a,t)}}function f(e,t){var n=O.getCurrentTrack();(!w.get("paused")||n)&&p(n);var a=s(t),r=O.get(t),i=r.tracks[e];w.set("player",a),O.setActive(r.id),w.get("shuffle")&&!r.shuffled?(O.shufflePlaybackOrder(!0,r),O.resetCurrentIndex()):O.setCurrentIndex(i.index),O.setCurrentTrack(i),l(i,a)}function p(){var e=arguments.length<=0||void 0===arguments[0]?O.getCurrentTrack():arguments[0],t=arguments.length<=1||void 0===arguments[1]?w.get("player"):arguments[1];e&&("native"===t?_.stop(e):"youtube"===t?S.stop():"soundcloud"===t&&V.stop(),t&&(L.hideActiveIcon(),k.removeClassFromElement("track","playing"),y()))}function v(){L.showTrackInfo(),P.elapsedTime.stop(),P.setElapsedTime(0),P.updateSlider("track",0),P.showTrackDuration(0)}function y(){v(),w.set("paused",!0),O.setCurrentTrack(null),P.addClassOnPlayBtn("icon-play")}function m(e){w.set("repeat",e)}function g(e){var t=O.getActive()||O.get(w.get("activeTab"));w.set("shuffle",e),t&&(O.shufflePlaybackOrder(e,t),O.resetCurrentIndex())}function j(e){var t=w.get("player");w.set("volume",e),"native"===t?_.setVolume(e):"youtube"===t?S.setVolume(e):"soundcloud"===t&&V.setVolume(e)}function h(e){var t=w.get("player"),n=0;"native"===t?n=_.getElapsed(e):"youtube"===t?n=S.getElapsed(e):"soundcloud"===t&&(n=V.getElapsed(e)),P.setElapsedTime(n)}Object.defineProperty(n,"__esModule",{value:!0}),n.onTrackEnd=n.onTrackStart=n.setVolume=n.togglePlaying=n.seek=n.shuffle=n.repeat=n.stop=n.playNext=n.play=void 0;var b=e("./../main.js"),k=a(b),T=e("./../settings.js"),w=a(T),E=e("./../sidebar.js"),L=a(E),I=e("./../playlist/playlist.js"),O=a(I),x=e("./../playlist/playlist.view.js"),C=a(x),A=e("./player.controls.js"),P=a(A),B=e("./player.native.js"),_=a(B),M=e("./player.youtube.js"),S=a(M),N=e("./player.soundcloud.js"),V=a(N);document.getElementById("js-tab-container").addEventListener("dblclick",function(e){var t=k.getElementByAttr(e.target,"data-index");if(t){var n=w.get("activeTab");w.set("manual",!0),f(t.attrValue,n)}}),n.play=c,n.playNext=d,n.stop=p,n.repeat=m,n.shuffle=g,n.seek=h,n.togglePlaying=o,n.setVolume=j,n.onTrackStart=r,n.onTrackEnd=i},{"./../main.js":2,"./../playlist/playlist.js":9,"./../playlist/playlist.view.js":11,"./../settings.js":13,"./../sidebar.js":14,"./player.controls.js":3,"./player.native.js":5,"./player.soundcloud.js":6,"./player.youtube.js":7}],5:[function(e,t,n){"use strict";function a(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function r(e){return{currentTime:e.currentTime,duration:Math.floor(e.duration)}}function i(e){console.log(e),e.audioBlobURL=URL.createObjectURL(e.audioTrack),e.audio=new Audio(e.audioBlobURL),e.audio.oncanplay=function(){e.audio.volume=d.get("volume"),e.audio.play()},e.audio.onplaying=function(){y.onTrackStart(e,r(e.audio)).then(function(){var t=e.audio.play.bind(e.audio);y.onTrackEnd(t)})}}function s(e){var t=e.audio;if(t){var n=t.play.bind(t),a=t.pause.bind(t);return void y.togglePlaying(n,a)}i(e)}function o(e){URL.revokeObjectURL(e.audioBlobURL),e.audio.load(),e.audio.oncanplay=null,e.audio.onplaying=null,e.audio.onended=null,delete e.audioBlobURL,delete e.audio}function l(e){var t=p.getCurrentTrack();t&&(t.audio.volume=e)}function u(e){var t=p.getCurrentTrack(),n=t.audio;if(n){var a=n.duration/100*e;return n.currentTime=a,a}return 0}Object.defineProperty(n,"__esModule",{value:!0}),n.setVolume=n.getElapsed=n.playTrack=n.stop=n.play=void 0;var c=e("./../settings.js"),d=a(c),f=e("./../playlist/playlist.js"),p=a(f),v=e("./player.js"),y=a(v);n.play=s,n.stop=o,n.playTrack=i,n.getElapsed=u,n.setVolume=l},{"./../playlist/playlist.js":9,"./../settings.js":13,"./player.js":4}],6:[function(e,t,n){"use strict";function a(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function r(e){return{currentTime:e.currentTime()/1e3,duration:Math.floor(e.streamInfo.duration/1e3)}}function i(){y.seek(0),y.play()}function s(e){y&&y.seek(0),console.log(e),SC.stream("/tracks/"+e.id).then(function(t){y=t,t.setVolume(f.get("volume")),t.play(),t.on("play-resume",function(){v.onTrackStart(e,r(y)).then(function(){v.onTrackEnd(i)})})})["catch"](function(e){console.log(e)})}function o(){var e=y.play.bind(y),t=y.pause.bind(y);v.togglePlaying(e,t)}function l(){y.seek(0),y.pause()}function u(e){y.setVolume(e)}function c(e){if(y){var t=y.streamInfo.duration/1e3,n=t/100*e;return y.seek(1e3*n),n}return 0}Object.defineProperty(n,"__esModule",{value:!0}),n.setVolume=n.getElapsed=n.togglePlaying=n.playTrack=n.stop=void 0;var d=e("./../settings.js"),f=a(d),p=e("./player.js"),v=a(p),y=null;n.stop=l,n.playTrack=s,n.togglePlaying=o,n.getElapsed=c,n.setVolume=u},{"./../settings.js":13,"./player.js":4}],7:[function(e,t,n){"use strict";function a(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function r(e){return{currentTime:e.getCurrentTime(),duration:e.getDuration()}}function i(e){var t=e.data;if(t===YT.PlayerState.PLAYING){var n=g.getCurrentTrack()||g.getNextTrack(0);console.log(n),h.onTrackStart(n,r(b)).then(function(){var e=b.playVideo.bind(b);h.onTrackEnd(e)})}}function s(){var e=g.getNextTrack(0);c(e)}function o(e){console.log(e)}function l(){b=new YT.Player("yt-player",{height:"390",width:"640",videoId:"",events:{onReady:s,onStateChange:i,onError:o}})}function u(){var e=b.playVideo.bind(b),t=b.pauseVideo.bind(b);h.togglePlaying(e,t)}function c(e){return b?(f(y.get("volume")),void b.loadVideoById(e.id)):void l()}function d(){b.stopVideo()}function f(e){b.setVolume(100*e)}function p(e){var t=b.getDuration(),n=t/100*e;return b.seekTo(n,!0),n}Object.defineProperty(n,"__esModule",{value:!0}),n.setVolume=n.getElapsed=n.togglePlaying=n.playTrack=n.stop=void 0;var v=e("./../settings.js"),y=a(v),m=e("./../playlist/playlist.js"),g=a(m),j=e("./player.js"),h=a(j),b=null;n.stop=d,n.playTrack=c,n.togglePlaying=u,n.getElapsed=p,n.setVolume=f},{"./../playlist/playlist.js":9,"./../settings.js":13,"./player.js":4}],8:[function(e,t,n){"use strict";function a(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function r(e){var t=document.getElementById("js-playlist-add-notice");t.textContent=e,t.classList.add("show"),setTimeout(function(){t.textContent="",t.classList.remove("show")},4e3)}function i(e,t){"youtube"===e?g.fetchPlaylist(t):"soundcloud"===e&&h.fetchPlaylist(t)}function s(e){var t=k.get(e.id);t&&w.remove(t.id),w.init(k.create(e),"grid",!0)}function o(e){var t=e.attrValue;t!==E&&(E=t,d.removeClassFromElement("playlist-provider","selected"),e.element.classList.add("selected"),document.getElementById("js-import-form-container").classList.add("show")),d.scriptLoader.load("js/libs/sdk.js",h.init)}function l(e){var t=document.getElementById("js-file-chooser"),n=new MouseEvent("click");"file"===e?(t.removeAttribute("webkitdirectory"),t.removeAttribute("directory"),t.setAttribute("multiple",!0)):"folder"===e&&(t.removeAttribute("multiple"),t.setAttribute("webkitdirectory",!0),t.setAttribute("directory",!0)),t.dispatchEvent(n),d.scriptLoader.load("js/libs/metadata-audio-parser.js")}function u(e,t,n,a){if(t.setAttribute("title",e[0].toUpperCase()+e.slice(1)),t.setAttribute("data-action",e),t.classList.toggle("active"),"save"===e)n.removeAttribute("readonly"),n.focus(),n.selectionStart=0,n.selectionEnd=n.value.length;else if("edit"===e){var r=k.get(a);n.value||(n.value=r.title);var i=n.value;i!==r.title&&(r.title=i,p.editEntry(a,i),n.setAttribute("value",i),k.save(r)),n.setAttribute("readonly","readonly")}}Object.defineProperty(n,"__esModule",{value:!0}),n.showNotice=n.add=void 0;var c=e("./../main.js"),d=a(c),f=e("./../sidebar.js"),p=a(f),v=e("./../local.js"),y=a(v),m=e("./../youtube.js"),g=a(m),j=e("./../soundcloud.js"),h=a(j),b=e("./playlist.js"),k=a(b),T=e("./playlist.manage.js"),w=a(T),E="";document.getElementById("js-file-chooser").addEventListener("change",function(e){y.addTracks(e.target.files),e.target.value=""}),document.getElementById("js-playlist-import-form").addEventListener("submit",function(e){var t=e.target,n=t.elements["playlist-id"].value.trim();n&&(i(E,n),t.reset()),e.preventDefault()}),document.getElementById("js-playlist-entries").addEventListener("click",function(e){var t=e.target,n=t.getAttribute("data-action"),a=d.getElementByAttr(t,"data-id");if(a){if("remove"===n)return void w.remove(a.attrValue,a.element);var r="";if("save"===n?r="edit":"edit"===n&&(r="save"),r){var i=a.element.querySelector(".playlist-entry-title");u(r,t,i,a.attrValue)}}}),document.getElementById("js-playlist-add-options").addEventListener("click",function(e){var t=e.target,n=d.getElementByAttr(t,"data-choice");if(n){var a=n.attrValue;return"file"===a||"folder"===a?void l(a):void o(n)}}),window.addEventListener("DOMContentLoaded",function L(){Object.keys(localStorage).forEach(function(e){if(e.startsWith("yt-pl-")||e.startsWith("sc-pl-")){var t=JSON.parse(localStorage.getItem(e));d.scriptLoader.load("https://www.youtube.com/iframe_api"),d.scriptLoader.load("js/libs/sdk.js",h.init),w.init(k.create(t),"grid",!1)}}),window.removeEventListener("DOMContentLoaded",L)}),n.add=s,n.showNotice=r},{"./../local.js":1,"./../main.js":2,"./../sidebar.js":14,"./../soundcloud.js":15,"./../youtube.js":16,"./playlist.js":9,"./playlist.manage.js":10}],9:[function(e,t,n){"use strict";function a(){return I}function r(e){return I[e]}function i(e){var t={id:e.id,order:-e.order,shuffled:e.shuffled,sortedBy:e.sortedBy,playbackOrder:e.playbackOrder,title:e.title};(e.id.startsWith("yt-pl-")||e.id.startsWith("sc-pl-"))&&(t.tracks=e.tracks),localStorage.setItem(e.id,JSON.stringify(t))}function s(e){return I[e.id]=Object.assign({sortedBy:"",order:0,shuffled:!1,tracks:e.tracks||[],playbackOrder:[]},e,JSON.parse(localStorage.getItem(e.id))||{}),I[e.id]}function o(e){delete I[e],localStorage.removeItem(e)}function l(e){I.hasOwnProperty(e)&&(O=e)}function u(){return O}function c(e){return e===O}function d(){return I[O]}function f(e){x=e}function p(){return x}function v(e){var t=d();C=t.playbackOrder.indexOf(Number.parseInt(e,10))}function y(){var e=p();e&&v(e.index)}function m(){var e=d();return e.playbackOrder[C]}function g(e,t){r(e.id)||(e=s(e)),e.playbackOrder=e.tracks.map(function(e){return e.index}),t?(h(!0,e),y()):i(e)}function j(e){for(var t=e.length;t;){var n=Math.floor(Math.random()*t);t-=1;var a=[e[n],e[t]];e[t]=a[0],e[n]=a[1]}return e}function h(e,t){t.shuffled=e,e?t.playbackOrder=j(t.playbackOrder):t.playbackOrder.sort(function(e,t){return e-t}),i(t)}function b(){C-=1}function k(e){var t=d(),n=t.playbackOrder;return C+=e,C===n.length&&(C=0),-1===C&&(C=n.length-1),n[C]}function T(e){var t=d();return t.tracks[e]}function w(e){var t=k(e),n=T(t);return f(n),v(n.index),n}function E(e,t,n){e.sort(function(e,a){var r=e[t].toLowerCase(),i=a[t].toLowerCase();return i>r?-1*n:r>i?1*n:0})}function L(e,t){e.order=e.sortedBy===t&&1===e.order?-1:1,e.sortedBy=t,E(e.tracks,t,e.order),i(e)}Object.defineProperty(n,"__esModule",{value:!0});var I={},O="",x=null,C=0;n.get=r,n.create=s,n.remove=o,n.save=i,n.sort=L,n.getAll=a,n.getActive=d,n.setActive=l,n.isActive=c,n.getActivePlaylistId=u,n.setCurrentTrack=f,n.getCurrentTrack=p,n.getNextTrackIndex=k,n.getNextTrack=w,n.setCurrentIndex=v,n.resetCurrentIndex=y,n.getCurrentTrackIndex=m,n.getTrackAtIndex=T,n.setTrackIndexes=g,n.shufflePlaybackOrder=h,n.decrementIndex=b},{}],10:[function(e,t,n){"use strict";function a(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function r(e,t,n){var a="playlist/"+e.id;e.playbackOrder.length||I.setTrackIndexes(e,j.get("shuffle")),v.add(a),x.add(e,t),b.createEntry(e.title,e.id),u(e.title,e.id),e.sortedBy&&(I.sort(e,e.sortedBy),o(e)),n&&v.isActive("add")?v.toggle(a):v.isActive(e.id)&&m.toggleTab(e.id)}function i(e,t,n,a){if(I.setTrackIndexes(e,j.get("shuffle")),x.append(e.id,t,n),a){var r="playlist/"+e.id;v.toggle(r)}}function s(e,t){x.remove(e),"local-files"===e&&T.worker.postMessage({action:"clear"}),I.isActive(e)&&E.stop(),t||(t=document.querySelector("[data-id="+e+"]")),t.parentElement.removeChild(t),I.remove(e),b.removeEntry(e)}function o(e){var t=I.getCurrentTrack();m.removeClassFromElement("track","selected"),x.update(e),t&&I.isActive(e.id)&&(x.showPlayingTrack(t.index,e.id,!1),I.setCurrentIndex(t.index))}function l(e,t,n){e.forEach(function(e){var a=t[e.index],r=e.title?e.title.toLowerCase():"",i=e.artist?e.artist.toLowerCase():"",s=e.album?e.album.toLowerCase():"";r.includes(n)||i.includes(n)||s.includes(n)?a.classList.remove("hidden"):a.classList.add("hidden")})}function u(e,t){var n=document.getElementById("js-playlist-entries"),a='\n        <li class="playlist-entry" data-id='+t+'>\n            <input type="text" class="input playlist-entry-title" value="'+e+'" readonly>\n            <span>\n                <button class="icon-pencil font-btn playlist-entry-btn"\n                    data-action="edit" title="Edit playlist title"></button>\n                <button class="icon-trash font-btn playlist-entry-btn"\n                    data-action="remove" title="Remove playlist"></button>\n            </span>\n        </li>\n    ';n.insertAdjacentHTML("beforeend",a)}function c(e){var t=I.get(j.get("activeTab")),n=document.getElementById("js-"+t.id+"-filter-input").value.trim();if(I.sort(t,e),o(t),n){var a=document.getElementById("js-"+t.id).children;n=n.toLowerCase(),l(t.tracks,a,n)}}function d(e){m.removeClassFromElement("track","selected"),e.classList.add("selected")}function f(e,t,n){var a=Number.parseInt(n.getAttribute("data-index"),10),r=I.getCurrentTrack(),i=r?r.index:-1,s=j.get("shuffle");if("local-files"===e.id){var o=e.tracks[a].name;T.worker.postMessage({action:"remove",name:o})}else(e.id.startsWith("yt-pl-")||e.id.startsWith("sc-pl-"))&&(e.deleted=e.deleted||[],e.deleted.push(e.tracks[a].id));t.removeChild(n),e.tracks.splice(a,1),e.tracks.forEach(function(e,n){e.index=n,t.children[n].setAttribute("data-index",n)}),I.setTrackIndexes(e,s,!0),r&&i===a?j.get("paused")?E.stop():E.playNext(0):i>a&&!s&&I.decrementIndex()}Object.defineProperty(n,"__esModule",{value:!0}),n.remove=n.appendTo=n.init=void 0;var p=e("./../router.js"),v=a(p),y=e("./../main.js"),m=a(y),g=e("./../settings.js"),j=a(g),h=e("./../sidebar.js"),b=a(h),k=e("./../local.js"),T=a(k),w=e("./../player/player.js"),E=a(w),L=e("./playlist.js"),I=a(L),O=e("./playlist.view.js"),x=a(O),C=0;document.getElementById("js-tab-container").addEventListener("click",function(e){var t=e.target,n=t.getAttribute("data-sort");if(n)return void c(n);var a=m.getElementByAttr(t,"data-index");a&&d(a.element)}),window.addEventListener("keyup",function(e){var t=e.target;C&&clearTimeout(C),C=setTimeout(function(){if(t.classList.contains("filter-input")){var e=I.get(j.get("activeTab")),n=document.getElementById("js-"+e.id).children,a=t.value.trim().toLowerCase();l(e.tracks,n,a)}},400)}),window.addEventListener("keypress",function(e){var t="Delete"===e.key||127===e.keyCode,n=I.get(j.get("activeTab"));if(t&&n){var a=document.getElementById("js-"+n.id),r=a.querySelector(".track.selected");r&&f(n,a,r)}}),n.init=r,n.appendTo=i,n.remove=s},{"./../local.js":1,"./../main.js":2,"./../player/player.js":4,"./../router.js":12,"./../settings.js":13,"./../sidebar.js":14,"./playlist.js":9,"./playlist.view.js":11}],11:[function(e,t,n){"use strict";function a(e){return'\n        <li class="list-item track" data-index="'+e.index+'">\n            <span>'+e.title+"</span>\n            <span>"+e.artist+"</span>\n            <span>"+e.album+"</span>\n            <span>"+e.duration+"</span>\n        </li>\n    "}function r(e,t){return'\n        <ul class="list list-view-header">\n            <li class="list-view-header-item">\n                <span data-sort="title">TITLE</span>\n            </li>\n            <li class="list-view-header-item">\n                <span data-sort="artist">ARTIST</span>\n            </li>\n            <li class="list-view-header-item">\n                <span data-sort="album">ALBUM</span>\n            </li>\n            <li class="list-view-header-item">\n                <span data-sort="duration">LENGTH</span>\n            </li>\n        </ul>\n        <ul id="js-'+e+'" class="list list-view">'+t+"</ul>\n    "}function i(e){var t=e.title;return t.length>64&&(t=t.slice(0,64)+"..."),'\n        <li class="grid-item track" data-index="'+e.index+'">\n            <div class="grid-item-thumb-container">\n                <div class="grid-item-duration">'+e.duration+'</div>\n                <img src="'+e.thumbnail+'" class="grid-item-thumb">\n            </div>\n            <div title="'+e.title+'">'+t+"</div>\n        </li>\n    "}function s(e,t){return'\n        <div class="grid-view-sort-select">\n            <button class="font-btn" data-sort="title">Title</button>\n            <button class="font-btn" data-sort="duration">Duration</button>\n        </div>\n        <ul id="js-'+e+'" class="list grid-view">'+t+"</ul>\n    "}function o(e,t){return t.map(function(t){return e(t)}).join("")}function l(e,t){var n=e.id,l=e.tracks,u="";return"list"===t?u=r(n,o(a,l)):"grid"===t&&(u=s(n,o(i,l))),'\n        <div id="js-tab-'+n+'" class="tab">\n            <div class="playlist-header">\n                <input type="text" class="input filter-input"\n                    id="js-'+n+'-filter-input"\n                    placeholder="Filter">\n            </div>\n            <div class="playlist-container">'+u+"</div>\n        </div>\n    "}function u(e,t){var n=l(e,t),a=document.getElementById("js-tab-container");a.insertAdjacentHTML("beforeend",n)}function c(e,t,n){var r=document.getElementById("js-"+e),s=null;"list"===n?s=a:"grid"===n&&(s=i),r.insertAdjacentHTML("beforeend",o(s,t))}function d(e,t){t[0].textContent=e.title,t[1].textContent=e.artist,t[2].textContent=e.album,t[3].textContent=e.duration}function f(e,t){var n=e.title.length>64?e.title.slice(0,64)+"...":e.title;t[0].children[0].textContent=e.duration,t[0].children[1].setAttribute("src",e.thumbnail),t[1].setAttribute("title",e.title),t[1].textContent=n}function p(e){var t=document.getElementById("js-"+e.id).children,n=null;n="local-files"===e.id?d:f,e.tracks.forEach(function(e,a){var r=t[a].children;e.index=a,n(e,r)})}function v(e){var t=document.getElementById("js-tab-"+e);t.parentElement.removeChild(t)}function y(e,t){var n=e.offsetHeight,a=e.offsetTop,r=t.scrollTop,i=t.clientHeight,s=r+i;(r>a-n||a>s)&&(t.scrollTop=a-i/2)}function m(e,t,n){var a=document.getElementById("js-"+t),r=a.children[e];g.removeClassFromElement("track","playing"),r.classList.add("playing"),n||y(r,a)}Object.defineProperty(n,"__esModule",{value:!0}),n.showPlayingTrack=n.scrollToTrack=n.append=n.update=n.remove=n.add=void 0;var g=e("./../main.js");n.add=u,n.remove=v,n.update=p,n.append=c,n.scrollToTrack=y,n.showPlayingTrack=m},{"./../main.js":2}],12:[function(e,t,n){"use strict";function a(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function r(e){return f.some(function(t){return t===e})}function i(e){return window.location.hash.includes(e)}function s(e){return/^playlist\/.+/.test(e)}function o(e){r(e)||f.push(e)}function l(e){window.location.hash="/"+e}function u(e){var t="";return e?"404"===e||r(e)?(t=s(e)?e.slice(e.lastIndexOf("/")+1):e.replace(/\//g,"-"),t&&document.getElementById("js-tab-"+t)?void d.toggleTab(t,"404"===t):void 0):void l("404"):void l("add")}Object.defineProperty(n,"__esModule",{value:!0}),n.isActive=n.toggle=n.add=void 0;var c=e("./main.js"),d=a(c),f=["add","404"];window.addEventListener("hashchange",function(e){var t=e.newURL.split("#/")[1];u(t)}),window.addEventListener("DOMContentLoaded",function p(){var e=window.location.hash.slice(2);Object.keys(localStorage).forEach(function(e){"settings"!==e&&o("playlist/"+e)}),u(e),window.removeEventListener("DOMContentLoaded",p)}),n.add=o,n.toggle=l,n.isActive=i},{"./main.js":2}],13:[function(e,t,n){"use strict";function a(e,t){return i.hasOwnProperty(e)?(i[e]=t,localStorage.setItem("settings",JSON.stringify({repeat:i.repeat,shuffle:i.shuffle,volume:i.volume})),t):void 0}function r(e){return i[e]}Object.defineProperty(n,"__esModule",{value:!0});var i=Object.assign({paused:!0,repeat:!1,shuffle:!1,manual:!1,volume:.2,seeking:!1,activeTab:"add",player:""},JSON.parse(localStorage.getItem("settings"))||{});n.set=a,n.get=r},{}],14:[function(e,t,n){"use strict";function a(e){return document.querySelector("[data-tab-item="+e+"]")}function r(e,t){var n=document.getElementById("js-sidebar-playlist-entries"),a='\n        <li>\n            <a href="#/playlist/'+t+'" class="font-btn sidebar-btn js-tab-select-btn"\n                data-tab-item="'+t+'">\n                <span class="sidebar-playlist-title">'+e+'</span>\n                <span class="icon-volume-up is-playlist-active hidden"></span>\n            </a>\n        </li>';n.insertAdjacentHTML("beforeend",a)}function i(e,t){var n=a(e);n.children[0].textContent=t}function s(e){var t=a(e);t.parentElement.removeChild(t)}function o(e){var t=a(e),n=t.querySelector(".is-playlist-active");n.classList.remove("hidden")}function l(){var e=!0,t=!1,n=void 0;try{for(var a,r=document.querySelectorAll(".js-tab-select-btn")[Symbol.iterator]();!(e=(a=r.next()).done);e=!0){var i=a.value,s=i.children[1];s&&!s.classList.contains("hidden")&&s.classList.add("hidden")}}catch(o){t=!0,n=o}finally{try{!e&&r["return"]&&r["return"]()}finally{if(t)throw n}}}function u(){var e=document.getElementById("js-sidebar-footer");e.classList.contains("show")||e.classList.add("show")}function c(e){var t=document.getElementById("js-player-track-art"),n="./assets/images/album-art-placeholder.png";if(e&&e.thumbnail){var a=e.thumbnail;"object"===("undefined"==typeof a?"undefined":p(a))&&(a=URL.createObjectURL(a)),t.src=a}else t.src=n}function d(e){var t=document.getElementById("js-player-track-info"),n=f(t.children,2),a=n[0],r=n[1];if(c(e),!e)return a.textContent="",r.textContent="",void(document.title="ve2ry");if(e.artist&&e.title)a.textContent=e.title,r.textContent=e.artist,document.title=e.artist+" - "+e.title;else{var i=e.name||e.title;a.textContent="",r.textContent=i,document.title=i}u()}var f=function(){function e(e,t){var n=[],a=!0,r=!1,i=void 0;

try{for(var s,o=e[Symbol.iterator]();!(a=(s=o.next()).done)&&(n.push(s.value),!t||n.length!==t);a=!0);}catch(l){r=!0,i=l}finally{try{!a&&o["return"]&&o["return"]()}finally{if(r)throw i}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};Object.defineProperty(n,"__esModule",{value:!0}),n.createEntry=r,n.editEntry=i,n.removeEntry=s,n.showTrackInfo=d,n.showActiveIcon=o,n.hideActiveIcon=l},{}],15:[function(e,t,n){"use strict";function a(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function r(){SC.initialize({client_id:"7d6323d8ecbfb64acb9cf2e5f5ef150c"})}function i(e){return e.map(function(e,t){return{duration:o.formatTime(e.duration/1e3),id:e.id,index:t,thumbnail:e.artwork_url||"assets/images/album-art-placeholder.png",title:e.title}})}function s(e){SC.resolve(e).then(function(e){return Array.isArray(e)?{id:"sc-pl-"+e[0].user_id,title:e[0].user.username+" tracks",tracks:i(e)}:{id:"sc-pl-"+e.id,title:e.title,tracks:i(e.tracks)}}).then(u.add)["catch"](function(e){console.log(e),404===e.status&&u.showNotice("Playlist was not found")})}Object.defineProperty(n,"__esModule",{value:!0}),n.fetchPlaylist=n.init=void 0;var o=e("./main.js"),l=e("./playlist/playlist.add.js"),u=a(l);n.init=r,n.fetchPlaylist=s},{"./main.js":2,"./playlist/playlist.add.js":8}],16:[function(e,t,n){"use strict";function a(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function r(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function i(e){return e.id="yt-pl-"+e.id,e.tracks=e.tracks.map(function(e,t){return{index:t,id:e.snippet.resourceId.videoId,duration:e.snippet.duration,title:e.snippet.title,thumbnail:e.snippet.thumbnails["default"].url}}),delete e.token,e}function s(e){var t=["H","M","S"];return e=e.slice(2),t.map(function(t){var n="";if(e.includes(t)){if(e=e.split(t),2===e.length){var a=Number.parseInt(e[0],10);n+=a>=10?a:"0"+a,"S"!==t&&(n+=":",e=e.slice(1)[0])}}else"S"===t&&(n+="00");return n}).join("")}function o(e){var t=e.items.map(function(e){return e.snippet.resourceId.videoId}).join();return l("videos","contentDetails","id",t).then(function(t){return e.items=e.items.map(function(e,n){return e.snippet.duration=s(t.items[n].contentDetails.duration),e}),e})}function l(e,t,n,a,r){var i="AIzaSyD33Rxm4dA34Mh84oSxYTUUF_jyCLLOua4",s="part="+t+"&"+n+"="+a+"&maxResults=50&key="+i;return r&&(s+="&pageToken="+r),fetch("https://www.googleapis.com/youtube/v3/"+e+"?"+s).then(function(e){return e.json()})["catch"](function(e){console.log(e)})}function u(e){return l("playlistItems","snippet","playlistId",e.id,e.token).then(function(e){return e.items=e.items.filter(function(e){var t=e.snippet.title;return"Deleted video"!==t&&"Private video"!==t}),e}).then(o).then(function(t){var n;return e.token=t.nextPageToken,(n=e.tracks).push.apply(n,r(t.items)),e.token?u(e):e})}function c(e){var t=e.includes("list=")?e.split("list=")[1]:e;l("playlists","snippet","id",t).then(function(e){return e.items.length?{id:t,title:e.items[0].snippet.title,tracks:[]}:void p.showNotice("Playlist was not found")}).then(u).then(i).then(p.add)["catch"](function(e){console.log(e)}),d.scriptLoader.load("https://www.youtube.com/iframe_api")}Object.defineProperty(n,"__esModule",{value:!0}),n.fetchPlaylist=void 0;var d=e("./main.js"),f=e("./playlist/playlist.add.js"),p=a(f);n.fetchPlaylist=c},{"./main.js":2,"./playlist/playlist.add.js":8}],17:[function(e){"use strict";e("./dev/settings.js"),e("./dev/router.js"),e("./dev/main.js"),e("./dev/sidebar.js"),e("./dev/local.js"),e("./dev/youtube.js"),e("./dev/soundcloud.js"),e("./dev/playlist/playlist.add.js"),e("./dev/playlist/playlist.manage.js"),e("./dev/playlist/playlist.view.js"),e("./dev/playlist/playlist.js"),e("./dev/player/player.controls.js"),e("./dev/player/player.js"),e("./dev/player/player.native.js"),e("./dev/player/player.youtube.js"),e("./dev/player/player.soundcloud.js")},{"./dev/local.js":1,"./dev/main.js":2,"./dev/player/player.controls.js":3,"./dev/player/player.js":4,"./dev/player/player.native.js":5,"./dev/player/player.soundcloud.js":6,"./dev/player/player.youtube.js":7,"./dev/playlist/playlist.add.js":8,"./dev/playlist/playlist.js":9,"./dev/playlist/playlist.manage.js":10,"./dev/playlist/playlist.view.js":11,"./dev/router.js":12,"./dev/settings.js":13,"./dev/sidebar.js":14,"./dev/soundcloud.js":15,"./dev/youtube.js":16}]},{},[17]);