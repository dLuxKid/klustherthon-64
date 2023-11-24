import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const SignupForm = () => {
  const validationSchema = Yup.object({
    name: Yup.string().required(),
    email: Yup.string().email(),
    password: Yup.string().min(8).max(20).required(),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });

  //   type singup = InferType<typeof validationSchema>;

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));

            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field
              type="text"
              name="name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder:text-orange-500"
              placeholder="Name"
              required
            />
            <ErrorMessage name="name" component="div" />
            <Field
              type="email"
              name="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder:text-orange-500"
              placeholder="Email"
              required
            />
            <ErrorMessage name="email" component="div" />
            <Field
              type="password"
              name="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder:text-orange-500"
              placeholder="Password"
              required
            />
            <ErrorMessage name="password" component="div" />
            <Field
              type="password"
              name="confirmPassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder:text-orange-500"
              placeholder="Confirm Password"
              required
            />
            <ErrorMessage name="confirmPassword" component="div" />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 py-2 font-bold bg-blue-500 border-2 border-none rounded-md text-neutral-50"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SignupForm;
