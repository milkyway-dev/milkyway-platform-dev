import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DeleteUser from "@/src/components/layout/DeleteUser";

const Logout = async () => {
  async function deleteToken(): Promise<void> {
    "use server";
    const cookie = await cookies()
cookie.delete("token");
cookie.delete("AWSALBTG");
cookie.delete("AWSALBTGCORS");

    redirect("/login");
  }
  return <DeleteUser deleteToken={deleteToken} />;
};

export default Logout;
