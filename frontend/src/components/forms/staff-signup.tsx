import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as Yup from "yup";
import Loader from "../loader";
import { usersUrl } from "../../utils/urls";

const StaffSignupForm = () => {

  const navigate = useNavigate()

  const validationSchema = Yup.object({
    businessRegNo: Yup.string().required(),
    fullName: Yup.string().required(),
    email: Yup.string().email(),
    staffId: Yup.string().required(),
    department: Yup.string().required(),
    password: Yup.string().min(8).max(20).required(),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password")],
      "Passwords must match"
    ),
    username: Yup.string().required(),
    managerName: Yup.string().required(),
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
            const res = await fetch(usersUrl + '/business/signup', {
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
          <Form className="flex items-stretch justify-center flex-col gap-4">
            <Field
              type="text"
              name="businessRegNo"
              className={input}
              placeholder="Business Registration Number"
              required
            />
            <Field
              type="text"
              name="fullName"
              className={input}
              placeholder="Full Name"
              required
            />
            <Field
              type="email"
              name="email"
              className={input}
              placeholder="Staff Email"
              required
            />
            <Field
              type="text"
              name="staffId"
              className={input}
              placeholder="Staff Id"
              required
            />
            <Field
              type="text"
              name="department"
              className={input}
              placeholder="Department"
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
            <Field
              type="text"
              name="username"
              className={input}
              placeholder="Username"
              required
            />
            <Field
              type="text"
              name="managerName"
              className={input}
              placeholder="Manager Name"
              required
            />
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
