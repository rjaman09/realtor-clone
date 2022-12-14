import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";
 
// Components -->
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const {name, email, password} = formData;
  const navigate = useNavigate();

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id] : e.target.value,
    }));
  };

  async function onSubmit(e) {
    e.preventDefault();

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      updateProfile(auth.currentUser, {
        displayName: name
      });
      const user = userCredential.user;
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);
      toast.success("Sign Up Successfully");
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong please try again later.");
    }
  };

  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-semibold">Sign Up</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img className="w-full rounded-2xl" src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8a2V5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60" alt="key" />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit={onSubmit}>
            <input className="mb-6 w-full px-4 py-2 text-md text-gray-700 bg-white border-gray-300 rounded transition ease-in-out" type="text" placeholder="Full name" id="name" value={name} onChange={onChange} />
            <input className="mb-6 w-full px-4 py-2 text-md text-gray-700 bg-white border-gray-300 rounded transition ease-in-out" type="email" placeholder="Email address" id="email" value={email} onChange={onChange} />
            <div className="relative mb-6">
              <input className="w-full px-4 py-2 text-md text-gray-700 bg-white border-gray-300 rounded transition ease-in-out" type={showPassword ? "text" : "password"} placeholder="Password" id="password" value={password} onChange={onChange} />
              {showPassword ? (
                <AiFillEyeInvisible className="absolute right-3 top-3 text-[18px] cursor-pointer" onClick={() => setShowPassword((prevState) => !prevState)} />
              ) : (
                <AiFillEye className="absolute right-3 top-3 text-[18px] cursor-pointer" onClick={() => setShowPassword((prevState) => !prevState)} />
              )}
            </div>
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p className="mb-6">Have an account?
                <Link to="/sign-in" className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1">Sign In</Link>
              </p>
              <p>
                <Link to="/forgot-password" className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out">Forgot password?</Link>
              </p>
            </div>
            <button className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800" type="submit">Sign Up</button>
            <div className="my-4 items-center before:border-t flex before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
              <p className="text-center font-semibold mx-4 text-gray-600">OR</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  );
};
