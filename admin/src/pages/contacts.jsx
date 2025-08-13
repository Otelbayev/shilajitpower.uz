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
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import axios from "../utils/axios";

const API_URL = "/contacts";

const Contacts = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);
  const [fileListIcon, setFileListIcon] = useState([]);

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
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("link", values.link);

      if (fileListIcon.length > 0) {
        formData.append("icon", fileListIcon[0].originFileObj);
      }

      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        message.success("Kontakt yangilandi!");
      } else {
        await axios.post(API_URL, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        message.success("Kontakt qo‘shildi!");
      }

      fetchData();
      setOpen(false);
      form.resetFields();
      setFileListIcon([]);
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
      message.success("Kontakt o‘chirildi!");
      fetchData();
    } catch (err) {
      console.error(err);
      message.error("O‘chirishda xatolik!");
    }
  };

  // Tahrirlashni boshlash
  const handleEdit = (record) => {
    form.setFieldsValue({
      name: record.name,
      link: record.link,
    });
    setEditingId(record.id);
    setFileListIcon([]);
    setOpen(true);
  };

  const columns = [
    {
      title: "Icon",
      dataIndex: "icon",
      align: "center",
      render: (ic) =>
        ic ? (
          <img
            src={`${import.meta.env.VITE_IMG_API}/uploads/${ic}`}
            alt="icon"
            style={{ width: 40, height: 40, objectFit: "cover" }}
          />
        ) : null,
    },
    { title: "Name", dataIndex: "name", align: "center" },
    {
      title: "Link",
      dataIndex: "link",
      align: "center",
      render: (text) => (
        <a href={text} target="_blank" rel="noreferrer">
          {text}
        </a>
      ),
    },
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
        title={<h2 className="text-xl font-bold">Contacts CRUD</h2>}
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              form.resetFields();
              setFileListIcon([]);
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
        title={editingId ? "Edit Contact" : "Add Contact"}
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Name kiritilishi shart!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="link"
            label="Link"
            rules={[{ required: true, message: "Link kiritilishi shart!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Icon">
            <Upload
              beforeUpload={() => false}
              fileList={fileListIcon}
              onChange={({ fileList }) => setFileListIcon(fileList)}
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

export default Contacts;
