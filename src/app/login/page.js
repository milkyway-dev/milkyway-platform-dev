"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { config } from "../../utils/config";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const validateForm = () => {
    if (username === "" || password === "") {
      toast.error("Username and password are required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      toast.loading("Logging in...");
      const response = await fetch(`${config.server}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const token = data?.token;
        if (token) {
          const decodedToken = jwtDecode(token);
          console.log(decodedToken); // Check the decoded token

          if (decodedToken.designation === "player") {
            toast.dismiss();
            toast.success("Login successful");
            Cookies.set("token", token);
            router.push("/");
          } else {
            toast.dismiss();
            toast.error("Access denied: not a player");
          }
        } else {
          toast.dismiss();
          toast.error("Invalid token received");
        }
      } else {
        toast.dismiss();
        console.log(data.error);
        toast.error(data.error || "Login failed");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("An error occurred. Please try again later.");
    }

    setLoading(false);
  };
  return (
    <div className="relative w-full flex justify-evenly">
      <Image
        src="/login.png"
        alt="login-bg"
        fill
        priority={true}
        quality={100}
        objectPosition="center"
        className=" object-cover"
      />
      <form
        onSubmit={handleSubmit}
        className="z-[2] p-[3%] flex justify-center flex-col gap-[5vw] sm:gap-[3vw] w-[35%] h-[50%] m-auto"
      >
        <div className="bg-gradient-to-b from-[#fff] from-[0%] via-[#a8d4f8] via-[50.72%] to-[#4b97ff] h-[20%] p-[0.5%] rounded-[1vw]">
          <div className="w-[100%] p-[4%] bg-gradient-to-b from-[#0e052d] to-[#2b3953] rouned-[1vw] h-[100%] rounded-[1vw]">
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              placeholder="ACCOUNT"
              className="placeholder-transparent focus:outline-none bg-gradient-to-b from-[#fff] from-[0%] via-[#a8d4f8] via-[50.72%] to-[#4b97ff] bg-clip-text text-transparent w-[100%] h-[100%] text-[2vw]"
              autoComplete="off"
            ></input>
          </div>
        </div>
        <div className="bg-gradient-to-b from-[#fff] from-[0%] via-[#a8d4f8] via-[50.72%] to-[#4b97ff] h-[20%] p-[0.5%] rounded-[1vw]">
          <div className="w-[100%] p-[4%] bg-gradient-to-b from-[#0e052d] to-[#2b3953] rouned-[1vw] h-[100%] rounded-[1vw]">
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="PASSWORD"
              className="placeholder-inherit focus:outline-none bg-gradient-to-b from-[#fff] from-[0%] via-[#a8d4f8] via-[50.72%] to-[#4b97ff] bg-clip-text text-transparent w-[100%] h-[100%] text-[2vw]"
              autoComplete="off"
            ></input>
          </div>
        </div>
        <div className="bg-gradient-to-b from-[#fff] from-[0%] via-[#a8d4f8] via-[50.72%] to-[#4b97ff] h-[20%] p-[0.5%] rounded-[1vw] w-[40%]">
          <div className="bg-gradient-to-b from-[#51B4F1] to-[#4D5CBA] w-full h-[100%] p-[1%] rounded-[1vw]">
            <div className="bg-[#000000e3] h-[100%] w-[100%] p-[0.7%] rounded-[1vw]">
              <div className="bg-gradient-to-r from-[#CDD1D6] via-[#7D7D7D] to-[#EFEFEF] h-[100%] p-[2%] rounded-[1vw]">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-t from-[#119EBF] from-[0%] via-[#0D82B3D6] via-[549.72%] to-[#17C5D8] text-white w-[100%] h-[100%] text-[2vw] p-[2%] rounded-[1vw]"
                >
                  login
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="relative w-[55%] sm:w-[45%] h-[80vw] sm:h-[50vw]">
        <Image
          src="/character.png"
          alt="login-character"
          fill
          className="z-[2] object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
