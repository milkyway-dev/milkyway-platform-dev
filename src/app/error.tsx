"use client";
import React from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import Notification from "../components/ui/Notification";
import { useRouter } from "next/navigation";
import { Cookie } from "next/font/google";

const Error = () => {
  const router = useRouter();
  const deleteCookieHandler = () => {
    try {
      Cookies.remove("token");
      Cookies.remove("AWSALBTG");
      Cookies.remove("AWSALBTGCORS");
      toast.custom((t) => (
        <Notification visible={t.visible} message="Logout Successfull" />
      ));
      router.push("/login");
    } catch (error) {
      toast.custom((t) => (
        <Notification visible={t.visible} message="Failed to logout" />
      ));
    }
  };

  return (
    <div className="gradient text-white min-h-screen flex items-center">
      <div className="container mx-auto p-4 flex flex-wrap items-center">
        <div className="w-full md:w-7/12 text-center md:text-left p-4">
          <div className="text-6xl font-medium">404</div>
          <div className="text-xl md:text-3xl font-medium mb-4">
            Oops. Somthing went wrong!.
          </div>
          <div className="text-lg mb-8">
            You may have mistyped the address or the page may have moved.
          </div>
          <button
            className=" border py-2 px-6 rounded-xl text-lg hover:bg-white hover:text-black transition-all"
            onClick={deleteCookieHandler}
          >
            Try to fix
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;
