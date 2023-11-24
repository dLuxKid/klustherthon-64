import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const SignupFormStaff = () => {
  const validationSchema = Yup.object({
    staffid: Yup.string().required(),
    password: Yup.string().min(8).max(20).required(),
  });

  //   type singup = InferType<typeof validationSchema>;

  return (
    <>
      <Formik
        initialValues={{
          staffid: "",
          password: "",
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
              name="staffid"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder:text-orange-500"
              placeholder="Staff Id"
              required
            />
            <ErrorMessage name="staffid" component="div" />
            <Field
              type="password"
              name="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder:text-orange-500"
              placeholder="Password"
              required
            />
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

export default SignupFormStaff;
