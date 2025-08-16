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
const API_URL = "/prices";

const Prices = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);
  const [lang, setLang] = useState("uz");

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
      massa: record.massa,
      month: record.month,
      description: record.description,
      price: record.price,
      old_price: record.old_price,
      span: record.span,
    });
    setEditingId(record.id);
    setOpen(true);
  };

  const columns = [
    {
      title: lang === "ru" ? "Масса" : "Massa",
      dataIndex: "massa",
      align: "center",
    },
    {
      title: lang === "ru" ? "Месяц" : "Month",
      dataIndex: "month",
      align: "center",
    },
    {
      title: lang === "ru" ? "Описание" : "Description",
      dataIndex: "description",
      align: "center",
    },
    {
      title: lang === "ru" ? "Цена" : "Price",
      dataIndex: "price",
      align: "center",
    },
    {
      title: lang === "ru" ? "Старая цена" : "Old Price",
      dataIndex: "old_price",
      align: "center",
    },
    {
      title: lang === "ru" ? "Период" : "Span",
      dataIndex: "span",
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
            {lang === "ru" ? "Цены CRUD" : "Prices CRUD"}
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
          scroll={{ x: "max-content" }}
        />
      </Card>

      <Modal
        title={
          editingId
            ? lang === "ru"
              ? "Редактировать цену"
              : "Edit Price"
            : lang === "ru"
            ? "Добавить цену"
            : "Add Price"
        }
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="massa"
            label={lang === "ru" ? "Масса" : "Massa"}
            rules={[
              {
                required: true,
                message:
                  lang === "ru"
                    ? "Масса обязательна!"
                    : "Massa kiritilishi shart!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="month"
            label={lang === "ru" ? "Месяц" : "Month"}
            rules={[
              {
                required: true,
                message:
                  lang === "ru"
                    ? "Месяц обязателен!"
                    : "Month kiritilishi shart!",
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
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label={lang === "ru" ? "Цена" : "Price"}
            rules={[
              {
                required: true,
                message:
                  lang === "ru"
                    ? "Цена обязательна!"
                    : "Price kiritilishi shart!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="old_price"
            label={lang === "ru" ? "Старая цена" : "Old Price"}
          >
            <Input />
          </Form.Item>
          <Form.Item name="span" label={lang === "ru" ? "Период" : "Span"}>
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

export default Prices;
