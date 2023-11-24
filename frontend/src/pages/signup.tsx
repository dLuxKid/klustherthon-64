import { useState } from "react";
import BusinessSignupForm from "../components/forms/business-signup";
import StaffSignupForm from "../components/forms/staff-signup";

const Signup = () => {
    const [signupType, setSignupType] = useState<'business' | 'staff'>('business')

    const base =
        "pb-1 text-lg font-medium text-center whitespace-nowrap text-black";
    const selected = "text-text border-primary border-b-2";

    return (
        <main className="w-full min-h-screen flex items-center justify-center bg-black/70">
            <section className="w-[90%] max-w-3xl my-14 mx-auto p-10 bg-background rounded-lg shadow-lg border border-white flex items-stretch justify-center flex-col gap-4">
                <nav className="inline-flex items-center justify-around w-full gap-4 pt-5">
                    <button
                        type="button"
                        className={`${base} ${signupType === 'business' && selected}`}
                        onClick={() => {
                            setSignupType('business')
                        }}
                    >
                        Business
                    </button>
                    <button
                        type="button"
                        className={`${base} ${signupType === 'staff' && selected}`}
                        onClick={() => {
                            setSignupType('staff')
                        }}
                    >
                        Staff
                    </button>
                </nav>
                {signupType === 'business' && <BusinessSignupForm />}
                {signupType === 'staff' && <StaffSignupForm />}
            </section>
        </main>

    );
};

export default Signup;
