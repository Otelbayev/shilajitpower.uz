import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, message, Space, Card } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "../utils/axios";

const API_URL = "/statistics";

const Statistics = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);

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

  const handleSubmit = async (values) => 
    try {
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
    } catch (err) {
      console.error(err);
      message.error("Saqlashda xatolik!");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      message.success("O‘chirildi!");
      fetchData();
    } catch (err) {
      console.error(err);
      message.error("O‘chirishda xatolik!");
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
    { title: "Count", dataIndex: "count", align: "center" },
    { title: "Description", dataIndex: "description", align: "center" },
    {
      title: "Actions",
      align: "center",
      width: 50,
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
        title={<h2 className="text-xl font-bold">Statistics CRUD</h2>}
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
          scroll={{ x: "max-content" }}
        />
      </Card>

      <Modal
        title={editingId ? "Edit Statistic" : "Add Statistic"}
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="count"
            label="Count"
            rules={[{ required: true, message: "Count kiritilishi shart!" }]}
          >
            <Input min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Description kiritilishi shart!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            {editingId ? "Update" : "Create"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default Statistics;
