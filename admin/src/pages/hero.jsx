import { useEffect, useState } from "react";
import { Form, Input, Button, Card, message, InputNumber, Select } from "antd";
import axios from "../utils/axios";

const { Option } = Select;

export default function Hero() {
  const [form] = Form.useForm();
  const [heroData, setHeroData] = useState(null);
  const [lang, setLang] = useState("uz"); // Tilni tanlash uchun state

  const fetchHero = async (selectedLang = lang) => {
    try {
      const { data } = await axios.get("/hero", {
        params: { lang: selectedLang },
      });
      if (data) {
        setHeroData(data);
        form.setFieldsValue(data);
      }
    } catch (err) {
      console.error(err);
      message.error("Ma'lumotni olishda xatolik!");
      setHeroData(null);
      form.resetFields();
    }
  };

  useEffect(() => {
    fetchHero();
  }, [lang]); // Til o'zgarganda ma'lumotni qayta yuklaymiz

  const onFinish = async (values) => {
    try {
      // Tilni bodyga qo'shamiz
      const payload = { ...values, language_code: lang };

      await axios.post("/hero", payload);

      message.success(heroData ? "Yangilandi!" : "Yaratildi!");
      fetchHero(lang); // Ma'lumotni yangilaymiz
    } catch (err) {
      console.error(err);
      message.error("Saqlashda xatolik!");
    }
  };

  return (
    <Card title="Hero Section CRUD">
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item label="Til">
          <Select value={lang} onChange={(value) => setLang(value)}>
            <Option value="uz">Uzbek</Option>
            <Option value="ru">Русский</Option>
          </Select>
        </Form.Item>

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
            {heroData ? "Yangilash / Обновить" : "Yaratish / Создать"}
          </Button>
        </div>
      </Form>
    </Card>
  );
}
