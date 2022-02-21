const postButton = document.getElementById('post-button');
const deleteButton = document.getElementById('delete-button');
const newPostButton = document.getElementById('new-post');

const getPost = async (post_id) => {
    const response = await fetch (`/api/post/${post_id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
        alert(response.statusText);
    }
};

const newPost = () => {
    return window.location.href = '/create'
}

const createPost = async (event) => {
    event.preventDefault()

    const username = document.querySelector('#username-signup').value.trim()
    const password = document.querySelector('#password-signup').value.trim()
  
    userdata = { username: username, password: password }
    try {
      fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userdata),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data)
          window.location.href = `/home`
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    } catch (err) {
      console.log(err)
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

newPostButton.addEventListener('click', newPost);
