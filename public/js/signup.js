const signupButton = document.getElementById('signup-button')

const signupFormHandler = async (event) => {
  event.preventDefault()

  const username = document.querySelector('#username-signup').value.trim()
  const password = document.querySelector('#password-signup').value.trim()

  userdata = { username: username, password: password }
  try {
    await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userdata),
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
}

signupButton.addEventListener('click', signupFormHandler)
