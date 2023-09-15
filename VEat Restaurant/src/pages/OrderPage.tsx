import { useEffect, useState } from "react";
import { tp } from "../routing";
import { useNavigate } from "react-router-dom";
import { getUserIdFromJWT } from "../api/common";

function Order() {
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
      <div>Order Page</div>
    </>
  );
}

export default Order;
