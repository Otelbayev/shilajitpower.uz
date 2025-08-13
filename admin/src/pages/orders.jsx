import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Space,
  message,
  Card,
  Tag,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import axios from "../utils/axios";
import dayjs from "dayjs";

const API_URL = "/orders";

const Orders = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form] = Form.useForm();

  const fetchData = async () => {
    try {
      const res = await axios.get(API_URL);
      setData(res.data);
    } catch (err) {
      message.error("Ma'lumotlarni yuklashda xatolik");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async (values) => {
    try {
      if (editing) {
        await axios.put(`${API_URL}/${editing.id}`, values);
        message.success("Buyurtma tahrirlandi");
      } else {
        await axios.post(API_URL, values);
        message.success("Buyurtma qo‘shildi");
      }
      fetchData();
      setOpen(false);
      setEditing(null);
      form.resetFields();
    } catch (err) {
      message.error("Saqlashda xatolik");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      message.success("Buyurtma o‘chirildi");
      fetchData();
    } catch (err) {
      message.error("O‘chirishda xatolik");
    }
  };

  console.log(data);

  const columns = [
    {
      title: "Ism Familiya",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Telefon",
      dataIndex: "phone",
      key: "phone",
      align: "center",
    },
    {
      title: "Buyurtma turi",
      dataIndex: "type",
      key: "type",
      align: "center",
    },
    {
      title: "Sana",
      dataIndex: "created_at",
      key: "created_at",
      align: "center",
      render: (value) => (
        <>
          <Tag color="blue">{dayjs(value).format("YYYY/MM/DD")}</Tag>
          <Tag color="blue">{dayjs(value).format("HH:mm")}</Tag>
        </>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (a) =>
        a === "pending" ? (
          <Tag color="blue">Jarayonda</Tag>
        ) : a === "approved" ? (
          <Tag color="green">Gaplashilgan</Tag>
        ) : null,
      key: "status",
      align: "center",
    },
    {
      title: "Tahrirlash",
      align: "center",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={async () => {
            try {
              await axios.put(`/orders/${record.id}/status`, {
                status: "approved",
              });
              message.success("Buyurtma tasdiqlandi!");

              fetchData();
            } catch (error) {
              console.error(error);
              message.error("Tasdiqlashda xatolik yuz berdi");
            }
          }}
        >
          <CheckCircleFilled style={{ fontSize: "20px" }} />
        </Button>
      ),
    },
  ];

  return (
    <Card title="Orders">
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        size="small"
        bordered
      />

      <Modal
        open={open}
        title={editing ? "Buyurtma tahrirlash" : "Buyurtma qo‘shish"}
        onCancel={() => setOpen(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Form.Item
            label="Ism Familiya"
            name="name"
            rules={[{ required: true, message: "Ism Familiya kiriting" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Telefon"
            name="phone"
            rules={[{ required: true, message: "Telefon raqam kiriting" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Buyurtma turi"
            name="type"
            rules={[{ required: true, message: "Buyurtma turini tanlang" }]}
          >
            <Select
              options={[
                {
                  label: "Kurs loyihasi (ishi) himoyasini o'tkazish",
                  value: "Kurs loyihasi (ishi) himoyasini o'tkazish",
                },
                { label: "Diplom himoyasi", value: "Diplom himoyasi" },
                { label: "Boshqa", value: "Boshqa" },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default Orders;
