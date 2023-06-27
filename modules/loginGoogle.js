function handleClientLoad() {
    gapi.load('auth2', initGoogleSignIn());
  }
  
  function initGoogleSignIn() {
    gapi.auth2.init({
      client_id: '309132159014-gpq1h8qeg5tjohtod722hmeg4okq43o6.apps.googleusercontent.com',
    }).then(() => {
      console.log('Google Sign-In initialized.');
    }).catch((error) => {
      console.log('Error initializing Google Sign-In:', error);
    });
  }
  
  function handleCredentialResponse(response) {
       // decodeJwtResponse() is a custom function defined by you
       // to decode the credential response.
       const responsePayload = decodeJwtResponse(response.credential);
  
       console.log("ID: " + responsePayload.sub);
       console.log('Full Name: ' + responsePayload.name);
       console.log('Given Name: ' + responsePayload.given_name);
       console.log('Family Name: ' + responsePayload.family_name);
       console.log("Image URL: " + responsePayload.picture);
       console.log("Email: " + responsePayload.email);
    }
  
    function decodeJwtResponse(response) {
      const base64Url = response.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
  
      return JSON.parse(jsonPayload);
    }