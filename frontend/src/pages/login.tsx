import { useEffect, useState } from "react";
import BusinessLoginForm from "../components/forms/business-login";
import StaffLoginForm from "../components/forms/staff-login";
import { useLocation } from "react-router-dom";

const Login = () => {
    const location = useLocation()
    const data: {
        loginAs: 'business' | 'staff',
        email: string,
        password: string
        businessRegNo: string
    } | null = location.state && location.state.loginDetails

    const [loginAs, setLoginAs] = useState<'business' | 'staff'>(data?.loginAs ?? 'business')

    useEffect(() => {
        if (data) setLoginAs(data.loginAs)
    }, [data])

    const base =
        "pb-1 text-lg font-medium text-center whitespace-nowrap text-black";
    const selected = "text-text border-primary border-b-2";

    return (
        <main className="w-full min-h-screen flex items-center justify-center bg-white/10">
            <section className="w-[90%] max-w-2xl my-14 mx-auto p-10 bg-background rounded-lg shadow-lg border border-white flex items-stretch justify-center flex-col gap-4">
                <nav className="inline-flex items-center justify-around w-full gap-4 pt-5">
                    <button
                        type="button"
                        className={`${base} ${loginAs === 'business' && selected}`}
                        onClick={() => {
                            setLoginAs('business')
                        }}
                    >
                        Business
                    </button>
                    <button
                        type="button"
                        className={`${base} ${loginAs === 'staff' && selected}`}
                        onClick={() => {
                            setLoginAs('staff')
                        }}
                    >
                        Staff
                    </button>
                </nav>
                {loginAs === 'business' && <BusinessLoginForm loginDetails={data} />}
                {loginAs === 'staff' && <StaffLoginForm loginDetails={data} />}
            </section>
        </main>

    );
};

export default Login