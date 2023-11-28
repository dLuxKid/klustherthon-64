import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as Yup from "yup";
import Loader from "../loader";
import { usersUrl } from "../../utils/urls";

const BusinessSignupForm = () => {
  const navigate = useNavigate()

  const validationSchema = Yup.object({
    businessName: Yup.string().required(),
    businessType: Yup.string().required(),
    businessRegNo: Yup.string().required(),
    businessAddress: Yup.string().required(),
    industry: Yup.string().required(),
    adminName: Yup.string().required(),
    adminPosition: Yup.string().required(),
    adminEmail: Yup.string().email(),
    adminPhone: Yup.string().required(),
    username: Yup.string().required(),
    password: Yup.string().min(8).max(20).required(),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password")],
      "Passwords must match"
    ),
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
          console.log(values)
          try {
            const res = await fetch(usersUrl + '/business/signup', {
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
            <Field
              type="text"
              name="businessName"
              className={input}
              placeholder="Business Name"
              required
            />
            <Field
              type="text"
              name="businessType"
              className={input}
              placeholder="Business Type"
              required
            />
            <Field
              type="text"
              name="businessRegNo"
              className={input}
              placeholder="Business Registration Number"
              required
            />
            <Field
              type="text"
              name="businessAddress"
              className={input}
              placeholder="Business Address"
              required
            />
            <Field
              type="text"
              name="industry"
              className={input}
              placeholder="Industry"
              required
            />
            <Field
              type="text"
              name="adminName"
              className={input}
              placeholder="Administrator's Name"
              required
            />
            <Field
              type="text"
              name="adminPosition"
              className={input}
              placeholder="Administrator's Position"
              required
            />
            <Field
              type="email"
              name="adminEmail"
              className={input}
              placeholder="Administrator's Email"
              required
            />
            <Field
              type="text"
              name="adminPhone"
              className={input}
              placeholder="Administrator's Phone Number"
              required
            />
            <Field
              type="text"
              name="username"
              className={input}
              placeholder="Username"
              required
            />
            <Field
              type="password"
              name="password"
              className={input}
              placeholder="Password"
              required
            />
            <Field
              type="password"
              name="confirmPassword"
              className={input}
              placeholder="Confirm Password"
              required
            />
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
