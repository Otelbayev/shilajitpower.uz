import { useEffect, useState } from "react";
import { Form, Input, Button, Card, message, InputNumber } from "antd";
import axios from "../utils/axios";

export default function Hero() {
  const [form] = Form.useForm();
  const [heroData, setHeroData] = useState(null);

  const fetchHero = async () => {
    try {
      const { data } = await axios.get("/hero");
      if (data) {
        setHeroData(data);
        form.setFieldsValue(data);
      }
    } catch (err) {
      console.error(err);
      message.error("Ma'lumotni olishda xatolik!");
    }
  };

  useEffect(() => {
    fetchHero();
  }, []);

  const onFinish = async (values) => {
    try {
      if (!heroData || !heroData.id) {
        // Create
        await axios.post("/hero", values);
        message.success("Yaratildi!");
      } else {
        // Update
        await axios.post("/hero", values);
        message.success("Yangilandi!");
      }
      fetchHero();
    } catch (err) {
      console.error(err);
      message.error("Saqlashda xatolik!");
    }
  };

  return (
    <Card title="Hero Section CRUD">
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item rules={[{ required: true }]} label="Title" name="title">
          <Input />
        </Form.Item>
        <Form.Item
          rules={[{ required: true }]}
          label="Subtitle"
          name="subtitle"
        >
          <Input />
        </Form.Item>
        <Form.Item
          rules={[{ required: true }]}
          label="Description"
          name="description"
        >
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item rules={[{ required: true }]} label="Rating" name="rating">
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item rules={[{ required: true }]} label="Reviews" name="reviews">
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          rules={[{ required: true }]}
          label="Microelements"
          name="microelements"
        >
          <Input />
        </Form.Item>
        <Form.Item rules={[{ required: true }]} label="Weight" name="weight">
          <Input />
        </Form.Item>
        <Form.Item
          rules={[{ required: true }]}
          label="Product Name"
          name="product_name"
        >
          <Input />
        </Form.Item>
        <Form.Item rules={[{ required: true }]} label="Badge" name="badge">
          <Input />
        </Form.Item>

        <div className="flex gap-3">
          <Button type="primary" htmlType="submit">
            {heroData ? "Yangilash" : "Yaratish"}
          </Button>
        </div>
      </Form>
    </Card>
  );
}
