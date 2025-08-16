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
  Tag,
  Select,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "../utils/axios";

const { Option } = Select;
const API_URL = "/superior";

const Superior = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);
  const [lang, setLang] = useState("uz"); // Til state

  const fetchData = async (selectedLang = lang) => {
    try {
      const res = await axios.get(API_URL, { params: { lang: selectedLang } });
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
    fetchData();
  }, [lang]);

  const handleSubmit = async (values) => {
    try {
      values.fields = values.fields.split(",").map((f) => f.trim());
      values.language_code = lang;

      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, values);
        message.success(lang === "ru" ? "Обновлено!" : "Yangilandi!");
      } else {
        await axios.post(API_URL, values);
        message.success(lang === "ru" ? "Создано!" : "Yaratildi!");
      }

      fetchData(lang);
      setOpen(false);
      form.resetFields();
      setEditingId(null);
    } catch {
      message.error(
        lang === "ru" ? "Ошибка при сохранении!" : "Saqlashda xatolik!"
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      message.success(lang === "ru" ? "Удалено!" : "O‘chirildi!");
      fetchData(lang);
    } catch {
      message.error(
        lang === "ru" ? "Ошибка при удалении!" : "O‘chirishda xatolik!"
      );
    }
  };

  const handleEdit = (record) => {
    form.setFieldsValue({
      title: record.title,
      minTitle: record.minTitle,
      subTitle: record.subTitle,
      description: record.description,
      fields: record.fields.join(", "),
    });
    setEditingId(record.id);
    setOpen(true);
  };

  const columns = [
    {
      title: lang === "ru" ? "Название" : "Title",
      dataIndex: "title",
      align: "center",
    },
    {
      title: lang === "ru" ? "Мини заголовок" : "Min Title",
      dataIndex: "minTitle",
      align: "center",
    },
    {
      title: lang === "ru" ? "Подзаголовок" : "Sub Title",
      dataIndex: "subTitle",
      align: "center",
    },
    {
      title: lang === "ru" ? "Описание" : "Description",
      dataIndex: "description",
      align: "center",
    },
    {
      title: lang === "ru" ? "Поля" : "Fields",
      dataIndex: "fields",
      align: "center",
      render: (fields) =>
        fields?.length ? fields.map((f, i) => <Tag key={i}>{f}</Tag>) : null,
    },
    {
      title: lang === "ru" ? "Действия" : "Actions",
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
            {lang === "ru" ? "Superior CRUD" : "Superior CRUD"}
          </h2>
        }
        extra={
          <Select value={lang} onChange={setLang} style={{ width: 120 }}>
            <Option value="uz">Uz</Option>
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
              ? "Редактировать Superior"
              : "Edit Superior"
            : lang === "ru"
            ? "Добавить Superior"
            : "Add Superior"
        }
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="title"
            label={lang === "ru" ? "Название" : "Title"}
            rules={[
              {
                required: true,
                message:
                  lang === "ru"
                    ? "Название обязательно!"
                    : "Title kiritilishi shart!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="minTitle"
            label={lang === "ru" ? "Мини заголовок" : "Min Title"}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="subTitle"
            label={lang === "ru" ? "Подзаголовок" : "Sub Title"}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label={lang === "ru" ? "Описание" : "Description"}
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item
            name="fields"
            label={
              lang === "ru"
                ? "Поля (через запятую)"
                : "Fields (comma separated)"
            }
            rules={[{ required: true }]}
          >
            <Input
              placeholder={
                lang === "ru"
                  ? "Пример: Поле1, Поле2, Поле3"
                  : "Example: Field1, Field2, Field3"
              }
            />
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

export default Superior;
