const postButton = document.getElementById('post-button');
const deleteButton = document.getElementById('delete-button');

const getPost = async (post_id) => {
    const response = await fetch (`/api/post/${post_id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
        alert(response.statusText);
    }
};

const createPost = async () => {
    const response = await fetch ('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
         // render users posts/ loggedin homepage
    } else {
        alert(response.statusText);
    }
};

const deletePost = async (post_id) => {
    const response = await fetch (`/api/post/${post_id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        // render loggedin homepage
    } else {
        alert(response.statusText);
    }
};

postButton.addEventListener('click', createPost);
