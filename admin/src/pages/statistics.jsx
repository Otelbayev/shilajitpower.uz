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
const API_URL = "/statistics";

const Statistics = () => {
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
      count: record.count,
      description: record.description,
    });
    setEditingId(record.id);
    setOpen(true);
  };

  const columns = [
    {
      title: lang === "ru" ? "Количество" : "Count",
      dataIndex: "count",
      align: "center",
    },
    {
      title: lang === "ru" ? "Описание" : "Description",
      dataIndex: "description",
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
            {lang === "ru" ? "Statistics CRUD" : "Statistics CRUD"}
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
              ? "Редактировать статистику"
              : "Edit Statistic"
            : lang === "ru"
            ? "Добавить статистику"
            : "Add Statistic"
        }
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="count"
            label={lang === "ru" ? "Количество" : "Count"}
            rules={[
              {
                required: true,
                message:
                  lang === "ru"
                    ? "Количество обязательно!"
                    : "Count kiritilishi shart!",
              },
            ]}
          >
            <Input min={0} style={{ width: "100%" }} />
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

export default Statistics;
