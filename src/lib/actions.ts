"use server";
import { redirect } from "next/navigation";
import { config } from "./config";
import { getCookie, getCurrentUser } from "./cookies";
import { revalidatePath } from "next/cache";

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

export async function fetchGames(category: string = "all") {
  const token = await getCookie();
  try {
    const res = await fetch(
      `${config.server}/api/games?platform=${config.platform}&category=${category}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: `userToken=${token}`,
        },
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
  const token = await getCookie();

  try {
    const response = await fetch(`${config.server}/api/games/${id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `userToken=${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error: unknown) {
    console.error(error);
    redirect("/");
  }
};

export const addFavGame = async (id: string, type: string): Promise<ApiResponse> => {
  const token = await getCookie();
  const user = await getCurrentUser();

  if (!isJwtPayload(user)) {
    throw new Error("Invalid user data");
  }

  try {
    const response = await fetch(
      `${config.server}/api/games/favourite/${user.id}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: `userToken=${token}`,
        },
        body: JSON.stringify({ gameId: id, type: type }),
      }
    );

    const data: ApiResponse = await response.json();

    // Trigger revalidation
    revalidatePath('/');

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
  const token = await getCookie();
  const user = await getCurrentUser();

  // Check if user is of type JwtPayload

  if (!isJwtPayload(user)) {
    throw new Error("Invalid user data");
  }
  try {
    const response = await fetch(`${config.server}/api/users/${user?.id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `userToken=${token}`,
      },
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
