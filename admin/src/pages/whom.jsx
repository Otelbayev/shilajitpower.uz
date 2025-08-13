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

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("who", values.who);
      formData.append("problem", values.problem);
      formData.append("solution", values.solution);
      values.benefits?.forEach((b, i) => {
        formData.append(`benefits[${i}]`, b);
      });

      if (fileListImage.length > 0) {
        formData.append("image", fileListImage[0].originFileObj);
      }
      if (fileListIcon.length > 0) {
        formData.append("icon", fileListIcon[0].originFileObj);
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
      setFileListIcon([]);
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
      who: record.who,
      problem: record.problem,
      solution: record.solution,
      benefits: record.benefits || [],
    });
    setEditingId(record.id);
    setFileListImage([]);
    setFileListIcon([]);
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
            alt="main"
            style={{ width: 60, height: 60, objectFit: "cover" }}
          />
        ) : null,
    },
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
    { title: "Who", dataIndex: "who", align: "center" },
    { title: "Problem", dataIndex: "problem", align: "center" },
    { title: "Solution", dataIndex: "solution", align: "center" },
    {
      title: "Benefits",
      dataIndex: "benefits",
      align: "center",

      render: (arr) => (arr ? arr.join(", ") : ""),
    },
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
        title={<h2 className="text-xl font-bold">Problems CRUD</h2>}
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              form.resetFields();
              setFileListImage([]);
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
        title={editingId ? "Edit Problem" : "Add Problem"}
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="who"
            label="Who"
            rules={[{ required: true, message: "Who kiritilishi shart!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="problem"
            label="Problem"
            rules={[{ required: true, message: "Problem kiritilishi shart!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="solution"
            label="Solution"
            rules={[{ required: true, message: "Solution kiritilishi shart!" }]}
          >
            <Input />
          </Form.Item>

          <Form.List name="benefits">
            {(fields, { add, remove }) => (
              <>
                <label>Benefits</label>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={name}
                      rules={[{ required: true, message: "Benefit kirit!" }]}
                    >
                      <Input placeholder="Benefit" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Button type="dashed" onClick={() => add()} block>
                  + Add Benefit
                </Button>
              </>
            )}
          </Form.List>

          <Form.Item label="Main Image">
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

export default Whom;
