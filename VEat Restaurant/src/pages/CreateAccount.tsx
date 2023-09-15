import { useEffect, useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { getUserIdFromJWT } from "../api/common";
import CreateAccountBody from "../components/CreateAccountBody";
import CreateAccountHeader from "../components/CreateAccountHeader";
import { tp } from "../routing";

function CreateAccount() {
  const [userId] = useState<string | undefined>(getUserIdFromJWT());
  const navigate = useNavigate();

  useEffect(() => {
    if (userId !== undefined) {
      navigate(tp("/profile"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="background-gradient-yellow-orange w-screen h-screen relative">
      <div className="flex ml-7 pt-10">
        <FiChevronLeft
          size={35}
          className="justify-start w-fit"
          onClick={() => {
            window.history.back();
          }}
        />
      </div>
      <CreateAccountHeader />
      <div className="absolute bg-white bottom-0 left-0 right-0 top-56 rounded-t-[2.5rem]">
        <CreateAccountBody />
      </div>
    </div>
  );
}

export default CreateAccount;
