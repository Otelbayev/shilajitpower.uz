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
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "../utils/axios";

const API_URL = "/superior";

const Superior = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);

  const fetchData = async () => {
    try {
      const res = await axios.get(API_URL);
      setData(res.data || []);
    } catch (err) {
      message.error("Ma'lumotni olishda xatolik!");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (values) => {
    try {
      values.fields = values.fields.split(",");
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, values);
        message.success("Yangilandi!");
      } else {
        await axios.post(API_URL, values);
        message.success("Yaratildi!");
      }
      fetchData();
      setOpen(false);
      form.resetFields();
      setEditingId(null);
    } catch {
      message.error("Saqlashda xatolik!");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      message.success("O‘chirildi!");
      fetchData();
    } catch {
      message.error("O‘chirishda xatolik!");
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
    { title: "Title", dataIndex: "title", align: "center" },
    { title: "Min Title", dataIndex: "minTitle", align: "center" },
    { title: "Sub Title", dataIndex: "subTitle", align: "center" },
    { title: "Description", dataIndex: "description", align: "center" },
    {
      title: "Fields",
      dataIndex: "fields",
      align: "center",
      render: (fields) => {
        const data = JSON.parse(fields);
        return data?.length ? data.map((f, i) => <Tag key={i}>{f}</Tag>) : null;
      },
    },
    {
      title: "Actions",
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
        title={<h2 className="text-xl font-bold">Superior CRUD</h2>}
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
          columns={columns}
          dataSource={data}
          rowKey="id"
          pagination={false}
        />
      </Card>

      <Modal
        title={editingId ? "Edit Superior" : "Add Superior"}
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="minTitle"
            label="Min Title"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="subTitle"
            label="Sub Title"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item
            name="fields"
            label="Fields (comma separated)"
            rules={[{ required: true }]}
          >
            <Input placeholder="Example: Field1, Field2, Field3" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            {editingId ? "Update" : "Create"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default Superior;
