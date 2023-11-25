import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const StaffLoginForm = () => {
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
                            name="email"
                            className={input}
                            placeholder="Staff Email"
                            required
                        />
                        <Field
                            type="password"
                            name="password"
                            className={input}
                            placeholder="Staff Password"
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

export default StaffLoginForm;
