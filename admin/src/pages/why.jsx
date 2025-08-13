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
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import axios from "../utils/axios";

const API_URL = "/why";

const Why = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);
  const [fileList, setFileList] = useState([]);

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

  const handleSubmit = async (values) => {
    console.log(values);
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      if (fileList.length > 0) {
        formData.append("icon", fileList[0].originFileObj);
      }

      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        message.success("Yangilandi!");
      } else {
        await axios.post(API_URL, formData);
        message.success("Yaratildi!");
      }
      fetchData();
      setOpen(false);
      form.resetFields();
      setFileList([]);
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
      title: record.title,
      description: record.description,
    });
    setEditingId(record.id);
    setFileList([]);
    setOpen(true);
  };

  const columns = [
    {
      title: "Icon",
      dataIndex: "icon",
      align: "center",
      render: (icon) =>
        icon ? (
          <img
            src={`${import.meta.env.VITE_IMG_API}/uploads/${icon}`}
            alt="icon"
            style={{ width: 40, height: 40, objectFit: "cover" }}
          />
        ) : null,
    },
    { title: "Title", dataIndex: "title", align: "center" },
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
        title={<h2 className="text-xl font-bold">Why Us CRUD</h2>}
        extra={
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
        title={editingId ? "Edit Why" : "Add Why"}
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item label="Icon" rules={[{ required: !editingId }]}>
            <Upload
              beforeUpload={() => false}
              fileList={fileList}
              onChange={({ fileList }) => setFileList(fileList)}
              accept=".png,.jpg,.jpeg,.svg"
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Select Icon</Button>
            </Upload>
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            {editingId ? "Update" : "Create"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default Why;
