/* global gapi */

import { formatTime, dispatchCustomEvent } from "./utils.js";
import { addImportedPlaylist, showNotice } from "./playlist/playlist.import.js";
import { getPlaylistById } from "./playlist/playlist.js";

function showYoutubeNotice(notice) {
    showNotice("youtube", notice);
}

function parseDuration(duration) {
    if (!duration.includes("H")) {
        duration = `0H${duration}`;
    }
    if (!duration.includes("M")) {
        const minIndex = duration.indexOf("H") + 1;
        duration = `${duration.slice(0, minIndex)}0M${duration.slice(minIndex)}`;
    }
    if (!duration.includes("S")) {
        duration = `${duration}0`;
    }
    return duration.match(/\d{1,}/g)
        .reverse()
        .reduce((total, value, index) => {
            total += value * 60 ** index;
            return total;
        }, 0);
}

async function getVideoDuration(items) {
    const ids = items.map(item => item.snippet.resourceId.videoId).join();
    const data = await fetchYoutube("videos", "contentDetails", "id", ids);

    return items.reduce((items, item) => {
        const durationItem = data.items.find(({ id }) => id === item.snippet.resourceId.videoId);

        if (durationItem) {
            item.durationInSeconds = parseDuration(durationItem.contentDetails.duration) - 1;
            items.push(item);
        }
        return items;
    }, []);
}

function fetchYoutube(path, part, filter, id, token) {
    let params = `part=${part}&${filter}=${id}&maxResults=50&key=${process.env.YOUTUBE_API_KEY}`;
    const googleAuth = gapi.auth2.getAuthInstance();

    if (token) {
        params += `&pageToken=${token}`;
    }
    if (googleAuth.isSignedIn.get()) {
        params += `&access_token=${googleAuth.currentUser.get().getAuthResponse().access_token}`;
    }
    return fetch(`https://www.googleapis.com/youtube/v3/${path}?${params}`)
        .then(response => response.json());
}

function filterInvalidItems(items) {
    return items.filter(item => {
        const title = item.snippet.title;

        return title !== "Deleted video" && title !== "Private video";
    });
}

function parseItems(items, id, timeStamp) {
    return items.map(track => ({
        id: track.snippet.resourceId.videoId,
        durationInSeconds: track.durationInSeconds,
        duration: formatTime(track.durationInSeconds),
        name: track.snippet.title,
        title: track.snippet.title,
        artist: "",
        album: "",
        thumbnail: track.snippet.thumbnails.medium.url,
        player: "youtube",
        playlistId: id,
        createdAt: timeStamp
    }));
}

function handleError(error, id) {
    const code = error.code;

    if (code === 403) {
        showYoutubeNotice("You need to be sign in if you want to import private playlist");
    }
    else if (code === 404) {
        showYoutubeNotice("Playlist was not found");
    }
    dispatchCustomEvent("playlist-status-update", { id });

    throw new Error(error.message);
}

async function fetchPlaylistItems(id, timeStamp, token) {
    const data = await fetchYoutube("playlistItems", "snippet", "playlistId", id, token);

    if (data.error) {
        handleError(data.error, id);
    }
    const validItems = filterInvalidItems(data.items);
    const items = await getVideoDuration(validItems);
    const tracks = parseItems(items, id, timeStamp);

    if (data.nextPageToken) {
        const nextPageItems = await fetchPlaylistItems(id, timeStamp, data.nextPageToken);

        return tracks.concat(nextPageItems);
    }
    return tracks;
}

async function parseVideos(videos, latestIndex) {
    const validItems = filterInvalidItems(videos).map(item => {
        item.snippet.resourceId = { videoId: item.id };
        return item;
    });
    const timeStamp = new Date().getTime();
    const items = await getVideoDuration(validItems);

    return parseItems(items, "youtube", timeStamp, latestIndex);
}

async function getPlaylistTitle(id) {
    const { items } = await fetchYoutube("playlists", "snippet", "id", id);

    return items.length ? items[0].snippet.title: "";
}

async function addVideo(id, type) {
    const playlistId = "youtube";
    const pl = getPlaylistById(playlistId);

    if (!type) {
        type = pl ? "update" : "new";
    }

    if (pl) {
        dispatchCustomEvent("playlist-status-update", { type, id: playlistId });
    }
    const { items } = await fetchYoutube("videos", "snippet", "id", id);
    const latestIndex = pl && pl.tracks.length || 0;

    if (!items.length) {
        showYoutubeNotice("Video was not found");
        dispatchCustomEvent("playlist-status-update", { id: playlistId });
        return;
    }
    addImportedPlaylist({
        title: "YouTube",
        id: playlistId,
        tracks: await parseVideos(items, latestIndex),
        player: playlistId,
        type: "grid"
    }, type);
}

async function addPlaylist(url, id, type) {
    const pl = getPlaylistById(id);

    if (!type) {
        type = pl ? "update" : "new";
    }

    if (pl) {
        dispatchCustomEvent("playlist-status-update", { type, id });
    }
    const timeStamp = new Date().getTime();
    const tracks = await fetchPlaylistItems(id, timeStamp);
    const title = await getPlaylistTitle(id);

    addImportedPlaylist({
        url,
        title,
        id,
        tracks,
        player: "youtube",
        type: "grid"
    }, type);
}

function parseUrl(url) {
    let videoId = "";
    let playlistId = "";

    try {
        const { searchParams } = new URL(url);
        videoId = searchParams.get("v");
        playlistId = searchParams.get("list");
    }
    catch (e) {
        const videoMatch = url.match(/v=[a-zA-Z0-9\-_]+/);
        const playlistMatch = url.match(/list=[a-zA-Z0-9\-_]+/);

        if (videoMatch) {
            videoId = videoMatch[0].slice(2);
        }

        if (playlistMatch) {
            playlistId = playlistMatch[0].slice(5);
        }
    }

    return {
        videoId,
        playlistId
    };
}

function fetchYoutubeItem(url, type) {
    const { videoId, playlistId } = parseUrl(url);

    if (videoId) {
        addVideo(videoId, type);
        return;
    }

    if (!playlistId) {
        showYoutubeNotice("Invalid url");
    }
    else if (playlistId === "WL") {
        showYoutubeNotice("Importing Watch Later playlist is not allowed");
    }
    else {
        addPlaylist(url, playlistId, type);
    }
}

export {
    fetchYoutubeItem
};
