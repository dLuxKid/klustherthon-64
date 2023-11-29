import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as Yup from "yup";
import Loader from "../loader";

const BusinessSignupForm = () => {
  const navigate = useNavigate()

  const validationSchema = Yup.object({
    businessName: Yup.string().required("Business Name is required"),
    businessType: Yup.string().required("Business Type is required"),
    businessRegNo: Yup.string().required("Business Registration Number is required"),
    businessAddress: Yup.string().required("Business Address is required"),
    industry: Yup.string().required("Industry is required"),
    adminName: Yup.string().required("Administrator's Name is required"),
    adminPosition: Yup.string().required("Administrator's Position is required"),
    adminEmail: Yup.string().email("Invalid email format").required("Administrator's Email is required"),
    adminPhone: Yup.string().required("Administrator's Phone Number is required"),
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be at most 20 characters")
      .matches(/^(?=.*[a-zA-Z])(?=.*\d).{8,20}$/, "Password must contain letters and numbers")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const input = 'w-full px-4 h-[45px] rounded outline-none border-none text-text text-base font-normal'

  return (
    <>
      <Formik
        initialValues={{
          businessName: "",
          businessType: '',
          businessRegNo: '',
          businessAddress: '',
          industry: '',
          adminName: '',
          adminPosition: '',
          adminEmail: '',
          adminPhone: '',
          username: '',
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true)
          try {
            console.log("Here");
            const res = await fetch('http://localhost:5000/api/users/business/signup/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                'businessName': values.businessName,
                'businessType': values.businessType,
                'businessRegNo': values.businessRegNo,
                'businessAddress': values.businessAddress,
                'industry': values.industry,
                'administratorFullName': values.adminName,
                'administratorPosition': values.adminPosition,
                'administratorEmail': values.adminEmail,
                'administratorPhoneNo': values.adminPhone,
                'userName': values.username,
                'password': values.password,
              }),
            })

            const data = await res.json()

            if (res.ok) {
              toast.success('Business succesfully registered')
              navigate('/login', {
                state: {
                  loginDetails: {
                    loginAs: 'business',
                    email: values.adminEmail,
                    password: values.password
                  }
                }
              })
              setSubmitting(false)
            } else {
              toast.error(data.message.message ?? 'Error registering business')
              setSubmitting(false)
            }
          } catch (error: any) {
            toast.error(error.message.message ?? 'Error registering business')
            setSubmitting(false)
          }
        }}
      >
        {({ isSubmitting, values }) => (
          <Form className="flex items-stretch justify-center flex-col gap-4">
            <div>
              <p className="text-black font-medium mb-1">Business Name</p>
              <Field
                type="text"
                name="businessName"
                className={input}
                placeholder="Business Name"
                required
              />
              <ErrorMessage name="businessName" component='p' className="text-red-600 font-medium" />
            </div>
            <div>
              <p className="text-black font-medium mb-1">Business Type</p>
              <Field
                type="text"
                name="businessType"
                className={input}
                placeholder="Business Type"
                required
              />
              <ErrorMessage name="businessType" component='p' className="text-red-600 font-medium" />
            </div>
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
              <p className="text-black font-medium mb-1">Business Address</p>
              <Field
                type="text"
                name="businessAddress"
                className={input}
                placeholder="Business Address"
                required
              />
              <ErrorMessage name="businessAddress" component='p' className="text-red-600 font-medium" />
            </div>
            <div>
              <p className="text-black font-medium mb-1">Industry</p>
              <Field
                type="text"
                name="industry"
                className={input}
                placeholder="Industry"
                required
              />
              <ErrorMessage name="industry" component='p' className="text-red-600 font-medium" />
            </div>
            <div>
              <p className="text-black font-medium mb-1">Administrator's Name</p>
              <Field
                type="text"
                name="adminName"
                className={input}
                placeholder="Administrator's Name"
                required
              />
              <ErrorMessage name="adminName" component='p' className="text-red-600 font-medium" />
            </div>
            <div>
              <p className="text-black font-medium mb-1">Administrator's Position</p>
              <Field
                type="text"
                name="adminPosition"
                className={input}
                placeholder="Administrator's Position"
                required
              />
              <ErrorMessage name="adminPosition" component='p' className="text-red-600 font-medium" />
            </div>
            <div>
              <p className="text-black font-medium mb-1">Administrator's Email</p>
              <Field
                type="email"
                name="adminEmail"
                className={input}
                placeholder="Administrator's Email"
                required
              />
              <ErrorMessage name="adminEmail" component='p' className="text-red-600 font-medium" />
            </div>
            <div>
              <p className="text-black font-medium mb-1">Administrator's Phone Number</p>
              <Field
                type="text"
                name="adminPhone"
                className={input}
                placeholder="Administrator's Phone Number"
                required
              />
              <ErrorMessage name="adminPhone" component='p' className="text-red-600 font-medium" />
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
              <p className="text-black font-medium mb-1">Password</p>
              <Field
                type="password"
                name="password"
                className={input}
                placeholder="Password"
                required
              />
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
            <button
              type="submit"
              className="w-full bg-primary flex items-center justify-center hover:bg-opacity-90 text-white font-semibold text-lg px-9 py-3 rounded-lg mt-4"
              disabled={
                isSubmitting ||
                !values.businessName ||
                !values.businessType ||
                !values.businessRegNo ||
                !values.businessAddress ||
                !values.industry ||
                !values.adminName ||
                !values.adminPosition ||
                !values.adminEmail ||
                !values.adminPhone ||
                !values.username ||
                !values.password ||
                !values.confirmPassword
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

export default BusinessSignupForm;
