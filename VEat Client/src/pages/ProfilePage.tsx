import { FiChevronLeft } from "react-icons/fi";
import "./ProfilePage.css";
import UnauthenticatedBodyProfile from "../components/UnauthenticatedBodyProfile";
import UnauthenticatedHeaderProfile from "../components/UnauthenticatedHeaderProfile";
import { useEffect, useState } from "react";
import AuthenticatedHeaderProfile from "../components/AuthenticatedHeaderProfile";
import AuthenticatedBodyProfile from "../components/AuthenticatedBodyProfile";
import { getUserIdFromJWT } from "../api/common";

function ProfilePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [JWToken, setJWToken] = useState<string>();
  const [userId, setUserId] = useState<string>();

  useEffect(() => {
    if (JWToken) {
      localStorage.setItem("JWT", JSON.stringify(JWToken));
      setIsAuthenticated(true);
      setUserId(getUserIdFromJWT());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JWToken]);

  useEffect(() => {
    if (getUserIdFromJWT()) {
      setUserId(getUserIdFromJWT());
      setIsAuthenticated(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="background-gradient-yellow-orange w-screen h-screen relative">
      <div className="flex ml-7 pt-10 justify-between">
        <FiChevronLeft
          size={35}
          className="justify-start w-fit"
          onClick={() => {
            window.history.back();
          }}
        />
      </div>
      {isAuthenticated ? (
        <>
          <AuthenticatedHeaderProfile userId={userId} />
          <div className="absolute bg-white left-0 right-0 top-56 rounded-t-[2.5rem]">
            <AuthenticatedBodyProfile
              userId={userId}
              JWToken={JWToken}
              setAuthenticatedUser={setIsAuthenticated}
            />
          </div>
        </>
      ) : (
        <>
          <UnauthenticatedHeaderProfile />
          <div className="absolute bg-white bottom-0 left-0 right-0 top-56 rounded-t-[2.5rem]">
            <UnauthenticatedBodyProfile setJWToken={setJWToken} />
          </div>
        </>
      )}
    </div>
  );
}

export default ProfilePage;
