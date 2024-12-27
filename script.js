document.getElementById("videoForm").addEventListener("submit", function(e) {
    e.preventDefault();
    
    let url = document.getElementById("urlInput").value;
    let resultDiv = document.getElementById("result");
    
    resultDiv.innerHTML = "Processing...";

    // Validate YouTube URL
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
        fetchVideo(url);
    } else {
        resultDiv.innerHTML = "Invalid URL. Please provide a valid YouTube URL.";
    }

    // Function to call the YouTube video download API (Y2mate API)
    function fetchVideo(videoUrl) {
        // Y2mate API endpoint to fetch video data
        const apiUrl = `https://api.y2mate.com/api/ajaxSearch/index?url=${encodeURIComponent(videoUrl)}`;

        // Fetch the API
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Check if the API response is successful and contains download links
                if (data.status === "ok" && data.links.length > 0) {
                    // Select the highest quality download link (usually first in the list)
                    const downloadLink = data.links[0].link;  
                    resultDiv.innerHTML = `<a href="${downloadLink}" target="_blank">Download Video</a>`;
                } else {
                    resultDiv.innerHTML = "Error: Could not fetch video. Please try again later.";
                }
            })
            .catch(error => {
                resultDiv.innerHTML = "Error: " + error.message;
            });
    }
});
