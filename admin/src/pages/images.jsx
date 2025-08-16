import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Upload,
  message,
  Space,
  Card,
  Select,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "../utils/axios";

const { Option } = Select;
const API_URL = "/images";

const Images = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [lang, setLang] = useState("uz"); // Til state

  // --- Fetch Data ---
  const fetchData = async (selectedLang = lang) => {
    try {
      const res = await axios.get(API_URL, {
        params: { lang: selectedLang }, // Tilni backendga yuboramiz
      });
      setData(res.data || []);
    } catch (err) {
      console.error(err);
      message.error(
        lang === "ru"
          ? "Ошибка при получении данных!"
          : "Ma'lumotlarni olishda xatolik!"
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, [lang]);

  // --- Submit (Create / Update) ---
  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("language_code", lang); // Backendga tilni yuboramiz

      fileList.forEach((file) => {
        if (file.originFileObj) {
          formData.append("images", file.originFileObj);
        } else if (file.url) {
          formData.append("existingImages", file.url.split("/").pop());
        }
      });

      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        message.success(lang === "ru" ? "Обновлено!" : "Yangilandi!");
      } else {
        await axios.post(API_URL, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        message.success(lang === "ru" ? "Создано!" : "Yaratildi!");
      }

      fetchData(lang);
      setOpen(false);
      form.resetFields();
      setFileList([]);
      setEditingId(null);
    } catch (err) {
      console.error(err);
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
      console.error(err);
      message.error(
        lang === "ru" ? "Ошибка при удалении!" : "O‘chirishda xatolik!"
      );
    }
  };

  const handleEdit = (record) => {
    form.setFieldsValue({
      title: record.title,
      description: record.description,
    });

    let images = [];
    if (record.images?.length) {
      try {
        images = JSON.parse(record.images);
        if (!Array.isArray(images)) images = [];
      } catch (error) {
        console.error("JSON parse error for images:", error, record.images);
        // fallback: record.images ni string array sifatida qabul qilish
        images = [record.images].flat();
      }
    }

    setFileList(
      images.map((img, index) => ({
        uid: String(index),
        name: img,
        status: "done",
        url: `${import.meta.env.VITE_IMG_API}/uploads/${img}`,
      }))
    );

    setEditingId(record.id);
    setOpen(true);
  };

  // --- Columns ---
  const columns = [
    {
      title: lang === "ru" ? "Название" : "Title",
      dataIndex: "title",
      align: "center",
    },
    {
      title: lang === "ru" ? "Описание" : "Description",
      dataIndex: "description",
      align: "center",
      width: 500,
    },
    {
      title: lang === "ru" ? "Изображения" : "Images",
      dataIndex: "images",
      align: "center",
      render: (imgs) => {
        console.log("Raw imgs:", imgs);
        let images = [];
        try {
          images = imgs?.length ? JSON.parse(imgs) : [];
        } catch (error) {
          console.error("JSON parse error:", error);

          if (Array.isArray(imgs)) images = imgs;
        }

        return (
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            {images.map((img, i) => (
              <img
                key={i}
                src={`${import.meta.env.VITE_IMG_API}/uploads/${img}`}
                alt="img"
                style={{ width: 50, height: 50, objectFit: "cover" }}
              />
            ))}
          </div>
        );
      },
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
          <Button size="small" danger onClick={() => handleDelete(record.id)}>
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
            {lang === "ru" ? "Изображения CRUD" : "Images CRUD"}
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
              ? "Редактировать изображение"
              : "Edit Image"
            : lang === "ru"
            ? "Добавить изображение"
            : "Add Image"
        }
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width={600}
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
            name="description"
            label={lang === "ru" ? "Описание" : "Description"}
            rules={[
              {
                required: true,
                message:
                  lang === "ru"
                    ? "Описание обязательно!"
                    : "Description kiritilishi shart!",
              },
            ]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item
            label={lang === "ru" ? "Загрузить изображения" : "Upload Images"}
          >
            <Upload
              listType="picture-card"
              beforeUpload={() => false}
              fileList={fileList}
              onChange={({ fileList }) => setFileList(fileList)}
              multiple
              accept=".png,.jpg,.jpeg,.webp"
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>
                  {lang === "ru" ? "Загрузить" : "Upload"}
                </div>
              </div>
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

export default Images;
