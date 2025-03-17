"use server";
import { redirect } from "next/navigation";
import { config } from "./config";
import { getCookie, getCurrentUser, getAwsAlbCookie } from "./cookies";

interface ApiResponse {
  data?: {
    favouriteGames: string[];
  };
  message?: string;
}

interface JwtPayload {
  username: string;
  designation: string;
  id: string;
}

function isJwtPayload(obj: any): obj is JwtPayload {
  return typeof obj === "object" && "username" && "id" in obj;
}
export const getAuthHeaders = async () => {
  const token = await getCookie();
  const { awsALBCookie, awsALBTGCORSCookie } = await getAwsAlbCookie();

  const cookies = [
    `userToken=${token}`,
    awsALBCookie ? `AWSALBTG=${awsALBCookie}` : "",
    awsALBTGCORSCookie ? `AWSALBTGCORS=${awsALBTGCORSCookie}` : "",
  ]
    .filter(Boolean)
    .join("; ");

  return {
    "Content-Type": "application/json",
    Cookie: cookies,
  };
};
export async function fetchGames(category: string = "all") {
  const headers = await getAuthHeaders();

  try {
    const res = await fetch(
      `${config.server}/api/games?platform=${config.platform}&category=${category}`,
      {
        method: "GET",
        credentials: "include",
        headers: headers,
      },

    );
    if (!res.ok) {
      const error = await res.json();
      throw new Error(`Failed to fetch games: ${error.message}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    redirect("/logout");
  }
}

export const getGameById = async (id: string) => {
  const headers = await getAuthHeaders();

  try {
    const response = await fetch(`${config.server}/api/games/${id}`, {
      method: "GET",
      credentials: "include",
      headers: headers,
      cache: "no-cache",
    });
    const data = await response.json();
    console.log("Game data", data);
    return data;
  } catch (error: unknown) {
    console.error(error);
    redirect("/");
  }
};

export const addFavGame = async (
  id: string,
  type: string
): Promise<ApiResponse> => {
  const token = await getCookie();
  const user = await getCurrentUser();

  if (!isJwtPayload(user)) {
    throw new Error("Invalid user data");
  }

  try {
    const headers = await getAuthHeaders();

    const response = await fetch(
      `${config.server}/api/games/favourite/${user.id}`,
      {
        method: "PUT",
        credentials: "include",
        headers: headers,
      }
    );

    const data: ApiResponse = await response.json();

    return data;
  } catch (error: unknown) {
    console.error(error);
    if (error instanceof Error) {
      return { message: error.message || "Failed to add favorite game" };
    } else {
      return { message: "An unknown error occurred" };
    }
  }

};

export const updatePassword = async (formData: {
  existingPassword: string;
  password: string;
}): Promise<ApiResponse> => {
  const headers = await getAuthHeaders();
  const user = await getCurrentUser();

  // Check if user is of type JwtPayload

  if (!isJwtPayload(user)) {
    throw new Error("Invalid user data");
  }
  try {
    const response = await fetch(`${config.server}/api/users/${user?.id}`, {
      method: "PUT",
      credentials: "include",
      headers: headers,

      body: JSON.stringify({
        existingPassword: formData.existingPassword,
        password: formData.password,
      }),
    });

    if (!response.ok) {
      // Handle non-200 responses
      throw new Error(
        `ErrorPassword: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return { message: data.message };
  } catch (error: unknown) {
    console.error(error);
    if (error instanceof Error) {
      return { message: error.message || "Failed to set new password" };
    } else {
      return { message: "An unknown error occurred" };
    }
  }
};
