export function createGallery(images) {
    const gallery = document.querySelector('.gallery');
    const markup = images
        .map(
            image =>
                `<li class="li-item">
                    <a class="gallery-link" href="${image.largeImageURL}">
                    <img class="gallery-img" src="${image.webformatURL}" alt="${image.tags}" width="360">
                    </a>
                <ul class="image-descr">
                    <li class>
                        <h2 class="title">Likes</h2>
                        <p>${image.likes}</p>
                    </li>
                    <li>
                        <h2 class="title">Views</h2>
                        <p>${image.views}</p>
                    </li>
                    <li>
                        <h2 class="title">Comments</h2>
                        <p>${image.comments}</p>
                    </li>
                    <li>
                        <h2 class="title">Downloads</h2>
                        <p>${image.downloads}</p>
                    </li>
                </ul>
                </li>`
        )
        .join('');
    gallery.insertAdjacentHTML('beforeend', markup);
}

export function clearGallery() {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';
}