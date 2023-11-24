import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const StaffSignupForm = () => {
  const validationSchema = Yup.object({
    businessId: Yup.string().required(),
    fullName: Yup.string().required(),
    email: Yup.string().email(),
    employeeId: Yup.string().required(),
    department: Yup.string().required(),
    position: Yup.string().required(),
    phoneNo: Yup.number().required(),
    password: Yup.string().min(8).max(20).required(),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password")],
      "Passwords must match"
    ),
    username: Yup.string().required(),
    managerName: Yup.string().required(),
  });

  //   type singup = InferType<typeof validationSchema>;
  const input = 'w-full px-4 h-[45px] rounded outline-none border-none text-text text-base font-normal'

  return (
    <>
      <Formik
        initialValues={{
          businessId: "",
          fullName: '',
          email: '',
          employeeId: '',
          department: '',
          position: '',
          phoneNo: '',
          password: "",
          confirmPassword: '',
          username: '',
          managerName: ''
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
          <Form className="flex items-stretch justify-center flex-col gap-4">
            <Field
              type="text"
              name="businessId"
              className={input}
              placeholder="Business Id"
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
              name="employeeId"
              className={input}
              placeholder="Employee Id"
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
              type="text"
              name="position"
              className={input}
              placeholder="Position"
              required
            />
            <Field
              type="number"
              name="phoneNo"
              className={input}
              placeholder="Phone Number"
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
              className="w-full bg-primary hover:bg-opacity-90 text-white font-semibold text-lg px-9 py-3 rounded-lg mt-4"
              disabled={isSubmitting}
            // onClick={ }
            >
              Create Account
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default StaffSignupForm;
