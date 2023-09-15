import { Button, Input, notification } from "antd";
import React from "react";
import { useEffect, useMemo, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router";
import { LogIn, logInUser } from "../api/user";
import { tp } from "../routing";

type Props = {
  setJWToken: (token: string) => void;
};

function UnauthenticatedBodyProfile(props: Props) {
  const { setJWToken } = props;

  const navigate = useNavigate();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [logInInformations, setLogInInformations] = useState<LogIn>({});
  const Context = React.createContext({ name: "Default" });
  const [api, contextHolder] = notification.useNotification();
  const contextValue = useMemo(() => ({ name: "Notification" }), []);

  useEffect(() => {
    if (logInInformations.token) {
      setJWToken(logInInformations.token);
    }
    if (logInInformations.message) {
      openErrorNotification(logInInformations.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logInInformations]);

  const openErrorNotification = (message: string) => {
    let errorMessage = message;
    if (message === "Failed to login") {
      errorMessage = "Unknown user";
    }
    if (message === "Invalid credentials") {
      errorMessage = "Wrong password";
    }
    api.error({
      message: errorMessage,
    });
  };

  return (
    <>
      <div className="flex flex-col px-12 pt-12 text-[--gray] gap-y-2">
        Email address
        <Input
          size="large"
          className="bg-[--light-gray] hover:bg-[--light-gray] focus:bg-[--light-gray]"
          bordered={false}
          placeholder="example.mail@domain.com"
          onChange={(value) => {
            setEmail(value.target.value);
          }}
        />
      </div>
      <div className="flex flex-col px-12 pt-7 text-[--gray] gap-y-2">
        Password
        <Input
          size="large"
          className="bg-[--light-gray] hover:bg-[--light-gray] focus:bg-[--light-gray]"
          bordered={false}
          placeholder="*********"
          type="password"
          onChange={(value) => {
            setPassword(value.target.value);
          }}
        />
        <div className="text-xs mt-1 flex justify-end">
          <div
            className="underline text-[--gray]"
            onClick={() => {
              navigate(tp("/profile/forgot-password"));
            }}
          >
            Forgot password
          </div>
        </div>
      </div>
      <div className="flex flex-col px-12 justify-center items-center">
        <Context.Provider value={contextValue}>
          {contextHolder}
          <Button
            className="flex justify-center items-center w-min mt-12"
            type="primary"
            size="large"
            onClick={async () => {
              if (email && password) {
                setLogInInformations(await logInUser(email, password));
              }
            }}
          >
            <div className="flex justify-center items-center mx-2">Log in</div>
          </Button>
        </Context.Provider>
        <Button
          className="flex justify-center items-center w-min mt-7 border-2"
          type="primary"
          ghost
          size="large"
          href="https://veat.delta-cognition.com/"
        >
          <div className="flex justify-center items-center mx-1 gap-2 text-sm">
            <FcGoogle size={20} /> Connect with Google
          </div>
        </Button>
      </div>
      <div className="flex flex-col px-12 mt-10 pb-3 text-[--gray]">
        <div>
          If you don't have an account, please,
          <b
            className="text-[--orange] underline"
            onClick={() => {
              navigate(tp("/profile/create-account"));
            }}
          >
            Sign up here
          </b>
        </div>
      </div>
    </>
  );
}

export default UnauthenticatedBodyProfile;
