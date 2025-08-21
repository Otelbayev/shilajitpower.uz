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
const API_URL = "/contacts";

const Contacts = () => {
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
          lang === "ru" ? "Контакт обновлен!" : "Kontakt yangilandi!"
        );
      } else {
        await axios.post(API_URL, payload);
        message.success(
          lang === "ru" ? "Контакт добавлен!" : "Kontakt qo‘shildi!"
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
      message.success(
        lang === "ru" ? "Контакт удален!" : "Kontakt o‘chirildi!"
      );
      fetchData(lang);
    } catch (err) {
      message.error(
        lang === "ru" ? "Ошибка при удалении!" : "O‘chirishda xatolik!"
      );
    }
  };

  const handleEdit = (record) => {
    form.setFieldsValue({
      name: record.name,
      link: record.link,
      icon: record.icon,
    });
    setEditingId(record.id);
    setOpen(true);
  };

  const columns = [
    {
      title: lang === "ru" ? "Иконка" : "Username",
      dataIndex: "icon",
      align: "center",
    },
    {
      title: lang === "ru" ? "Имя" : "Name",
      dataIndex: "name",
      align: "center",
    },
    {
      title: lang === "ru" ? "Ссылка" : "Link",
      dataIndex: "link",
      align: "center",
    },
    {
      title: lang === "ru" ? "Действия" : "Actions",
      align: "center",
      width: 50,
      render: (_, record) => (
        <Space>
          <Button
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            {lang === "ru" ? "Редактировать" : "Edit"}
          </Button>
          {/* <Button
            size="small"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            {lang === "ru" ? "Удалить" : "Delete"}
          </Button> */}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card
        title={
          <h2 className="text-xl font-bold">
            {lang === "ru" ? "Контакты CRUD" : "Contacts CRUD"}
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
        {data.length <= 3 && (
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
        )}

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
              ? "Редактировать контакт"
              : "Edit Contact"
            : lang === "ru"
            ? "Добавить контакт"
            : "Add Contact"
        }
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label={lang === "ru" ? "Имя" : "Name"}
            rules={[
              {
                required: true,
                message:
                  lang === "ru" ? "Введите имя!" : "Name kiritilishi shart!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="link"
            label={lang === "ru" ? "Ссылка" : "Link"}
            rules={[
              {
                required: true,
                message:
                  lang === "ru" ? "Введите ссылку!" : "Link kiritilishi shart!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="icon" label={lang === "ru" ? "Иконка" : "Username"}>
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

export default Contacts;
