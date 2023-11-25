import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as Yup from "yup";

const BusinessLoginForm = () => {
  const navigate = useNavigate()

  const validationSchema = Yup.object({
    email: Yup.string().required(),
    password: Yup.string().min(8).max(20).required(),
  });

  //   type singup = InferType<typeof validationSchema>;
  const input = 'w-full px-4 h-[45px] rounded outline-none border-none text-text text-base font-normal'

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true)
          try {
            const res = await fetch('http://localhost:5000/api/users/business/signin', {
              method: "POST",
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                'administratorEmail': values.email,
                'password': values.password
              })
            })
            console.log(res)
            console.log(await res.json())

            if (res.ok) {
              toast.success('Welcome back')
              navigate('/dashboard')
              setSubmitting(false)
            } else {
              toast.error('Invalid username or password')
              setSubmitting(false)
            }

          } catch (error) {
            console.log(error)
            toast.error('Error logging in')
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex items-stretch justify-center flex-col gap-4">
            <Field
              type="text"
              name="email"
              className={input}
              placeholder="Admin Email"
              required
            />
            <Field
              type="password"
              name="password"
              className={input}
              placeholder="Admin Password"
              required
            />
            <button
              type="submit"
              className="w-full bg-primary disabled:bg-gray-600 hover:bg-opacity-90 text-white font-semibold text-lg px-9 py-3 rounded-lg mt-4"
              disabled={isSubmitting}
            // onClick={ }
            >
              Login
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default BusinessLoginForm;
