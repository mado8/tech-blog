const commentButton = document.getElementById('comment-button');

const createCommentHandler = async (event) => {
    event.preventDefault();
    const commentBody = document.querySelector('#comment-input').value.trim();
    const postIdString = document.querySelector('#comment-input').getAttribute('post-id');
    const postId = parseInt(postIdString);
    if (commentBody !== "") {
      commentdata = {
        "body": commentBody,
        "post_id": postId
      }
      try {
        fetch('/api/comments/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(commentdata),
        })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
            window.location.reload();
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      } catch (err) {
        console.log(err);
      }
    }
  }

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

commentButton.addEventListener('click', createCommentHandler);