import { BsCart2, BsHouse } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { tp } from "../routing";
import { useLocation, useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActivePage = (currentPage: string) => {
    if (currentPage.length > 1) {
      return location.pathname.includes(currentPage);
    }
    return currentPage === location.pathname;
  };

  return (
    <div className="absolute bg-black bottom-10 left-7 right-7 rounded-2xl h-14 text-white flex justify-around items-center">
      <BsHouse
        className={`bg-transparent ${
          isActivePage("/") ? "text-[--yellow]" : "text-white"
        }`}
        size={25}
        onClick={() => {
          navigate(tp("/"));
        }}
      />
      <HiOutlineLocationMarker
        className={`bg-transparent ${
          isActivePage("map") ? "text-[--yellow]" : "text-white"
        }`}
        size={25}
        onClick={() => {
          navigate(tp("/map"));
        }}
      />
      <BsCart2
        className={`bg-transparent ${
          isActivePage("cart") ? "text-[--yellow]" : "text-white"
        }`}
        size={25}
        onClick={() => {
          navigate(tp("/cart"));
        }}
      />
      <FiUser
        className={`bg-transparent ${
          isActivePage("profile") ? "text-[--yellow]" : "text-white"
        }`}
        size={25}
        onClick={() => {
          navigate(tp("/profile"));
        }}
      />
    </div>
  );
}

export default NavBar;
