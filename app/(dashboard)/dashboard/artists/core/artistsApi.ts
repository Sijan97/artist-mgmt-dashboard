import { OnErrorFunction, OnSuccessFunction } from "@/app/api/core";
import {
  deleteFromApi,
  getFromApi,
  postToApi,
  updateToApi,
} from "@/app/api/artist_api";

export const getArtists = (
  onSuccess: OnSuccessFunction,
  onFailure: OnErrorFunction,
  token: string,
  query?: string
) => {
  getFromApi(`${query}`, onSuccess, token, onFailure);
};

export const getArtist = (
  resourceId: string,
  onSuccess: OnSuccessFunction,
  onFailure: OnErrorFunction,
  token: string
) => {
  getFromApi(`${resourceId}`, onSuccess, token, onFailure);
};

export const createArtist = (
  data: any,
  onSuccess: OnSuccessFunction,
  onFailure: OnErrorFunction,
  token: string
) => {
  postToApi("create_artist/", data, onSuccess, onFailure, token);
};

export const updateArtist = (
  resourceId: string,
  data: any,
  onSuccess: OnSuccessFunction,
  onFailure: OnErrorFunction,
  token: string
) => {
  updateToApi(
    `update_artist/${resourceId}/`,
    data,
    onSuccess,
    onFailure,
    token
  );
};

export const deleteArtist = (
  resourceId: string,
  onSuccess: OnSuccessFunction,
  onFailure: OnErrorFunction,
  token: string
) => {
  deleteFromApi(`delete_artist/${resourceId}/`, onSuccess, token, onFailure);
};
