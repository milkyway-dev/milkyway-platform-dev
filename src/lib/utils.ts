import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export enum Events {
  // Playground events
  PLAYGROUND_CREDITS = "playground:credits",
  PLAYGROUND_ENTER = "playground:enter",
  PLAYGROUND_EXIT = "playground:exit",
  PLAYGROUND_GAME_ENTER = "playground:game:enter",
  PLAYGROUND_GAME_EXIT = "playground:game:exit",
  PLAYGROUND_GAME_SPIN = "playground:game:spin",
  PLAYGROUND_GAME_UPDATE = "playground:game:update:payout",
  PLAYGROUND_ALL = "playground:all",
  PLAYGROUND_GAME_URL = "playground:game:url",

}

export const Channels = {
  PLAYGROUND: (username: string) => `playground:${username}`,
};


export function convertToSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove all non-word characters
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with a hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading and trailing hyphens
}
