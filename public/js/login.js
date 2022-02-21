let loginButton = document.getElementById('login-button')

const loginFormHandler = async (event) => {
  event.preventDefault()

  const username = document.querySelector('#username-login').value.trim()
  const password = document.querySelector('#password-login').value.trim()

  userdata = { username: username, password: password }
  try {
      await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userdata),
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message)
        if(data.message == 'Incorrect username or password, please try again') {
          return;
        }
        window.location.href = `/home`
      })
      .catch((error) => {
        console.error('Error:', error)
      })
    } catch (err) {
      console.log(err)
}
}

loginButton.addEventListener('click', loginFormHandler)
