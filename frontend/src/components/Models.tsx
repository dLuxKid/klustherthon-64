import { useState } from "react";
import SignupNav from "../components/SignupNav";

interface LoginFlowProps {
  close: () => void;
}

const LoginFlow: React.FC<LoginFlowProps> = ({ close }) => {
  const [signup, setSignup] = useState(true);
  return (
    <>
      <div
        className="absolute top-0 bottom-0 left-0 right-0 md:w-screen md:h-screen md:bg-blue-300/50"
        onClick={close}
      ></div>
      <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2  bg-zinc-600  text-black  h-screen md:w-5/12 md:h-auto  self-stretch px-3.5 py-2.5 md:rounded-2xl flex-col justify-start items-start gap-3 inline-flex">
        <div className="flex items-center justify-center w-full gap-4">
          <button
            className="px-4 py-2 font-bold bg-blue-500 border-2 border-none rounded-md text-neutral-50"
            onClick={() => setSignup(true)}
          >
            Sign Up{" "}
          </button>
          <button
            className="px-4 py-2 font-bold bg-blue-300 border-2 border-none rounded-md text-neutral-50"
            onClick={() => setSignup(false)}
          >
            Log In
          </button>
        </div>
        {signup && <SignupNav signup={signup} />}
        {!signup && <SignupNav signup={signup} />}
        {/* <div className="inline-flex items-center justify-center w-full text-base font-bold text-center">
          <p>Signup</p>
        </div>
        <section className="flex-col items-center self-stretch justify-center w-full gap-10 px-4 py-3">
          <div className="flex-col items-center justify-center w-full m-auto">
            <SignupNav />
          </div>
        </section> */}
      </div>
    </>
  );
};

export default LoginFlow;
