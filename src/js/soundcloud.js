/* global SC */

import { scriptLoader, formatTime } from "./utils.js";
import { addImportedPlaylist, showNotice } from "./playlist/playlist.import.js";

let initialized = false;

async function initSoundcloud() {
    if (initialized) {
        return;
    }
    initialized = true;

    await scriptLoader.load({ src: "libs/sdk.min.js" });
    SC.initialize({ client_id: process.env.SOUNDCLOUD_API_KEY });
}

function parseTracks(tracks, id, timeStamp) {
    return tracks.map(track => {
        const duration = Math.floor(track.duration / 1000);

        return {
            durationInSeconds: duration,
            duration: formatTime(duration),
            id: track.id,
            name: track.title,
            title: track.title,
            artist: "",
            album: "",
            thumbnail: track.artwork_url || "assets/images/album-art-placeholder.png",
            player: "soundcloud",
            playlistId: id,
            createdAt: timeStamp
        };
    });
}

function parsePlaylist(playlist, url) {
    const id = playlist.id ? playlist.id.toString() : playlist[0].user_id.toString();
    const timeStamp = new Date().getTime();
    const tracks = playlist.tracks ? playlist.tracks : playlist;

    return {
        url,
        id,
        title: playlist.title || playlist[0].user.username,
        tracks: parseTracks(tracks, id, timeStamp),
        player: "soundcloud",
        type: "grid"
    };
}

async function fetchSoundcloudPlaylist(url) {
    if (!url.includes("soundcloud")) {
        showNotice("soundcloud", "Invalid url");
        return;
    }
    try {
        await initSoundcloud();
        const data = await SC.resolve(url);
        const playlist = parsePlaylist(data, url);

        addImportedPlaylist(playlist);
    }
    catch (e) {
        console.log(e);
        if (e.status === 404) {
            showNotice("soundcloud", "Playlist was not found");
        }
    }
}

export {
    initSoundcloud,
    fetchSoundcloudPlaylist
};
