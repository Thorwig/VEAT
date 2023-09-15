import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserIdFromJWT } from "../api/common";
import { tp } from "../routing";
import NavBar from "../components/NavBar";

function HomePage() {
  const [userId] = useState<string | undefined>(getUserIdFromJWT());
  const navigate = useNavigate();

  useEffect(() => {
    if (userId === undefined) {
      navigate(tp("/profile"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NavBar />
      <div>Stats Page</div>
    </>
  );
}

export default HomePage;
