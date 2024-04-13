const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (username && password) {
      try {
          const response = await fetch('/api/users/login', {
              method: 'POST',
              body: JSON.stringify({ username, password }),
              headers: { 'Content-Type': 'application/json' },
          });

          if (response.status === 200) {
              document.location.replace('/dashboard');
          } else if (response.status === 401) {
              alert('Invalid username or password. Please try again.');
          } else {
              alert('Login failed. Please try again later.');
          }
      } catch (error) {
          console.error('An error occurred:', error);
          alert('An error occurred. Please try again later.');
      }
      
      // Clear input fields after login attempt
      document.querySelector('#username-login').value = '';
      document.querySelector('#password-login').value = '';
  }
};

document.querySelector('#login-form').addEventListener('submit', loginFormHandler);