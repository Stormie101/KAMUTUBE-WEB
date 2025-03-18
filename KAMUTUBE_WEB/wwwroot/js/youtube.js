const API_KEY = "AIzaSyAr5DLcNEPgY4AGeu0AjYKnPTTmvaMBX9o"; // Replace with your actual API key
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const resultsContainer = document.getElementById("results");

// Default search when the page loads
document.addEventListener("DOMContentLoaded", function () {
    searchYouTube("University Poly-Tech Malaysia");
});

document.getElementById("logo").addEventListener("click", function () {
    location.reload(); // Refreshes the page
});

searchButton.addEventListener("click", function () {
    let query = searchInput.value;
    if (query) {
        searchYouTube(query);
    }
});

async function searchYouTube(query) {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.status === 403 && data.error?.errors[0]?.reason === "quotaExceeded") {
            resultsContainer.innerHTML = `<p style="color:red; font-weight:bold;">ERROR: Exceeded daily limit of YOUTUBE API.</p>`;
            return;
        } else if (response.status !== 200) {
            resultsContainer.innerHTML = `<p style="color:red;">Error: ${data.error.message}</p>`;
            console.error("YouTube API Error:", data);
            return;
        }

        displayResults(data.items);
    } catch (error) {
        console.error("Error fetching YouTube data:", error);
        resultsContainer.innerHTML = `<p style="color:red;">Failed to fetch data. Please try again later.</p>`;
    }
}

function displayResults(videos) {
    resultsContainer.innerHTML = "";
    videos.forEach(video => {
        let videoId = video.id.videoId;
        let title = video.snippet.title;
        let channelTitle = video.snippet.channelTitle;
        let description = video.snippet.description;
        let thumbnail = video.snippet.thumbnails.medium.url;

        let videoElement = `
    <div class="video" onclick="playVideo('${videoId}', '${title.replace(/'/g, "\\'")}')">

        <img src="${thumbnail}"  />
            <p class="video-title" >${title}</p>
            <p class="video-channel">${channelTitle}</p>
    </div>
    <style>
#results {
    display: flex;
    flex-direction: column; /* Stack videos top to bottom */
    gap: 20px; /* More spacing between videos */
    padding: 20px;
    width: 100%;
    max-width: 900px; /* Increase max width */
    margin: 0 auto; /* Center align */
}

.video {
    display: flex;
    align-items: flex-start;
    gap: 15px;
    background: white;
    padding: 15px;
    border-radius: 8px;
    border: 1px solid #ddd;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    cursor:pointer;
}

.video img {
    width: 240px; /* Bigger thumbnail */
    height: 135px;
    border-radius: 8px;
    cursor: pointer;
}

.video-details {
    flex: 1;
}

.video-title {
    font-size: 18px; /* Bigger title */
    font-weight: 600;
    color: #111;
    margin-bottom: 5px;
}

.video-channel {
    font-size: 14px;
    color: #606060;
    margin-bottom: 5px;
}

.video-description {
    font-size: 14px;
    color: #333;
    line-height: 1.4;
}


    </style>
`;

        resultsContainer.innerHTML += videoElement;
    });
}

function playVideo(videoId, title) {
    resultsContainer.innerHTML = `
    <div id="PlayVid">
        <iframe width="560" height="315" 
                src="https://www.youtube.com/embed/${videoId}" 
                frameborder="0" allowfullscreen>
        </iframe>
        <p class="video-title">${title}</p>
        <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">Go to YouTube</a>
    </div>
        <style>
        iframe{
            display:flex;
            margin:30px auto;
            border: 1px solid black;
            borer-radius:8px;
        }
        #PlayVid{
            text-align:center;
        }
        .video-title{
            font-weight:bold;
            font-size:25px;
        }
        a{
            text-decoration:none;
            border:1px solid black;
            border-radius:8px;
            padding:8px;
            background-color:black;
            color:white;
            font-weight: bold;
        }
        </style>
    `;
}
