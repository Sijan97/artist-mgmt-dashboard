import { LOCAL_API_ENDPOINT, PROD_API_ENDPOINT } from "./config";

export const API_MODE: string =
  typeof process.env.NEXT_APP_API_MODE === "string"
    ? process.env.NEXT_APP_API_MODE
    : "DEV";

export const MODES = {
  DEV: LOCAL_API_ENDPOINT,
  PROD: PROD_API_ENDPOINT,
};

// @ts-ignore
export const CURRENT_MODE: string = MODES[API_MODE];

const USER_API_ENDPOINT = "users/";
const PROFILE_API_ENDPOINT = "user_profiles/";
const ARTIST_API_ENDPOINT = "artists/";
const MUSIC_API_ENDPOINT = "musics/";

export const getBaseEndpoint = () => {
  return CURRENT_MODE;
};

export const makeUrl = (url: string, namespace: string) => {
  let endpointUrl = CURRENT_MODE + USER_API_ENDPOINT;

  if (namespace === "profile") {
    endpointUrl = CURRENT_MODE + PROFILE_API_ENDPOINT;
  } else if (namespace === "artist") {
    endpointUrl = CURRENT_MODE + ARTIST_API_ENDPOINT;
  } else if (namespace === "music") {
    endpointUrl = CURRENT_MODE + MUSIC_API_ENDPOINT;
  }

  return endpointUrl + url;
};
