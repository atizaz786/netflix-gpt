import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/user/userSlice";
import { signInWithEmail, signInWithGoogle } from "../../firebase/authService";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const userData = await signInWithEmail(values.email, values.password);
      dispatch(setUser(userData));
      // Redirect or show success message
    } catch (error) {
      console.log(error.code);
      alert(error.message);
      alert(error.code);
      // Handle errors
    }
    setSubmitting(false);
  };

  const handleGoogleSignIn = async () => {
    try {
      const userData = await signInWithGoogle();
      dispatch(setUser(userData));
      alert("Signed in successfully");
      // Redirect or show success message
    } catch (error) {
      alert(error.code);
      // Handle errors
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-gray-900 bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url('../../assets/login-background.png')` }}
    >
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50"></div>
      <div className="relative z-10">
        <div className="w-full max-w-xs">
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="px-11 pt-6 w-[30vw] pb-8 mb-4 bg-white rounded shadow-md translate-x-[-30%]">
                <div className="mb-4">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-xs text-red-500"
                  />
                </div>
                <div className="mb-6">
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-xs text-red-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 font-bold text-white bg-red-600 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
                  >
                    Sign In
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="w-full px-4 py-2 mt-4 font-bold text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                  >
                    Sign in with Google
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
