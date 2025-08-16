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
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import axios from "../utils/axios";

const { Option } = Select;
const API_URL = "/comments";

const Comments = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);
  const [fileListImage, setFileListImage] = useState([]);
  const [lang, setLang] = useState("uz"); // 'uz' yoki 'ru'

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
    fetchData(lang);
  }, [lang]);

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("fullname", values.fullname);
      formData.append("job", values.job);
      formData.append("comment", values.comment);
      formData.append("language_code", lang);

      if (fileListImage.length > 0) {
        formData.append("image", fileListImage[0].originFileObj);
      }

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
      setFileListImage([]);
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
      fullname: record.fullname,
      job: record.job,
      comment: record.comment,
    });
    setEditingId(record.id);
    setFileListImage([]);
    setOpen(true);
  };

  const columns = [
    {
      title: lang === "ru" ? "Изображение" : "Image",
      dataIndex: "image",
      align: "center",
      render: (img) =>
        img ? (
          <img
            src={`${import.meta.env.VITE_IMG_API}/uploads/${img}`}
            alt="profile"
            style={{
              width: 60,
              height: 60,
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
        ) : null,
    },
    {
      title: lang === "ru" ? "ФИО" : "Full Name",
      dataIndex: "fullname",
      align: "center",
    },
    {
      title: lang === "ru" ? "Должность" : "Job",
      dataIndex: "job",
      align: "center",
    },
    {
      title: lang === "ru" ? "Комментарий" : "Comment",
      dataIndex: "comment",
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
            {lang === "ru" ? "Комментарии CRUD" : "Comments CRUD"}
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
            setFileListImage([]);
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
              ? "Редактировать комментарий"
              : "Edit Comment"
            : lang === "ru"
            ? "Добавить комментарий"
            : "Add Comment"
        }
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="fullname"
            label={lang === "ru" ? "ФИО" : "Full Name"}
            rules={[
              {
                required: true,
                message:
                  lang === "ru"
                    ? "ФИО обязательно!"
                    : "Full name kiritilishi shart!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="job"
            label={lang === "ru" ? "Должность" : "Job"}
            rules={[
              {
                required: true,
                message:
                  lang === "ru"
                    ? "Должность обязательна!"
                    : "Job kiritilishi shart!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="comment"
            label={lang === "ru" ? "Комментарий" : "Comment"}
            rules={[
              {
                required: true,
                message:
                  lang === "ru"
                    ? "Комментарий обязателен!"
                    : "Comment kiritilishi shart!",
              },
            ]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item label={lang === "ru" ? "Фото профиля" : "Profile Image"}>
            <Upload
              beforeUpload={() => false}
              fileList={fileListImage}
              onChange={({ fileList }) => setFileListImage(fileList)}
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

export default Comments;
