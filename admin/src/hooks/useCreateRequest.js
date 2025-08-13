import { message } from "antd";
import axios from "../utils/axios";

const useCreateRequest = () => {
  const createRequest = async (url, data = {}) => {
    message.loading({ key: "l", content: "Создание..." });
    try {
      const response = await axios.post(url, data);
      message.success({ key: "l", content: "Успешно создано" });
      return response.data;
    } catch (error) {
      message.error({ key: "l", content: "Ошибка при создании" });
      throw error;
    }
  };

  return { createRequest };
};

export default useCreateRequest;
