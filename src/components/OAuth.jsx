import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getAuth, GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import { doc, serverTimestamp, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function OAuth() {
  const navigate = useNavigate();

  async function onGoogleClick() {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check user if existed or not?
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      
      navigate("/");

    } catch (error) {
      toast.error("Cannot Sign in with google right now. Try again later.")
    }
  };

  return (
    <button onClick={onGoogleClick} type="button" className="flex items-center justify-center w-full bg-red-600 text-white px-7 py-3 uppercase rounded text-sm font-medium hover:bg-red-700 active:bg-red-800 shadow-md hover:shadow-md active:shadow-lg transition duration-150 ease-in-out">
      <FcGoogle className="text-xl bg-white rounded-full mr-2" />
      Continue with Google
    </button>
  );
};
