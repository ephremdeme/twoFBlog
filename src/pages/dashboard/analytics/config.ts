const initAuth = () => {
  return window.gapi.auth2.init({
    client_id: "259106404711-fs2aphvvmchrcdaqnbq907jttjsilaj3.apps.googleusercontent.com", 
  // client_id:"259106404711-s1g6lq6552dlp2mc5l0hrtlcebkgs519.apps.googleusercontent.com",
    scope: "https://www.googleapis.com/auth/analytics.readonly",
  });
};

export const checkSignedIn = () => {
  return new Promise((resolve, reject) => {
    initAuth() //calls the previous function
      .then(() => {
        const auth = window.gapi.auth2.getAuthInstance(); //returns the GoogleAuth object
        resolve(auth.isSignedIn.get()); //returns whether the current user is currently signed in
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};

export const renderButton = () => {
  window.gapi.signin2.render("signin-button", {
    scope: "profile email",
    width: 240,
    height: 50,
    longtitle: true,
    theme: "dark",
    onsuccess: onSuccess,
    onfailure: onFailure,
  });
};

const onSuccess = (googleUser: any) => {
  console.log("Logged in as: " + googleUser.getBasicProfile().getName());
};

const onFailure = (error: any) => {
  console.error(error);
};
