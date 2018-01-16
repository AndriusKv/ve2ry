import { getElementByAttr, getImage } from "../utils.js";
import { togglePlaying } from "./player.js";
import { watchOnYoutube } from "./player.youtube.js";
import { getCurrentTrack } from "../playlist/playlist.js";

let animationId = 0;
let timeoutId = 0;
let animationTarget = null;
let isRendered = false;

function resetAnimationTarget() {
    clearTimeout(timeoutId);
    cancelAnimationFrame(animationId);

    animationTarget.style.textIndent = "0";
    timeoutId = 0;
    animationTarget = null;
}

function indentText(element, width, maxWidth, x = 0) {
    x = Math.abs(x) < width + 10 ? x - 1 : maxWidth;
    element.style.textIndent = `${x}px`;
    animationId = requestAnimationFrame(() => {
        indentText(element, width, maxWidth, x);
    });
}

function createMediaContainer() {
    const playerElement = document.getElementById("js-player");

    playerElement.insertAdjacentHTML("afterbegin", `
        <div id="js-media-container" class="media-container">
            <div class="media-btn-container">
                <a id="js-yt-player-watch" class="btn btn-icon hidden" data-item="yt-watch" title="Watch on YouTube" target="_blank">
                    <svg viewBox="0 0 24 24">
                        <use href="#youtube"></use>
                    </svg>
                </a>
                <button class="btn btn-icon" data-item="close" title="Close">
                    <svg viewBox="0 0 24 24">
                        <use href="#close"></use>
                    </svg>
                </button>
            </div>
            <div id="js-yt-player" class="yt-player hidden"></div>
            <img src="" id="js-media-image" class="media-image hidden" data-item="image" alt="">
        </div>
    `);
    const mediaElement = document.getElementById("js-media-container");

    mediaElement.addEventListener("click", handleClickOnMedia);
}

function handleClickOnMedia({ currentTarget, target }) {
    const element = getElementByAttr("data-item", target);

    if (!element) {
        return;
    }
    const { attrValue, elementRef } = element;
    const track = getCurrentTrack();

    if (attrValue === "image") {
        togglePlaying(track);
    }
    else if (attrValue === "yt-watch") {
        watchOnYoutube(elementRef, track);
    }
    else if (attrValue === "close") {
        currentTarget.classList.remove("visible");
    }
}

function handleMousemove({ currentTarget, target }) {
    if (currentTarget === target) {
        return;
    }

    if (animationTarget && target !== animationTarget) {
        resetAnimationTarget();
    }
    else if (timeoutId) {
        return;
    }
    const width = target.scrollWidth;
    const maxWidth = target.parentElement.offsetWidth - 8;

    if (width > maxWidth) {
        animationTarget = target;
        timeoutId = setTimeout(indentText, 400, target, width, maxWidth);

        currentTarget.addEventListener("mouseleave", handleMouseleave);
    }
}

function handleMouseleave({ currentTarget }) {
    currentTarget.removeEventListener("mouseleave", handleMouseleave);

    if (animationTarget) {
        resetAnimationTarget();
    }
}

function toggleMedia() {
    document.getElementById("js-media-container").classList.toggle("visible");
}

function renderNowPlaying(track) {
    const nowPlayingElement = document.getElementById("js-now-playing");
    const trackArtist = track.artist && track.title ? track.artist : track.name;
    const trackTitle = trackArtist !== track.name ? `<div class="track-title">${track.title}</div>` : "";

    nowPlayingElement.insertAdjacentHTML("beforeend", `
        <div class="now-playing-art-container">
            <button id="js-expand-media-btn" class="btn btn-icon expand-media-btn" title="Expand">
                <svg viewBox="0 0 24 24">
                    <use href="#expand"></use>
                </svg>
            </button>
            <img src=${getImage(track.thumbnail)} class="artwork" alt="">
        </div>
        <div id="js-track-name" class="track-name">
            ${trackTitle}
            <div class="track-artist">${trackArtist}</div>
        </div>
    `);
    document.getElementById("js-track-name").addEventListener("mousemove", handleMousemove);
    document.getElementById("js-expand-media-btn").addEventListener("click", toggleMedia);
}

function removeNowPlaying() {
    if (!isRendered) {
        return;
    }
    isRendered = false;
    document.title = "Veery";

    document.getElementById("js-track-name").removeEventListener("mousemove", handleMousemove);
    document.getElementById("js-expand-media-btn").removeEventListener("click", toggleMedia);
    document.getElementById("js-now-playing").innerHTML = "";
}

function showNowPlaying(track) {
    if (isRendered) {
        removeNowPlaying();
    }
    isRendered = true;
    document.title = track.artist && track.title ? `${track.artist} - ${track.title}` : track.name;

    renderNowPlaying(track);
}

export {
    showNowPlaying,
    removeNowPlaying,
    createMediaContainer
};
