import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import NotFoundSVG from "../components/NotFoundSVG";
import { tp } from "../routing";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center">
      <div className="w-72 h-72 mt-40">
        <NotFoundSVG />
        <div className="flex flex-col justify-center items-center">
          <Button
            className="flex justify-center items-center w-min mt-12"
            type="primary"
            size="large"
            onClick={() => {
              navigate(tp("/"));
            }}
          >
            <div className="flex justify-center items-center mx-2">
              Go back to home page
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
