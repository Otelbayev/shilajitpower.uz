import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, message, Space, Card } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "../utils/axios";

const API_URL = "/questions";

const Questions = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);

  // Ma'lumotlarni olish
  const fetchData = async () => {
    try {
      const res = await axios.get(API_URL);
      setData(res.data || []);
    } catch (err) {
      console.error(err);
      message.error("Ma'lumotni olishda xatolik!");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Yaratish / Tahrirlash
  const handleSubmit = async (values) => {
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, values);
        message.success("Savol yangilandi!");
      } else {
        await axios.post(API_URL, values);
        message.success("Savol qo‘shildi!");
      }
      fetchData();
      setOpen(false);
      form.resetFields();
      setEditingId(null);
    } catch (err) {
      console.error(err);
      message.error("Saqlashda xatolik!");
    }
  };

  // O‘chirish
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      message.success("Savol o‘chirildi!");
      fetchData();
    } catch (err) {
      console.error(err);
      message.error("O‘chirishda xatolik!");
    }
  };

  // Tahrirlashni boshlash
  const handleEdit = (record) => {
    form.setFieldsValue({
      question: record.question,
      answer: record.answer,
    });
    setEditingId(record.id);
    setOpen(true);
  };

  const columns = [
    { title: "Question", dataIndex: "question", align: "center" },
    { title: "Answer", dataIndex: "answer", align: "center" },
    {
      title: "Actions",
      width: 50,
      align: "center",
      render: (_, record) => (
        <Space>
          <Button
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button
            size="small"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card
        title={<h2 className="text-xl font-bold">Questions CRUD</h2>}
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              form.resetFields();
              setEditingId(null);
              setOpen(true);
            }}
          >
            Add New
          </Button>
        }
      >
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
        title={editingId ? "Edit Question" : "Add Question"}
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="question"
            label="Question"
            rules={[{ required: true, message: "Savolni kiriting!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="answer"
            label="Answer"
            rules={[{ required: true, message: "Javobni kiriting!" }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            {editingId ? "Update" : "Create"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default Questions;
