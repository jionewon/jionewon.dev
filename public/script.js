// For new-post.html
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('title').value;
            const content = document.getElementById('content').value;
            const date = new Date().toISOString().split('T')[0];
            
            // Save to localStorage (temporary)
            let posts = JSON.parse(localStorage.getItem('posts')) || [];
            posts.push({ title, content, date });
            localStorage.setItem('posts', JSON.stringify(posts));
            
            alert('Post saved locally!'); // Replace with redirect later
            window.location.href = 'index.html';
        });
    }
});

// For index.html
document.addEventListener('DOMContentLoaded', () => {
    const postsSection = document.getElementById('posts');
    if (postsSection) {
        let posts = JSON.parse(localStorage.getItem('posts')) || [];
        postsSection.innerHTML = '<h2>Recent Posts</h2>';
        posts.forEach(post => {
            const article = document.createElement('article');
            article.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                <time datetime="${post.date}">${post.date}</time>
            `;
            postsSection.appendChild(article);
        });
    }
});

// For new-post.html submit
fetch('http://localhost:3000/api/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content })
})
.then(res => res.json())
.then(() => window.location.href = 'index.html');

// For index.html load
fetch('http://localhost:3000/api/posts')
    .then(res => res.json())
    .then(posts => {
        // Render posts as before, but use post.date.toLocaleDateString()
    });