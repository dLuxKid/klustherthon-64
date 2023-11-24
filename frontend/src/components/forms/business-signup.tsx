import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const BusinessSignupForm = () => {
  const validationSchema = Yup.object({
    businessName: Yup.string().required(),
    businessType: Yup.string().required(),
    businessRegNo: Yup.string().required(),
    businessAddress: Yup.string().required(),
    industry: Yup.string().required(),
    adminName: Yup.string().required(),
    adminPosition: Yup.string().required(),
    adminEmail: Yup.string().email(),
    adminPhone: Yup.number().required(),
    username: Yup.string().required(),
    password: Yup.string().min(8).max(20).required(),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password")],
      "Passwords must match"
    ),
  });

  //   type singup = InferType<typeof validationSchema>;
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
        onSubmit={(values, { setSubmitting }) => {
          console.log('Form submitted with values', values)
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));

            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
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
              name="businessAdress"
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
              type="number"
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
              className="w-full bg-primary hover:bg-opacity-90 text-white font-semibold text-lg px-9 py-3 rounded-lg mt-4"
              disabled={isSubmitting}
            >
              Create Account
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default BusinessSignupForm;
