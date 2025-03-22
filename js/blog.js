import blogPosts from './blogData.js';

class BlogManager {
    constructor() {
        this.blogContainer = document.querySelector('.blog-grid');
        this.initializeBlog();
    }

    initializeBlog() {
        // Check if we're on a blog post page
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get('id');

        if (postId) {
            this.renderBlogPost(postId);
        } else if (this.blogContainer) {
            this.renderBlogList();
        }
    }

    renderBlogList() {
        this.blogContainer.innerHTML = '';
        
        blogPosts.forEach(post => {
            const article = document.createElement('article');
            article.className = 'blog-card';
            
            article.innerHTML = `
                <div class="blog-image">
                    <i class="fas fa-${post.thumbnail}"></i>
                </div>
                <div class="blog-content">
                    <h3>${post.title}</h3>
                    <p>${post.description}</p>
                    <a href="blog.html?id=${post.id}" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
                </div>
            `;
            
            this.blogContainer.appendChild(article);
        });
    }

    renderBlogPost(postId) {
        const post = blogPosts.find(p => p.id === parseInt(postId));
        if (!post) {
            window.location.href = 'blog.html';
            return;
        }

        document.title = `${post.title} - Video Buddy Blog`;
        
        // Update meta tags
        this.updateMetaTags(post);

        const mainContent = document.querySelector('main');
        mainContent.innerHTML = `
            <article class="blog-post">
                <div class="container">
                    <a href="blog.html" class="back-to-home">
                        <i class="fas fa-arrow-left"></i> Back to Blog
                    </a>
                    ${post.content}
                    <div class="post-meta">
                        <p class="publish-date">Published on ${new Date(post.publishDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}</p>
                    </div>
                </div>
            </article>
        `;
    }

    updateMetaTags(post) {
        // Update meta description
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', post.description);

        // Update meta keywords
        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (!metaKeywords) {
            metaKeywords = document.createElement('meta');
            metaKeywords.setAttribute('name', 'keywords');
            document.head.appendChild(metaKeywords);
        }
        metaKeywords.setAttribute('content', `video buddy, blog, ${post.title.toLowerCase()}, video downloader`);
    }
}

// Initialize blog functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BlogManager();
});