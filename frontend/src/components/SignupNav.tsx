import { useState } from "react";
import SignupFormBusiness from "../pages/components/SignupFormBusiness";
import SignupFormStaff from "../pages/components/SignupFormStaffs";

const Nav = ({ signup }) => {
  const [isActive, setIsActive] = useState(false);
  const [business, setBusiness] = useState(false);
  const [staff, setStaff] = useState(false);
  const base =
    "pb-3 text-base font-medium text-center whitespace-nowrap font-px-secondary";
  const seleted = "text-neutral-500 border-twitterBlue border-b-2";

  return (
    <>
      <div className="inline-flex items-center justify-center w-full text-base font-bold text-center">
        <p>{signup ? "Sign Up" : "login"}</p>
      </div>
      <section className="flex-col items-center self-stretch justify-center w-full gap-10 px-4 py-3">
        <div className="flex-col items-center justify-center w-full m-auto">
          <div className="bg-neutral1000 text-neutral50 ">
            <nav className="">
              <div className="inline-flex items-center justify-around w-full pt-5 border-b h-fit border-neutral700">
                <button
                  className={`${base} ${isActive ? seleted : null}`}
                  onClick={() => {
                    setIsActive(!isActive);
                    setBusiness(!business);
                    setStaff(false);
                  }}
                >
                  Business
                </button>
                <button
                  className={`${base} ${!isActive ? seleted : null}`}
                  onClick={() => {
                    setIsActive(!isActive);
                    setStaff(!staff);
                    setBusiness(false);
                  }}
                >
                  Staffs
                </button>
              </div>
            </nav>
            {business && <SignupFormBusiness />}
            {!business && <SignupFormStaff />}
          </div>
        </div>
      </section>
    </>
  );
};

export default Nav;
