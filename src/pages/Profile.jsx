import { useState } from "react";
import { getAuth,updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { doc, serverTimestamp, updateDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [changedDetail, setChangedDetail] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const {name, email} = formData;

  function onLogout() {
    auth.signOut();
    navigate("/");
  };

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  };

  async function onSubmit() {
    try {
      if (auth.currentUser.displayName !== name) {
        // Update name -->
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        // Update name in database FS -->
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          name,
        });
      }
      toast.success("Changes Applied");

    } catch (error) {
      toast.error("Could not apply changes right now. Try again later");
    }
  };

  return (
    <>
      <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
        <h1 className="text-3xl text-center mt-6 font-semibold">My Profile</h1>
        <div className="w-full md:w-[50%] mt-6 px-3">
          <form>
            <input type="text" id="name" value={name} disabled={!changedDetail} onChange={onChange} className={`w-full mb-6 px-4 py-2 text-md text-gray-800 bg-white border border-gray-300 rounded transition ease-in-out ${changedDetail && "bg-blue-200 focus:bg-blue-200"}`} />
            <input type="email" id="email" value={email} disabled className="w-full mb-6 px-4 py-2 text-md text-gray-800 bg-white border border-gray-300 rounded transition ease-in-out" />

            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
              <p className="flex items-center">Change your name?
                <span
                  onClick={() => {
                    changedDetail && onSubmit();
                    setChangedDetail((prevState) => !prevState);
                  }}
                  className="text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer">
                  {changedDetail ? "Apply Changes" : "Edit"}
                </span>
              </p>
              <p onClick={onLogout} className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer">Sign Out</p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};
