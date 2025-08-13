import { message } from "antd";
import axios from "../utils/axios";

const useDeleteRequest = () => {
  const deleteRequest = async (url) => {
    message.loading({ key: "l", content: "Удаление..." });

    try {
      const response = await axios.delete(url);
      message.success({ key: "l", content: "Успешно удалено" });
      return response.data;
    } catch (error) {
      message.error({ key: "l", content: "Ошибка при удалении" });

      throw error;
    }
  };

  return { deleteRequest };
};

export default useDeleteRequest;
