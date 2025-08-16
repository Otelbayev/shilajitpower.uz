import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  Space,
  Card,
  Select,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "../utils/axios";

const { Option } = Select;
const API_URL = "/questions";

const Questions = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);
  const [lang, setLang] = useState("uz"); // uz yoki ru

  const fetchData = async (selectedLang = lang) => {
    try {
      const res = await axios.get(API_URL, {
        params: { lang: selectedLang },
      });
      setData(res.data || []);
    } catch (err) {
      message.error(
        lang === "ru"
          ? "Ошибка при получении данных!"
          : "Ma'lumotni olishda xatolik!"
      );
    }
  };

  useEffect(() => {
    fetchData(lang);
  }, [lang]);

  const handleSubmit = async (values) => {
    try {
      const payload = { ...values, language_code: lang };

      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, payload);
        message.success(
          lang === "ru" ? "Вопрос обновлен!" : "Savol yangilandi!"
        );
      } else {
        await axios.post(API_URL, payload);
        message.success(
          lang === "ru" ? "Вопрос добавлен!" : "Savol qo‘shildi!"
        );
      }

      fetchData(lang);
      setOpen(false);
      form.resetFields();
      setEditingId(null);
    } catch (err) {
      message.error(
        lang === "ru" ? "Ошибка при сохранении!" : "Saqlashda xatolik!"
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      message.success(lang === "ru" ? "Вопрос удален!" : "Savol o‘chirildi!");
      fetchData(lang);
    } catch (err) {
      message.error(
        lang === "ru" ? "Ошибка при удалении!" : "O‘chirishda xatolik!"
      );
    }
  };

  const handleEdit = (record) => {
    form.setFieldsValue({
      question: record.question,
      answer: record.answer,
    });
    setEditingId(record.id);
    setOpen(true);
  };

  const columns = [
    {
      title: lang === "ru" ? "Вопрос" : "Question",
      dataIndex: "question",
      align: "center",
    },
    {
      title: lang === "ru" ? "Ответ" : "Answer",
      dataIndex: "answer",
      align: "center",
    },
    {
      title: lang === "ru" ? "Действия" : "Actions",
      width: 50,
      align: "center",
      render: (_, record) => (
        <Space>
          <Button
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            {lang === "ru" ? "Редактировать" : "Edit"}
          </Button>
          <Button
            size="small"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            {lang === "ru" ? "Удалить" : "Delete"}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card
        title={
          <h2 className="text-xl font-bold">
            {lang === "ru" ? "Вопросы CRUD" : "Questions CRUD"}
          </h2>
        }
        extra={
          <Select
            value={lang}
            onChange={setLang}
            style={{ width: 120, marginRight: 10 }}
          >
            <Option value="uz">UZ</Option>
            <Option value="ru">RU</Option>
          </Select>
        }
      >
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            form.resetFields();
            setEditingId(null);
            setOpen(true);
          }}
        >
          {lang === "ru" ? "Добавить" : "Add New"}
        </Button>

        <Table
          size="small"
          bordered
          className="mt-4"
          columns={columns}
          dataSource={data}
          rowKey="id"
          pagination={false}
        />
      </Card>

      <Modal
        title={
          editingId
            ? lang === "ru"
              ? "Редактировать вопрос"
              : "Edit Question"
            : lang === "ru"
            ? "Добавить вопрос"
            : "Add Question"
        }
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="question"
            label={lang === "ru" ? "Вопрос" : "Question"}
            rules={[
              {
                required: true,
                message:
                  lang === "ru" ? "Введите вопрос!" : "Savolni kiriting!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="answer"
            label={lang === "ru" ? "Ответ" : "Answer"}
            rules={[
              {
                required: true,
                message: lang === "ru" ? "Введите ответ!" : "Javobni kiriting!",
              },
            ]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            {editingId
              ? lang === "ru"
                ? "Обновить"
                : "Update"
              : lang === "ru"
              ? "Создать"
              : "Create"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default Questions;
