import React, { useState, useEffect } from "react";
import { renderButton, checkSignedIn } from "./config";
import Report from "./index"

declare global {
    interface Window { gapi: any; }
}

function Admin() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const updateSignin = (signedIn: any) => { //(3)
    setIsSignedIn(signedIn);
    if (!signedIn) {
      renderButton();
    }
  };

  const init = () => { //(2)
    checkSignedIn()
      .then((signedIn: any) => {
        updateSignin(signedIn);
      })
      .catch((error: any) => {
        console.error(error);
      });
  };

  useEffect(() => {
    window.gapi.load("auth2", init); //(1)
  });

  return (
    <div className="App">
      {!isSignedIn ? (
        <div id="signin-button"></div>
      ) : (
        <Report />
      )}
      {/* <Report /> */}
    </div>
  );
}

export default Admin