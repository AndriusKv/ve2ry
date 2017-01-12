/* global SC */

import { initSoundcloud } from "./../soundcloud.js";
import { onTrackStart } from "./player.js";

let scPlayer = null;

async function playTrack(track, volume, startTime) {
    try {
        await initSoundcloud();

        if (scPlayer) {
            scPlayer.dispose();
        }
        scPlayer = await SC.stream(`/tracks/${track.id}`);
    }
    catch (e) {
        console.log(e);
    }

    scPlayer.on("play-resume", () => {
        onTrackStart(Math.floor(scPlayer.currentTime() / 1000));
    });

    scPlayer.on("audio_error", error => {
        console.log(error);
    });

    if (typeof startTime === "number") {
        scPlayer.once("state-change", state => {
            if (state === "loading") {
                seekTo(startTime);
                scPlayer.pause();
            }
        });
    }
    setVolume(volume);
    scPlayer.seek(0);
    scPlayer.play();
}

function togglePlaying(paused) {
    if (paused) {
        scPlayer.play();
    }
    else {
        scPlayer.pause();
    }
}

function stopTrack() {
    scPlayer.seek(0);
    scPlayer.pause();
}

function setVolume(volume) {
    scPlayer.setVolume(volume);
}

function seekTo(currentTime) {
    scPlayer.seek(currentTime * 1000);
}

export {
    playTrack,
    stopTrack,
    togglePlaying,
    seekTo,
    setVolume
};
