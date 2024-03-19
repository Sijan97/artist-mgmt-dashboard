import { OnErrorFunction, OnSuccessFunction } from "@/app/api/core";
import {
  deleteFromApi,
  getFromApi,
  postToApi,
  updateToApi,
} from "@/app/api/music_api";

export const getMusics = (
  onSuccess: OnSuccessFunction,
  onFailure: OnErrorFunction,
  token: string,
  query?: string
) => {
  getFromApi(`${query}`, onSuccess, token, onFailure);
};

export const getMusic = (
  resourceId: string,
  onSuccess: OnSuccessFunction,
  onFailure: OnErrorFunction,
  token: string
) => {
  getFromApi(`${resourceId}`, onSuccess, token, onFailure);
};

export const getMusicByArtist = (
  artistId: string,
  onSuccess: OnSuccessFunction,
  onFailure: OnErrorFunction,
  token: string,
  query?: string
) => {
  getFromApi(`by_artist/${artistId}`, onSuccess, token, onFailure);
};

export const createMusic = (
  data: any,
  onSuccess: OnSuccessFunction,
  onFailure: OnErrorFunction,
  token: string
) => {
  postToApi("create_music/", data, onSuccess, onFailure, token);
};

export const updateMusic = (
  resourceId: string,
  data: any,
  onSuccess: OnSuccessFunction,
  onFailure: OnErrorFunction,
  token: string
) => {
  updateToApi(`update/${resourceId}`, data, onSuccess, onFailure, token);
};

export const deleteMusic = (
  resourceId: string,
  onSuccess: OnSuccessFunction,
  onFailure: OnErrorFunction,
  token: string
) => {
  deleteFromApi(`delete/${resourceId}/`, onSuccess, token, onFailure);
};
