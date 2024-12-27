document.getElementById("videoForm").addEventListener("submit", function(e) {
    e.preventDefault();
    
    let url = document.getElementById("urlInput").value;
    let resultDiv = document.getElementById("result");
    
    resultDiv.innerHTML = "Processing...";

    // Check for valid YouTube URLs
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
        fetchVideo(url);
    } else {
        resultDiv.innerHTML = "Invalid URL. Please provide a valid YouTube URL.";
    }

    // Function to call the external video download API (Y2mate API or others)
    function fetchVideo(videoUrl) {
        // Example API endpoint for YouTube download via Y2mate (replace with actual service)
        const apiUrl = `https://api.y2mate.com/api/ajaxSearch/index?url=${encodeURIComponent(videoUrl)}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.status === "ok" && data.links.length > 0) {
                    const downloadLink = data.links[0].link;  // Assuming the first link is the best quality
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
