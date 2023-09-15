import { useGetUserById } from "../hooks/useGetUserById";

type Props = {
  userId?: string;
};

function AuthenticatedHeaderProfile(props: Props) {
  const { userId } = props;

  const { data: user } = useGetUserById(userId!);

  return (
    <>
      {user ? (
        <div className="flex flex-col justify-center items-center">
          <div className="absolute right-[35vw] top-10 h-32 w-32 bg-[--orange] rounded-full flex justify-center items-center text-6xl font-light border border-solid">
            {user.username.name[0].toLocaleUpperCase() +
              user.username.surname[0].toLocaleUpperCase()}
          </div>
          <div className="w-full">
            <div className="text-xs justify-center flex items-center mt-32">
              Referral code : {user.email}
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default AuthenticatedHeaderProfile;
