// Unsplash API
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
let photosArray = [];

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
// unsplash api
let count = 5;
const apiKey = "g0CxiDUxukvK_5AJaTmHWEmueMAmOTczfGWUB9VsTq0";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all inages were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    count = 30;
  }
}
// Helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}
// Create Elements For links & photos,Add to Dom
function displayPhotos() {
  imageLoaded = 0;
  totalImages = photosArray.length;
  // Run function for each object in photoArray
  photosArray.forEach((photo) => {
    //Create <a> to link to Unsplash
    const item = document.createElement("a");
    // item.setAttribute("href", photo.links.html);
    // item.setAttribute("target", "_blank");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // Create <img> for photo
    const img = document.createElement("img");
    // img.setAttribute("src", photo.urls.regular);
    // img.setAttribute("alt", photo.alt_description);
    // img.setAttribute("title", photo.alt_description);
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event listener,check when each is finished loading
    img.addEventListener("load", imageLoaded);
    // Put img inside the a,then put both inside image-container element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    //Catch error Here
  }
}

//Check to see if scrolling near bottom of page,Load More photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.screenY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});
//On load
getPhotos();
