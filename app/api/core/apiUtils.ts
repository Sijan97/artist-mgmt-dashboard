import axios from "axios";
import _ from "lodash";

import { CONTENT_TYPES, OnErrorFunction, OnSuccessFunction } from "./_models";

const printErrorMessage = (error: any) => {
  // console.log(error);
};

const doNothingSuccess = () => {};

export const baseSendRequest = (
  endpoint: string,
  method: string,
  data: any,
  onSuccess: OnSuccessFunction = doNothingSuccess,
  onError: OnErrorFunction = printErrorMessage,
  token: string,
  contentType = CONTENT_TYPES.JSON,
  fullHeaders = null
) => {
  const headers = _.isNull(fullHeaders) ? {} : fullHeaders;
  axios({
    url: endpoint,
    method,
    headers: {
      ...headers,
      Authorization: `Token ${token}`,
      "Content-Type": contentType,
    },
    data,
  })
    .then((response) => {
      onSuccess(response.data, response.headers);
    })
    .catch((error) => {
      if (_.isFunction(onError)) {
        if (error.isAxiosError && error.response && error.response.data) {
          onError(error.response.data);
        } else if (
          error.isAxiosError &&
          error.response &&
          error.response.status === 400
        ) {
          onError({});
        } else {
          onError(_.isObject(error) ? error : {});
        }
      }
    });
};

export const baseGetFromApi = (
  endpoint: string,
  onSuccess: OnSuccessFunction,
  token: string,
  onError?: OnErrorFunction,
  contentType = CONTENT_TYPES.JSON,
  data = null
) => {
  baseSendRequest(
    endpoint,
    "GET",
    data,
    onSuccess,
    onError,
    token,
    contentType
  );
};

export const baseUpdateToApi = (
  endpoint: string,
  data: any,
  onSuccess: OnSuccessFunction,
  onError: OnErrorFunction,
  token: string,
  contentType = CONTENT_TYPES.JSON
) => {
  baseSendRequest(
    endpoint,
    "PUT",
    data,
    onSuccess,
    onError,
    token,
    contentType
  );
};

export const basePostToApi = (
  endpoint: string,
  data: any,
  onSuccess: OnSuccessFunction,
  onError: OnErrorFunction,
  token: string,
  contentType = CONTENT_TYPES.JSON
) => {
  baseSendRequest(
    endpoint,
    "POST",
    data,
    onSuccess,
    onError,
    token,
    contentType
  );
};

export const baseDeleteFromApi = (
  endpoint: string,
  onSuccess: OnSuccessFunction,
  token: string,
  onError?: OnErrorFunction,
  data = null,
  contentType = CONTENT_TYPES.JSON
) => {
  baseSendRequest(
    endpoint,
    "DELETE",
    data,
    onSuccess,
    onError,
    token,
    contentType
  );
};
