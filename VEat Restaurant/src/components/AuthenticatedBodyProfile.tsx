import { Button, Form, Input } from "antd";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useGetUserById } from "../hooks/useGetUserById";
import { deleteUser, logOutUser, UpdateUser, updateUser } from "../api/user";

type Props = {
  userId?: string;
  JWToken?: string;
  setAuthenticatedUser: (isAuthenticated: boolean) => void;
};

function AuthenticatedBodyProfile(props: Props) {
  const { userId, JWToken, setAuthenticatedUser } = props;

  const [form] = Form.useForm();
  const { data: user } = useGetUserById(userId!);
  const [isNameDisabled, setIsNameDisabled] = useState(true);
  const [isSurameDisabled, setIsSurameDisabled] = useState(true);
  const [isAddressDisabled, setIsAddressDisabled] = useState(true);
  const [isPhoneDisabled, setIsPhoneDisabled] = useState(true);
  const [isPasswordDisabled, setIsPasswordDisabled] = useState(true);

  const onFinish = async (values: any) => {
    if (userId) {
      const userInfo: UpdateUser = {
        address: values.address,
        phoneNumber: values.phone,
        type: "Restaurant Owner",
        username: {
          name: values.name,
          surname: values.surname,
        },
      };
      await updateUser(userId, userInfo);
    }
  };

  useEffect(() => {
    form.setFieldValue("name", user?.username.name);
    form.setFieldValue("surname", user?.username.surname);
    form.setFieldValue("address", user?.address.fullAddress);
    form.setFieldValue("phone", user?.phoneNumber);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Form onFinish={onFinish} form={form}>
      {user ? (
        <>
          <div className="flex flex-col px-12 pt-8 text-[--gray] gap-y-2">
            <div className="flex gap-3">
              <div className="flex flex-col gap-1">
                Name
                <Form.Item
                  required
                  name={"name"}
                  initialValue={user.username.name}
                >
                  <Input
                    required
                    className="bg-[--light-gray] hover:bg-[--light-gray] focus:bg-[--light-gray]"
                    disabled={isNameDisabled}
                    bordered={false}
                    suffix={
                      <Button
                        type="ghost"
                        className="flex items-center justify-center p-2"
                        onClick={() => {
                          setIsNameDisabled(false);
                        }}
                      >
                        <AiFillEdit size={20} />
                      </Button>
                    }
                  />
                </Form.Item>
              </div>
              <div className="flex flex-col gap-1">
                Surname
                <Form.Item
                  required
                  name={"surname"}
                  initialValue={user.username.surname}
                >
                  <Input
                    required
                    className="bg-[--light-gray] hover:bg-[--light-gray] focus:bg-[--light-gray]"
                    disabled={isSurameDisabled}
                    bordered={false}
                    suffix={
                      <Button
                        type="ghost"
                        className="flex items-center justify-center p-1"
                        onClick={() => {
                          setIsSurameDisabled(false);
                        }}
                      >
                        <AiFillEdit size={20} />
                      </Button>
                    }
                  />
                </Form.Item>
              </div>
            </div>
          </div>
          <div className="flex flex-col px-12 pt-1 text-[--gray] gap-y-2">
            <div className="flex flex-col gap-1">
              Home address
              <Form.Item
                required
                name={"address"}
                initialValue={user.address.fullAddress}
              >
                <Input
                  required
                  className="bg-[--light-gray] hover:bg-[--light-gray] focus:bg-[--light-gray]"
                  disabled={isAddressDisabled}
                  bordered={false}
                  suffix={
                    <Button
                      type="ghost"
                      className="flex items-center justify-center p-1"
                      onClick={() => {
                        setIsAddressDisabled(false);
                      }}
                    >
                      <AiFillEdit size={20} />
                    </Button>
                  }
                />
              </Form.Item>
            </div>
          </div>
          <div className="flex flex-col px-12 pt-1 text-[--gray] gap-y-2">
            <div className="flex flex-col gap-1">
              Phone number
              <Form.Item
                required
                name={"phone"}
                initialValue={user.phoneNumber}
              >
                <Input
                  required
                  className="bg-[--light-gray] hover:bg-[--light-gray] focus:bg-[--light-gray]"
                  disabled={isPhoneDisabled}
                  bordered={false}
                  suffix={
                    <Button
                      type="ghost"
                      className="flex items-center justify-center p-1"
                      onClick={() => {
                        setIsPhoneDisabled(false);
                      }}
                    >
                      <AiFillEdit size={20} />
                    </Button>
                  }
                />
              </Form.Item>
            </div>
          </div>
          <div className="flex flex-col px-12 pt-1 text-[--gray] gap-y-2">
            <div className="flex flex-col gap-1">
              Password
              <Form.Item required name={"email"}>
                <Input
                  required
                  className="bg-[--light-gray] hover:bg-[--light-gray] focus:bg-[--light-gray]"
                  disabled={isPasswordDisabled}
                  type="password"
                  bordered={false}
                  suffix={
                    <Button
                      type="ghost"
                      className="flex items-center justify-center p-1"
                      onClick={() => {
                        setIsPasswordDisabled(false);
                      }}
                    >
                      <AiFillEdit size={20} />
                    </Button>
                  }
                />
              </Form.Item>
            </div>
          </div>
          <div className="flex flex-col px-12 justify-center items-center gap-y-5">
            <Form.Item className="my-0">
              <Button
                className="flex justify-center items-center w-min mt-5"
                type="primary"
                size="large"
                htmlType="submit"
              >
                <div className="flex justify-center items-center mx-2">
                  Save changes
                </div>
              </Button>
            </Form.Item>
            <Button
              className="flex justify-center items-center w-min"
              danger
              size="large"
              onClick={async () => {
                await logOutUser(JWToken!);
                setAuthenticatedUser(false);
              }}
            >
              <div className="flex justify-center items-center mx-2 gap-3">
                Log out
              </div>
            </Button>
            <Button
              className="flex justify-center items-center w-min mb-9"
              danger
              type="primary"
              size="large"
              onClick={async () => {
                await deleteUser(user.uid);
                setAuthenticatedUser(false);
                localStorage.removeItem("JWT");
              }}
            >
              <div className="flex justify-center items-center mx-2 gap-3">
                <AiOutlineDelete size={20} /> Delete my account
              </div>
            </Button>
          </div>
        </>
      ) : (
        <div />
      )}
    </Form>
  );
}

export default AuthenticatedBodyProfile;
