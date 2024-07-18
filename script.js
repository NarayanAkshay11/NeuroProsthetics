// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Blog posts
const blogPosts = [
    {
        title: "Breakthrough in Neural Interface Technology",
        date: "July 18, 2024",
        content: "Our team has achieved a significant milestone in neural interface technology, allowing for more intuitive control of our prosthetic arm."
    },
    {
        title: "Machine Learning Model Improves Gesture Recognition",
        date: "July 15, 2024",
        content: "We've implemented a new machine learning model that dramatically improves the accuracy of gesture recognition in our prosthetic arm."
    }
];

const blogPostsContainer = document.getElementById('blog-posts');
blogPosts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.classList.add('blog-post');
    postElement.innerHTML = `
        <h3>${post.title}</h3>
        <div class="date">${post.date}</div>
        <p>${post.content}</p>
    `;
    blogPostsContainer.appendChild(postElement);
});

// Form submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message. We will get back to you soon!');
    this.reset();
});
