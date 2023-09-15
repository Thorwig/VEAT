import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { createUser, CreateUser } from "../api/user";
import { tp } from "../routing";

function CreateAccountBody() {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    const newUser: CreateUser = {
      address: values.address,
      email: values.email,
      password: values.password,
      phoneNumber: values.phone,
      username: {
        name: values.name,
        surname: values.surname,
      },
      type: "Restaurant Owner",
    };
    await createUser(newUser);
    navigate(tp("/profile"));
  };

  return (
    <Form initialValues={{ remember: true }} onFinish={onFinish}>
      <div className="flex flex-col px-12 pt-12 text-[--gray] gap-y-2">
        <div className="flex gap-3">
          <div className="flex flex-col gap-1">
            Name
            <Form.Item required name={"name"}>
              <Input
                required
                className="bg-[--light-gray] hover:bg-[--light-gray] focus:bg-[--light-gray]"
                bordered={false}
                size="large"
              />
            </Form.Item>
          </div>
          <div className="flex flex-col gap-1">
            Surname
            <Form.Item required name={"surname"}>
              <Input
                className="bg-[--light-gray] hover:bg-[--light-gray] focus:bg-[--light-gray]"
                bordered={false}
                required
                size="large"
              />
            </Form.Item>
          </div>
        </div>
      </div>
      <div className="flex flex-col px-12 pt-1 text-[--gray] gap-y-2">
        <div className="flex flex-col gap-1">
          Password
          <Form.Item required name={"password"}>
            <Input
              className="bg-[--light-gray] hover:bg-[--light-gray] focus:bg-[--light-gray]"
              bordered={false}
              required
              type="password"
              size="large"
            />
          </Form.Item>
        </div>
      </div>
      <div className="flex flex-col px-12 pt-1 text-[--gray] gap-y-2">
        <div className="flex flex-col gap-1">
          Home address
          <Form.Item required name={"address"}>
            <Input
              className="bg-[--light-gray] hover:bg-[--light-gray] focus:bg-[--light-gray]"
              bordered={false}
              required
              size="large"
            />
          </Form.Item>
        </div>
      </div>
      <div className="flex flex-col px-12 pt-1 text-[--gray] gap-y-2">
        <div className="flex flex-col gap-1">
          Phone number
          <Form.Item required name={"phone"}>
            <Input
              className="bg-[--light-gray] hover:bg-[--light-gray] focus:bg-[--light-gray]"
              bordered={false}
              required
              size="large"
            />
          </Form.Item>
        </div>
      </div>
      <div className="flex flex-col px-12 pt-1 text-[--gray] gap-y-2">
        <div className="flex flex-col gap-1">
          Email
          <Form.Item required name={"email"}>
            <Input
              className="bg-[--light-gray] hover:bg-[--light-gray] focus:bg-[--light-gray]"
              bordered={false}
              required
              size="large"
            />
          </Form.Item>
        </div>
      </div>
      <div className="flex flex-col px-12 justify-center items-center">
        <Form.Item>
          <Button
            className="flex justify-center items-center w-min mt-7"
            type="primary"
            size="large"
            htmlType="submit"
          >
            <div className="flex justify-center items-center mx-2">
              Create my account
            </div>
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
}

export default CreateAccountBody;
