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
  Upload,
  Select,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import axios from "../utils/axios";

const { Option } = Select;
const API_URL = "/certificates";

const Certificates = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);
  const [fileList, setFileList] = useState([]);
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
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("subtitle", values.subtitle);
      formData.append("description", values.description);
      formData.append("language_code", lang);

      if (fileList.length > 0) {
        formData.append("image", fileList[0].originFileObj);
      }

      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        message.success(lang === "ru" ? "Обновлено!" : "Yangilandi!");
      } else {
        await axios.post(API_URL, formData);
        message.success(lang === "ru" ? "Создано!" : "Yaratildi!");
      }

      fetchData(lang);
      setOpen(false);
      form.resetFields();
      setFileList([]);
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
      message.success(lang === "ru" ? "Удалено!" : "O‘chirildi!");
      fetchData(lang);
    } catch (err) {
      message.error(
        lang === "ru" ? "Ошибка при удалении!" : "O‘chirishda xatolik!"
      );
    }
  };

  const handleEdit = (record) => {
    form.setFieldsValue({
      title: record.title,
      subtitle: record.subtitle,
      description: record.description,
    });
    setEditingId(record.id);
    setFileList([]);
    setOpen(true);
  };

  const columns = [
    {
      title: lang === "ru" ? "Название" : "Title",
      dataIndex: "title",
      align: "center",
    },
    {
      title: lang === "ru" ? "Подзаголовок" : "Subtitle",
      dataIndex: "subtitle",
      align: "center",
    },
    {
      title: lang === "ru" ? "Описание" : "Description",
      dataIndex: "description",
      align: "center",
    },
    {
      title: lang === "ru" ? "Изображение" : "Image",
      dataIndex: "image",
      align: "center",
      render: (img) =>
        img ? (
          <img
            src={`${import.meta.env.VITE_IMG_API}/uploads/${img}`}
            alt="certificate"
            style={{ width: 60, height: 60, objectFit: "cover" }}
          />
        ) : null,
    },
    {
      title: lang === "ru" ? "Действия" : "Actions",
      align: "center",
      width: 20,
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
            {lang === "ru" ? "Certificates CRUD" : "Certificates CRUD"}
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
            setFileList([]);
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
          scroll={{ x: "max-content" }}
        />
      </Card>

      <Modal
        title={
          editingId
            ? lang === "ru"
              ? "Редактировать сертификат"
              : "Edit Certificate"
            : lang === "ru"
            ? "Добавить сертификат"
            : "Add Certificate"
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
            name="subtitle"
            label={lang === "ru" ? "Подзаголовок" : "Subtitle"}
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
            label={lang === "ru" ? "Изображение" : "Image"}
            rules={[{ required: true }]}
          >
            <Upload
              beforeUpload={() => false}
              fileList={fileList}
              onChange={({ fileList }) => setFileList(fileList)}
              accept=".png,.jpg,.jpeg"
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>
                {lang === "ru" ? "Выбрать изображение" : "Select Image"}
              </Button>
            </Upload>
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

export default Certificates;
