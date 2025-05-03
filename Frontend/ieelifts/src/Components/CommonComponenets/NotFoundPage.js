import React from "react";

import "../../Assets/NotFoundPage.css";

import logo from "../../Assets/Images/logo.png";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <>
      <div className="notFountContainer">
        <div>
          <img className="not-found-logo-image" src={logo} alt="logo" />
        </div>

        <div class="jc-elevator">
          <div id="doors" class="jc-doors">
            <div className="test">
              <div>404</div>
              <div>Page Not Found</div>
              <div>
                <p>
                  The page you are looking for might be renamed removed or might
                  never exist.
                </p>
              </div>
              <div className="not-found-redirect-button">
               <Link to="/Dashboard"><button>Go to Dashboard</button></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
