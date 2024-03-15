const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 10;
const apiKey = '8u_w4yvstKW5Wk5Skh6d0c3PS2U19jr3Rwv8Qgq_y4g';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all images were loaded
function imageLoaded(){
    console.log('Image loaded');
    imageLoaded++;
    if(imageLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }
}

// create elements for links and photos, add to DOM
function displayPhotos(){
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');
        // create img for photo
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);
        // event listener, check when each is finished loading


        // put img inside <A>, then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// get pics from api
async function getPhotos(){
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch photos');
        }
        photosArray = await response.json();
        displayPhotos();
    } catch(error) {
        console.error('Error fetching photos:', error);
        // Handle error here (e.g., display an error message to the user)
    }
}

// check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () =>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight-1000){
        getPhotos();
    }
});

// on load
getPhotos();
// Background Color change function
function generateGradientColor() {
    // Generate random RGB color values
    let r1 = Math.floor(Math.random() * 256);
    let g1 = Math.floor(Math.random() * 256);
    let b1 = Math.floor(Math.random() * 256);
    let r2 = Math.floor(Math.random() * 256);
    let g2 = Math.floor(Math.random() * 256);
    let b2 = Math.floor(Math.random() * 256);

    // Construct CSS gradient string
    let gradientColor = `linear-gradient(to right, rgb(${r1}, ${g1}, ${b1}), rgb(${r2}, ${g2}, ${b2}))`;

    // Set body background to gradient color
    document.body.style.background = gradientColor;
}
generateGradientColor();
