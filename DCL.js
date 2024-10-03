//JSON placeholder API fetch for display of posts
const postContainer = document.getElementById('DCcontainer');
//let postLimit = 12; <- makes no difference
let page = 1; // initial page we currently find us in
function fetchPost() {
    fetch('https://jsonplaceholder.typicode.com/posts') //initial fetch api
    .then(response => response.json())
    .then(posts => {
        posts.forEach(post => {
            postContainer.innerHTML += `
                <div class="Decobox">
                    <h2 class="deco-title">${post.title}</h2>
                    <p class="deco-para">${post.body}</p>
                </div>
            `;
        });
        page++;
    })
    .catch(error => {
        postContainer.innerHTML = '<p>Unexpected error!!</p>';
    });
}
window.addEventListener('scroll', () => { //when you scroll
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        fetchPost(); //fetches data from API if it exceed window height
    }
});

fetchPost();
    