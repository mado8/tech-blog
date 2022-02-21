let newPostButton;
let postButton;
let deleteButton;
let editButton;

postButton = document.getElementById('post-create-button');
deleteButton = document.getElementById('delete-post-button');
newPostButton = document.getElementById('new-post');
editButton = document.getElementById('edit-post-button')

const newPost = () => {
    return window.location.href = '/create'
}

const createPost = async (event) => {
    event.preventDefault()

    const title = document.querySelector('#title-input').value.trim()
    const text = document.querySelector('#text-input').value.trim()
  
    postdata = { title: title, body: text }
    try {
      fetch('/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postdata),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data)
          window.location.href = `/`
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    } catch (err) {
      console.log(err)
    }
};

const updatePost = async (event) => {
  event.preventDefault()

  const title = document.querySelector('#title-input').value.trim()
  const text = document.querySelector('#text-input').value.trim()
  const post_id = editButton.getAttribute("postID")

  postdata = { title: title, body: text }
  try {
    await fetch(`/api/post/${post_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postdata),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data)
        window.location.href = `/dashboard`
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  } catch (err) {
    console.log(err)
  }
};

const deletePost = async (event) => {
    event.preventDefault()

    const post_id = deleteButton.getAttribute("postID")
    try {
      await fetch (`/api/post/${post_id}`, {
          method: 'DELETE',
      })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data)
        window.location.href = `/dashboard`
      })
      .catch((error) => {
        console.error('Error:', error)
      })
    } catch (err) {
      console.log(err)
    }
};

if(newPostButton !== null) {
  newPostButton.addEventListener('click', newPost);
}

if(postButton !== null) {
  postButton.addEventListener('click', createPost);
}

if(editButton !== null) {
  editButton.addEventListener('click', updatePost);
}

if(deleteButton !== null) {
  deleteButton.addEventListener('click', deletePost);
}