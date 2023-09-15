import { useEffect, useState } from "react";
import { getUserIdFromJWT } from "../api/common";
import { useNavigate } from "react-router-dom";
import { tp } from "../routing";
import NavBar from "../components/NavBar";

function OrderHistory() {
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
      <div>Order History Page</div>
    </>
  );
}

export default OrderHistory;
