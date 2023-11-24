import { useState } from "react";
import BusinessLoginForm from "../components/forms/business-login";
import StaffLoginForm from "../components/forms/staff-login";

const Login = () => {
    const [loginType, setLoginType] = useState<'business' | 'staff'>('business')

    const base =
        "pb-1 text-lg font-medium text-center whitespace-nowrap text-black";
    const selected = "text-text border-primary border-b-2";

    return (
        <main className="w-full min-h-screen flex items-center justify-center bg-black/70">
            <section className="w-[90%] max-w-3xl my-14 mx-auto p-10 bg-background rounded-lg shadow-lg border border-white flex items-stretch justify-center flex-col gap-4">
                <nav className="inline-flex items-center justify-around w-full gap-4 pt-5">
                    <button
                        type="button"
                        className={`${base} ${loginType === 'business' && selected}`}
                        onClick={() => {
                            setLoginType('business')
                        }}
                    >
                        Business
                    </button>
                    <button
                        type="button"
                        className={`${base} ${loginType === 'staff' && selected}`}
                        onClick={() => {
                            setLoginType('staff')
                        }}
                    >
                        Staff
                    </button>
                </nav>
                {loginType === 'business' && <BusinessLoginForm />}
                {loginType === 'staff' && <StaffLoginForm />}
            </section>
        </main>

    );
};

export default Login