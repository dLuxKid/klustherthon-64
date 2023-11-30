import { useEffect, useState } from "react";
import BusinessLoginForm from "../components/forms/business-login";
import StaffLoginForm from "../components/forms/staff-login";
import { NavLink, useLocation } from "react-router-dom";
import Back from "../components/go-back";

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
        "pb-1 text-lg font-medium text-center whitespace-nowrap text-black cursor-pointer";
    const selected = "text-text border-primary border-b-2";

    return (
        <main className="w-full min-h-screen flex items-center justify-center bg-white/10 relative">
            <Back />
            <section className="w-[90%] max-w-2xl my-14 mx-auto p-4 md:p-10 bg-background rounded-lg shadow-lg border border-white flex items-stretch justify-center flex-col gap-4">
                <nav className="inline-flex items-center justify-around w-full gap-4 pt-5">
                    <p
                        className={`${base} ${loginAs === 'business' && selected}`}
                        onClick={() => {
                            setLoginAs('business')
                        }}
                    >
                        Business
                    </p>
                    <p
                        className={`${base} ${loginAs === 'staff' && selected}`}
                        onClick={() => {
                            setLoginAs('staff')
                        }}
                    >
                        Staff
                    </p>
                </nav>
                {loginAs === 'business' && <BusinessLoginForm loginDetails={data} />}
                {loginAs === 'staff' && <StaffLoginForm loginDetails={data} />}
                <NavLink to={'/signup'}>
                    <p className="text-black hover:text-primary font-semibold text-base cursor-pointer -mt-3">Click to signup</p>
                </NavLink>
            </section>
        </main>

    );
};

export default Login