import { Badge, Button, Flex, Popconfirm, Table } from "antd";
import { Edit, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../context/auth-context";
import axios from "../utils/axios";
import { Link } from "react-router-dom";
import useDeleteRequest from "../hooks/useDeleteRequest";

export default function DataTable({ columns, url, del, edit, status, setSum }) {
  const {
    auth: { user },
  } = useAuth();

  const { deleteRequest } = useDeleteRequest();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(url);
      if (res.status === 200) {
        const mappedData = res.data.map((item, index) => ({
          index: index + 1,
          key: item.id || index,
          ...item,
        }));
        setData(mappedData);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("Ошибка при загрузке данных:", error);
    }
  };

  const onDel = async (id) => {
    const res = await deleteRequest(`${del}/${id}`);

    if (res) {
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  const renderActions = ({ _id }) => (
    <Flex justify="center" gap={3}>
      <Link to={`${edit}/edit/${_id}`}>
        <Button type="primary" icon={<Edit size={15} />} />
      </Link>
      <Popconfirm
        title="Вы уверены, что хотите удалить это?"
        description="Это действие нельзя будет отменить."
        okText="Да"
        cancelText="Нет"
        onConfirm={() => onDel(_id)}
      >
        <Button type="primary" danger icon={<Trash2 size={15} />} />
      </Popconfirm>
    </Flex>
  );

  useEffect(() => {
    if (setSum) {
      setSum(data.reduce((e, i) => e + i.price, 0));
    }
  }, [setSum, data]);

  const renderStatus = (isDeleted) => (
    <Flex gap={5}>
      <Badge status={isDeleted ? "error" : "success"} />
      {isDeleted ? "Удалён" : "Активен"}
    </Flex>
  );

  const baseColumns = [
    {
      key: "id",
      title: "#",
      dataIndex: "index",
      width: 50,
    },
    ...columns,
  ];

  if (user.role === "superadmin" && !status) {
    baseColumns.push({
      key: "status",
      title: "Статус",
      dataIndex: "isDeleted",
      width: 100,
      render: renderStatus,
    });
  }

  baseColumns.push({
    key: "action",
    title: "Действие",
    width: 100,
    fixed: "right",
    render: renderActions,
  });

  return (
    <Table
      dataSource={data}
      columns={baseColumns}
      scroll={{
        x: "max-content",
      }}
      bordered
      size="small"
      loading={loading}
      pagination={data.length > 10 ? true : false}
    />
  );
}
