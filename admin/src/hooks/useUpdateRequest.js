import { message } from "antd";
import axios from "../utils/axios";

const useUpdateRequest = () => {
  const updateRequest = async (url, data = {}) => {
    message.loading({ key: "l", content: "Обновление..." });
    try {
      const response = await axios.put(url, data);
      message.success({ key: "l", content: "Успешно обновлено" });
      return response.data;
    } catch (error) {
      message.error({ key: "l", content: "Ошибка при обновлении" });
      throw error;
    }
  };

  return { updateRequest };
};

export default useUpdateRequest;
