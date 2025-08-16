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
  Select,
  Card,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import axios from "../utils/axios";

const API_URL = "/whom";

const Whom = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);
  const [fileListImage, setFileListImage] = useState([]);
  const [lang, setLang] = useState("uz"); // 'uz' or 'ru'

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
      const formData = new FormData();
      formData.append("who", values.who);
      formData.append("problem", values.problem);
      formData.append("solution", values.solution);
      formData.append("icon", values.icon);
      formData.append("language_code", lang);

      values.benefits?.forEach((b, i) => {
        formData.append(`benefits[${i}]`, b);
      });

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
      who: record.who,
      problem: record.problem,
      solution: record.solution,
      benefits: record.benefits || [],
      icon: record.icon,
    });
    setEditingId(record.id);
    setFileListImage([]);
    setOpen(true);
  };

  const columns = [
    {
      title: lang === "ru" ? "Иконка" : "Icon",
      dataIndex: "icon",
      align: "center",
    },
    { title: lang === "ru" ? "Кто" : "Who", dataIndex: "who", align: "center" },
    {
      title: lang === "ru" ? "Проблема" : "Problem",
      dataIndex: "problem",
      align: "center",
    },
    {
      title: lang === "ru" ? "Решение" : "Solution",
      dataIndex: "solution",
      align: "center",
    },
    {
      title: lang === "ru" ? "Преимущества" : "Benefits",
      dataIndex: "benefits",
      align: "center",
      render: (arr) => arr,
    },
    {
      title: lang === "ru" ? "Изображение" : "Image",
      dataIndex: "image",
      align: "center",
      render: (img) =>
        img ? (
          <img
            src={`${import.meta.env.VITE_IMG_API}/uploads/${img}`}
            alt="main"
            style={{ width: 60, height: 60, objectFit: "cover" }}
          />
        ) : null,
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
            {lang === "ru" ? "Проблемы CRUD" : "Problems CRUD"}
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
              ? "Редактировать проблему"
              : "Edit Problem"
            : lang === "ru"
            ? "Добавить проблему"
            : "Add Problem"
        }
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="who"
            label={lang === "ru" ? "Кто" : "Who"}
            rules={[
              {
                required: true,
                message:
                  lang === "ru" ? "Кто обязателен!" : "Who kiritilishi shart!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="problem"
            label={lang === "ru" ? "Проблема" : "Problem"}
            rules={[
              {
                required: true,
                message:
                  lang === "ru"
                    ? "Проблема обязательна!"
                    : "Problem kiritilishi shart!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="solution"
            label={lang === "ru" ? "Решение" : "Solution"}
            rules={[
              {
                required: true,
                message:
                  lang === "ru"
                    ? "Решение обязательно!"
                    : "Solution kiritilishi shart!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.List name="benefits">
            {(fields, { add, remove }) => (
              <>
                <label>{lang === "ru" ? "Преимущества" : "Benefits"}</label>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={name}
                      rules={[
                        {
                          required: true,
                          message:
                            lang === "ru"
                              ? "Введите преимущество!"
                              : "Benefit kirit!",
                        },
                      ]}
                    >
                      <Input
                        placeholder={lang === "ru" ? "Преимущество" : "Benefit"}
                      />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Button type="dashed" onClick={() => add()} block>
                  {lang === "ru" ? "+ Добавить преимущество" : "+ Add Benefit"}
                </Button>
              </>
            )}
          </Form.List>

          <Form.Item
            label={lang === "ru" ? "Главное изображение" : "Main Image"}
          >
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
          <Form.Item
            name="icon"
            label={lang === "ru" ? "Иконка" : "Icon"}
            rules={[
              {
                required: true,
                message:
                  lang === "ru"
                    ? "Иконка обязательна!"
                    : "Icon kiritilishi shart!",
              },
            ]}
          >
            <Input />
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

export default Whom;
