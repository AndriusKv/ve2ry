!function(t){function e(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var n={};e.m=t,e.c=n,e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=215)}({215:function(t,e){function n(t,e){i.playlists.where("_id").equals(t).modify(e).catch(function(t){})}importScripts("./libs/dexie.min.js");var i=new Dexie("playlists");i.version(1).stores({playlists:"++_id"}),i.playlists.toArray().then(function(t){postMessage({action:"init",payload:t})}).catch(function(t){}),self.onmessage=function(t){var e=t.data,r=e.action,a=e.playlist;"put"===r?i.playlists.put(a).then(function(){postMessage({action:"update",payload:{_id:a._id,id:a.id}})}).catch(function(t){}):"change-sorting"===r?n(a._id,function(t,e){e.value.sortedBy=a.sortedBy,e.value.order=a.order}):"change-title"===r?n(a._id,function(t,e){e.value.title=a.title}):"change-type"===r?n(a._id,function(t,e){e.value.type=a.type}):"remove-tracks"===r?n(a._id,function(t,e){e.value.tracks=e.value.tracks.filter(function(t){var e=!0,n=!1,i=void 0;try{for(var r,o=a.tracks[Symbol.iterator]();!(e=(r=o.next()).done);e=!0){if(r.value.name===t.name)return!1}}catch(t){n=!0,i=t}finally{try{!e&&o.return&&o.return()}finally{if(n)throw i}}return!0})}):"remove"===r&&i.playlists.delete(a._id).catch(function(t){})}}});