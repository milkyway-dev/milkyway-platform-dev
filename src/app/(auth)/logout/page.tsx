
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

// 'use client';

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import toast from 'react-hot-toast';
// import Notification from '@/src/components/ui/Notification';


// export default function LogoutPage() {
//   const router = useRouter();

//   useEffect(() => {
//     async function logout() {
//       try {
//         // Make logout request to clear cookies
//         const response = await fetch('/api/auth/logout', {
//           method: 'POST',
//           credentials: 'include'
//         });

//         // Process response
//         const data = await response.json().catch(() => ({ message: 'Logged out' }));

//         toast.custom((t) => (
//           <Notification
//             className="sm:rotate-0 -rotate-90"
//             visible={t.visible}
//             message={data.message || 'Successfully logged out'}
//           />
//         ));
//       } catch (error) {
//         console.log('Logout error:', error);
//         // Show error toast but don't prevent redirect
//         toast.custom((t) => (
//           <Notification
//             className="sm:rotate-0 -rotate-90"
//             visible={t.visible}
//             message="An error occurred during logout"
//           />
//         ));
//       } finally {
//         // Always redirect to login page with full page reload
//         // This ensures all React contexts and states are fully reset
//         router.push('/login');
//       }
//     }

//     logout();
//   }, [toast]);

//   // Show a simple loading message while logging out
//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <p className="text-muted-foreground">Logging out...</p>
//     </div>
//   );
// }
