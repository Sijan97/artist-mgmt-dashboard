import { OnErrorFunction, OnSuccessFunction } from "@/app/api/core";
import { getFromApi, updateToApi } from "@/app/api/profile_api";

export const getProfiles = (
  onSuccess: OnSuccessFunction,
  onFailure: OnErrorFunction,
  token: string
) => {
  getFromApi("", onSuccess, token, onFailure);
};

export const getProfile = (
  resourceId: string,
  onSuccess: OnSuccessFunction,
  onFailure: OnErrorFunction,
  token: string
) => {
  getFromApi(`${resourceId}`, onSuccess, token, onFailure);
};

export const updateProfile = (
  resourceId: string,
  data: any,
  onSuccess: OnSuccessFunction,
  onFailure: OnErrorFunction,
  token: string
) => {
  updateToApi(
    `update_profile/${resourceId}/`,
    data,
    onSuccess,
    onFailure,
    token
  );
};
