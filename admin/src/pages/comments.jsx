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

const API_URL = "/comments";

const Comments = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);
  const [fileListImage, setFileListImage] = useState([]);

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
    try {
      const formData = new FormData();
      formData.append("fullname", values.fullname);
      formData.append("job", values.job);
      formData.append("comment", values.comment);

      if (fileListImage.length > 0) {
        formData.append("image", fileListImage[0].originFileObj);
      }

      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        message.success("Yangilandi!");
      } else {
        await axios.post(API_URL, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        message.success("Yaratildi!");
      }

      fetchData();
      setOpen(false);
      form.resetFields();
      setFileListImage([]);
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
      title: "Image",
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
    { title: "Full Name", dataIndex: "fullname", align: "center" },
    { title: "Job", dataIndex: "job", align: "center" },
    { title: "Comment", dataIndex: "comment", align: "center" },
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
        title={<h2 className="text-xl font-bold">Comments CRUD</h2>}
        extra={
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
        title={editingId ? "Edit Comment" : "Add Comment"}
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="fullname"
            label="Full Name"
            rules={[
              { required: true, message: "Full name kiritilishi shart!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="job"
            label="Job"
            rules={[{ required: true, message: "Job kiritilishi shart!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="comment"
            label="Comment"
            rules={[{ required: true, message: "Comment kiritilishi shart!" }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item label="Profile Image">
            <Upload
              beforeUpload={() => false}
              fileList={fileListImage}
              onChange={({ fileList }) => setFileListImage(fileList)}
              accept=".png,.jpg,.jpeg"
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Select Image</Button>
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

export default Comments;
