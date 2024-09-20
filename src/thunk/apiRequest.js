import { axiosInstance } from "../util/axiosInstane";

export const createRequest = async (url, payload, method = "post") => {
  const { data, msg, count, status } = await axiosInstance[method](url, payload)
    .then((res) => {
      const data = res?.data?.data;
      const count = res?.data?.count;
      const msg = res?.data.msg;
      const status = res.status;

      return { data, count, msg, status };
    })
    .catch((err) => {
      throw err;
    });

  return { data, msg, count, status };
};
