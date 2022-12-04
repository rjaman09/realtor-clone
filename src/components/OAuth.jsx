import { FcGoogle } from "react-icons/fc";

export default function OAuth() {
  return (
    <button className="flex items-center justify-center w-full bg-red-600 text-white px-7 py-3 uppercase rounded text-sm font-medium hover:bg-red-700 active:bg-red-800 shadow-md hover:shadow-md active:shadow-lg transition duration-150 ease-in-out">
      <FcGoogle className="text-xl bg-white rounded-full mr-2" />
      Continue with Google
    </button>
  );
};
