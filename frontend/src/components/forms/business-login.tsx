import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as Yup from "yup";
import Loader from "../loader";
import { useAuthContext } from "../../context/useAuthContext";
import { usersUrl } from "../../utils/urls";

type Props = {
  loginDetails: {
    loginAs: 'business' | 'staff',
    email: string,
    password: string
  } | null
}

const BusinessLoginForm = ({ loginDetails }: Props) => {
  const navigate = useNavigate()

  const { dispatch } = useAuthContext()

  const validationSchema = Yup.object({
    email: Yup.string().required('Admininstrator email is required'),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be at most 20 characters")
      .matches(/^(?=.*[a-zA-Z])(?=.*\d).{8,20}$/, "Password must contain letters and numbers")
      .required("Password is required"),
  });

  const input = 'w-full px-4 h-[45px] rounded outline-none border-none text-text text-base font-normal'

  return (
    <>
      <Formik
        initialValues={{
          email: loginDetails && loginDetails.loginAs === 'business' && loginDetails.email || "",
          password: loginDetails && loginDetails.loginAs === 'business' && loginDetails.password || "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true)
          console.log(values)
          try {
            const res = await fetch(usersUrl + '/business/signin', {
              method: "POST",
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                'administratorEmail': values.email,
                'password': values.password
              })
            })

            const data = await res.json()

            if (res.ok) {

              const userDetails = {
                id: data.id,
                bid: data.businessRegNo,
                username: data.userName,
                email: data.administratorEmail,
                isBusiness: data.isBusiness,
                token: data.token
              }
              localStorage.setItem('user', JSON.stringify(userDetails))

              toast.success('Welcome back ' + data.userName)

              dispatch({
                type: 'login', payload: userDetails
              })
              navigate('/dashboard')
              setSubmitting(false)
            } else {
              toast.error(data.message)
              setSubmitting(false)
            }
          } catch (error: any) {
            toast.error(error.message)
          }
        }}
      >
        {({ isSubmitting, values }) => (
          <Form className="flex items-stretch justify-center flex-col gap-4">
            <div>
              <p className="text-black font-medium mb-1">Admin Email</p>
              <Field
                type="text"
                name="email"
                className={input}
                placeholder="Admin Email"
                required
              />
              <ErrorMessage name="email" component='p' className="text-red-600 font-medium" />
            </div>
            <div>
              <p className="text-black font-medium mb-1">Admin Password</p>
              <Field
                type="password"
                name="password"
                className={input}
                placeholder="Admin Password"
                required
              />
              <ErrorMessage name="password" component='p' className="text-red-600 font-medium" />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center bg-primary hover:bg-opacity-90 text-white font-semibold text-lg px-9 py-3 rounded-lg mt-4"
              disabled={isSubmitting || !values.email || !values.password}
            >
              {isSubmitting ? <Loader /> : 'Login'}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default BusinessLoginForm;
