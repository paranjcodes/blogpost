document.addEventListener('DOMContentLoaded', () => {
    const commentForm = document.getElementById('commentForm');
    const commentsSection = document.getElementById('commentsSection');
    const uploadForm = document.getElementById('uploadForm');
    const blogsSection = document.getElementById('blogsSection');

    // Handle comments
    if (commentForm) {
        commentForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const comment = document.getElementById('comment').value;

            const commentElement = document.createElement('div');
            commentElement.innerHTML = `<strong>${name}</strong><p>${comment}</p>`;
            commentsSection.appendChild(commentElement);

            commentForm.reset();
        });
    }

    // Handle blog uploads
    if (uploadForm) {
        uploadForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const title = document.getElementById('title').value;
            const content = document.getElementById('content').value;

            const blog = { title, content };
            let blogs = JSON.parse(localStorage.getItem('blogs')) || [];
            blogs.push(blog);
            localStorage.setItem('blogs', JSON.stringify(blogs));

            uploadForm.reset();
        });
    }

    // Display blogs on blog.html
    if (blogsSection) {
        let blogs = JSON.parse(localStorage.getItem('blogs')) || [];
        blogs.forEach((blog, index) => {
            const blogElement = document.createElement('article');
            blogElement.innerHTML = `
                <h2>${blog.title}</h2>
                <p>${blog.content}</p>
                <button onclick="deleteBlog(${index})">Delete</button>
            `;
            blogsSection.appendChild(blogElement);
        });
    }
});

// Function to delete a blog post
function deleteBlog(index) {
    let blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    blogs.splice(index, 1);
    localStorage.setItem('blogs', JSON.stringify(blogs));
    location.reload(); // Reload the page to reflect the changes
}
