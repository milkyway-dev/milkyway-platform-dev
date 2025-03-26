"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
export const getCookie = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  return token;
}; ``

export const getAwsAlbCookie = async () => {
  const cookieStore = await cookies();
  const awsALBCookie = cookieStore.get("AWSALB")?.value;
  const AWSALBCORSCookie = cookieStore.get("AWSALBCORS")?.value;
  return { awsALBCookie, AWSALBCORSCookie };
}

export const deleteCookie = async () => {
  const cookie = await cookies()
  cookie.delete("token");
};

export const getCurrentUser = async () => {
  const token = await getCookie();
  const user = jwt.decode(token as string);
  return user;
};
