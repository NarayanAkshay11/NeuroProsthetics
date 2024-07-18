// Fetch and display all blog posts
fetch('posts.md')
    .then(response => response.text())
    .then(text => {
        const posts = parseMD(text);
        const blogPostsContainer = document.getElementById('all-blog-posts');

        posts.forEach(post => {
            const postElement = createPostElement(post);
            blogPostsContainer.appendChild(postElement);
        });
    });

// Parse Markdown file
function parseMD(text) {
    const posts = [];
    const lines = text.split('\n');
    let currentPost = {};

    lines.forEach(line => {
        if (line.startsWith('# ')) {
            if (currentPost.title) {
                posts.push(currentPost);
            }
            currentPost = { title: line.slice(2), content: '' };
        } else if (line.startsWith('Date: ')) {
            currentPost.date = line.slice(6);
        } else {
            currentPost.content += line + '\n';
        }
    });

    if (currentPost.title) {
        posts.push(currentPost);
    }

    return posts.reverse(); // Most recent first
}

// Create blog post element
function createPostElement(post) {
    const postElement = document.createElement('div');
    postElement.classList.add('blog-post');
    postElement.innerHTML = `
        <h3>${post.title}</h3>
        <div class="date">${post.date}</div>
        <p>${post.content.slice(0, 80)}...</p>
    `;
    postElement.addEventListener('click', () => openDialog(post));
    return postElement;
}

// Dialog functionality
const dialog = document.getElementById('dialog');
const closeBtn = document.getElementsByClassName('close')[0];

function openDialog(post) {
    document.getElementById('dialog-title').textContent = post.title;
    document.getElementById('dialog-date').textContent = post.date;
    document.getElementById('dialog-content').textContent = post.content;
    dialog.style.display = 'block';
}

closeBtn.onclick = function() {
    dialog.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == dialog) {
        dialog.style.display = 'none';
    }
}
