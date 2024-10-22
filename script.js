// your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Function to download an image
function downloadImage(image) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = image.url;

    img.onload = () => resolve(img); // If the image loads successfully
    img.onerror = () => reject(new Error(`Failed to load image's URL: ${image.url}`)); // If there's an error
  });
}

// Function to handle image downloads on button click
btn.addEventListener('click', () => {
  // Clear the output div
  output.innerHTML = "";

  // Use Promise.all to download all images in parallel
  const promises = images.map(image => downloadImage(image));

  Promise.all(promises)
    .then(downloadedImages => {
      // Append all downloaded images to the output div
      downloadedImages.forEach(img => {
        output.appendChild(img);
      });
    })
    .catch(error => {
      // If any image fails to download, log the error
      console.error(error);
    });
});

