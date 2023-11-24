// import img from '../assets/3992745.jpg';

import { createPortal } from "react-dom";
import Signup from "./signp";
import { useState } from "react";

export default function LandingPage() {
  const [showModelSignup, setShoeModelSignup] = useState(false);

  return (
    <main className="bg-background">
      <nav className="bg-fill px-[5%] py-[2.5%] md:px-[7.5%] w-full sticky top-0 bg-transparent backdrop-blur-[2px] shadow-lg">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">EasyLedger</h1>
          <div>
            {/* <NavLink to="/login"> */}
            <button
              type="submit"
              className="px-8 py-3 text-base transition bg-black rounded-md text-slate-100 hover:bg-slate-900 hover:bg-opacity-90 font-semibolds"
              onClick={() => setShoeModelSignup(true)}
            >
              Sign In
            </button>
            {showModelSignup &&
              createPortal(
                <Signup close={() => setShoeModelSignup(false)} />,
                document.body
              )}
          </div>
        </div>
      </nav>
      <section className="p-[5%] md:p-[7.5%] bg-fill min-h-[80vh] w-full bg-center bg-cover bg-no-repeat flex justify-start items-center relative">
        <div className="flex flex-col gap-4 sm:gap-6 md:gap-10 w-[90%] max-w-3xl">
          <h1 className="text-3xl font-bold text-black">
            Effortless Bookkeeping for Small Businesses
          </h1>
          <p className="text-base font-medium md:text-lg text-text">
            Simplify your financial management with EasyLedger, where creating
            professional invoices, effortlessly tracking payments, and managing
            your business finances seamlessly become second nature. Experience
            the ease of streamlined bookkeeping designed to empower
            entrepreneurs. Get started today and take control of your financial
            journey with confidence.
          </p>
          <div>
            {/* <NavLink to="/signup"> */}
            <button
              type="submit"
              className="px-8 py-3 text-lg font-semibold text-white transition rounded-md bg-primary hover:bg-blue-700 hover:bg-opacity-90"
            >
              Get Started Today
            </button>
            {/* </NavLink> */}
          </div>
        </div>
      </section>
      <section className=" p-[5%] md:p-[7.5%] py-[10%] bg-natural flex justify-center items-center w-full">
        <div className="w-full max-w-5xl m-auto border-2 shadow-xl md:w-9/12 border-fill shadow-black">
          <div className="flex justify-center flex-col gap-8 items-center px-[10%] py-[5%] ">
            <div>
              <h2 className="w-full mb-4 text-3xl font-semibold text-center text-gray-800">
                About Us
              </h2>
              <p className="text-gray-600">
                At EasyLedger, we understand the challenges small businesses
                face in managing their finances. Our mission is to simplify
                bookkeeping and empower entrepreneurs to focus on what they do
                best – growing their businesses.
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-2xl font-semibold text-gray-800">
                Our Story
              </h3>
              <p className="text-gray-600">
                Founded with a passion for simplicity and efficiency, EasyLedger
                emerged as a solution to the complexities of traditional
                bookkeeping. We believe that every business, regardless of size,
                should have access to a user-friendly tool that streamlines
                financial processes.
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-2xl font-semibold text-gray-800">
                What Sets Us Apart
              </h3>
              <p className="text-gray-600">
                With a commitment to user-friendly design, EasyLedger stands out
                as a straightforward and intuitive platform. Our goal is to make
                financial management accessible to everyone, from startups to
                established businesses, without the need for extensive
                accounting expertise.
              </p>
            </div>

            <div className="self-start">
              <h3 className="mb-2 text-2xl font-semibold text-gray-800">
                Key Features
              </h3>
              <ul className="pl-6 text-gray-600 list-disc">
                <li>Create professional invoices with ease.</li>
                <li>Effortlessly track payments and manage expenses.</li>
                <li>User-friendly interface designed for efficiency.</li>
                <li>Secure and compliant with financial regulations.</li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="mb-2 text-2xl font-semibold text-gray-800">
                Our Vision
              </h3>
              <p className="text-gray-600">
                At EasyLedger, we envision a world where small business owners
                can navigate their financial landscape with confidence and ease.
                By providing a simple yet powerful bookkeeping solution, we aim
                to empower entrepreneurs to take control of their financial
                destinies.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
