import {
  baseDeleteFromApi,
  baseGetFromApi,
  basePostToApi,
  baseUpdateToApi,
  CONTENT_TYPES,
  makeUrl,
  OnErrorFunction,
  OnSuccessFunction,
} from "./core";

const makeUrlWithNamespace = (endpoint: string) => makeUrl(endpoint, "artist");

export const getFromApi = (
  endpoint: string,
  onSuccess: OnSuccessFunction,
  token: string,
  onError?: OnErrorFunction,
  contentType = CONTENT_TYPES.JSON,
  data = null
) => {
  baseGetFromApi(
    makeUrlWithNamespace(endpoint),
    onSuccess,
    token,
    onError,
    contentType,
    data
  );
};

export const updateToApi = (
  endpoint: string,
  data: any,
  onSuccess: OnSuccessFunction,
  onError: OnErrorFunction,
  token: string,
  contentType = CONTENT_TYPES.JSON
) => {
  baseUpdateToApi(
    makeUrlWithNamespace(endpoint),
    data,
    onSuccess,
    onError,
    token,
    contentType
  );
};

export const postToApi = (
  endpoint: string,
  data: any,
  onSuccess: OnSuccessFunction,
  onError: OnErrorFunction,
  token: string,
  contentType = CONTENT_TYPES.JSON
) => {
  basePostToApi(
    makeUrlWithNamespace(endpoint),
    data,
    onSuccess,
    onError,
    token,
    contentType
  );
};

export const deleteFromApi = (
  endpoint: string,
  onSuccess: OnSuccessFunction,
  token: string,
  onError?: OnErrorFunction,
  data = null,
  contentType = CONTENT_TYPES.JSON
) => {
  baseDeleteFromApi(
    makeUrlWithNamespace(endpoint),
    onSuccess,
    token,
    onError,
    data,
    contentType
  );
};
