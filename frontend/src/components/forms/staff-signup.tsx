import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as Yup from "yup";
import Loader from "../loader";
import { usersUrl } from "../../utils/urls";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const StaffSignupForm = () => {
  const [visibility, setVisibility] = useState<boolean>(false);

  const navigate = useNavigate()

  const validationSchema = Yup.object({
    businessRegNo: Yup.string().required("Business Registration Number is required"),
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email format"),
    staffId: Yup.string().required("Staff ID is required"),
    department: Yup.string().required("Department is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be at most 20 characters")
      .matches(/^(?=.*[a-zA-Z])(?=.*\d).{8,20}$/, "Password must contain letters and numbers")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
    username: Yup.string().required("Username is required"),
    managerName: Yup.string().required("Manager Name is required"),
  });

  const input = 'w-full px-4 h-[45px] rounded outline-none border-none text-text text-base font-normal'

  return (
    <>
      <Formik
        initialValues={{
          businessRegNo: "",
          fullName: '',
          email: '',
          staffId: '',
          department: '',
          password: "",
          confirmPassword: '',
          username: '',
          managerName: ''
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true)
          try {
            const res = await fetch(usersUrl + '/staff/signup', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                'name': values.fullName,
                'staffId': values.staffId,
                'email': values.email,
                'department': values.department,
                'password': values.password,
                'userName': values.username,
                'managerName': values.managerName,
                'businessRegNo': values.businessRegNo,
              }),
            })
            const data = await res.json()

            if (res.ok) {
              toast.success('Staff has been registered')
              navigate('/login', {
                state: {
                  loginDetails: {
                    loginAs: 'staff',
                    businessRegNo: values.businessRegNo,
                    email: values.email,
                    password: values.password
                  }
                }
              })
              setSubmitting(false)
            } else {
              toast.error(data.message)
              setSubmitting(false)
            }
          } catch (error: any) {
            toast.error(error.message)
            setSubmitting(false)
          }
        }}
      >
        {({ isSubmitting, values }) => (
          <Form className="flex items-stretch justify-center flex-col gap-4 md:gap-6">
            <div>
              <p className="text-black font-medium mb-1">Business Registration Number</p>
              <Field
                type="text"
                name="businessRegNo"
                className={input}
                placeholder="Business Registration Number"
                required
              />
              <ErrorMessage name="businessRegNo" component='p' className="text-red-600 font-medium" />
            </div>
            <div>
              <p className="text-black font-medium mb-1">Full Name</p>
              <Field
                type="text"
                name="fullName"
                className={input}
                placeholder="Full Name"
                required
              />
              <ErrorMessage name="fullName" component='p' className="text-red-600 font-medium" />
            </div>
            <div>
              <p className="text-black font-medium mb-1">Staff Email</p>
              <Field
                type="email"
                name="email"
                className={input}
                placeholder="Staff Email"
                required
              />
              <ErrorMessage name="email" component='p' className="text-red-600 font-medium" />
            </div>
            <div>
              <p className="text-black font-medium mb-1">Staff Id</p>
              <Field
                type="text"
                name="staffId"
                className={input}
                placeholder="Staff Id"
                required
              />
              <ErrorMessage name="staffId" component='p' className="text-red-600 font-medium" />
            </div>
            <div>
              <p className="text-black font-medium mb-1">Department</p>
              <Field
                type="text"
                name="department"
                className={input}
                placeholder="Department"
                required
              />
              <ErrorMessage name="department" component='p' className="text-red-600 font-medium" />
            </div>
            <div>
              <p className="text-black font-medium mb-1">Password</p>
              <div className="relative">
                <Field
                  type={visibility ? 'text' : "password"}
                  name="password"
                  className={input}
                  placeholder="Password"
                  required
                />
                <div onClick={() => setVisibility((prev) => !prev)} className="absolute right-4 top-4 cursor-pointer">
                  {visibility ? (
                    <FaRegEye />
                  ) : (
                    <FaRegEyeSlash />
                  )}
                </div>
              </div>
              <ErrorMessage name="password" component='p' className="text-red-600 font-medium" />
            </div>
            <div>
              <p className="text-black font-medium mb-1">Confirm Password</p>
              <Field
                type="password"
                name="confirmPassword"
                className={input}
                placeholder="Confirm Password"
                required
              />
              <ErrorMessage name="confirmPassword" component='p' className="text-red-600 font-medium" />
            </div>
            <div>
              <p className="text-black font-medium mb-1">Username</p>
              <Field
                type="text"
                name="username"
                className={input}
                placeholder="Username"
                required
              />
              <ErrorMessage name="username" component='p' className="text-red-600 font-medium" />
            </div>
            <div>
              <p className="text-black font-medium mb-1">Manager Name</p>
              <Field
                type="text"
                name="managerName"
                className={input}
                placeholder="Manager Name"
                required
              />
              <ErrorMessage name="managerName" component='p' className="text-red-600 font-medium" />
            </div>
            <button
              type="submit"
              className="w-full bg-primary flex items-center justify-center hover:bg-opacity-90 text-white font-semibold text-lg px-9 py-3 rounded-lg mt-4"
              disabled={
                isSubmitting ||
                !values.businessRegNo ||
                !values.fullName ||
                !values.email ||
                !values.staffId ||
                !values.department ||
                !values.password ||
                !values.confirmPassword ||
                !values.username ||
                !values.managerName
              }
            >
              {isSubmitting ? <Loader /> : 'Create Account'}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default StaffSignupForm;
