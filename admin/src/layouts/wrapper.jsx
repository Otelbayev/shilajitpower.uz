import { Button, Card, Flex } from "antd";
import { Link } from "react-router-dom";

export default function Wrapper({ children, title }) {
  return (
    <Card
      title={
        <Flex justify="space-between" align="center">
          <div>{title}</div>
          <Link to="add">
            <Button type="primary">Создать</Button>
          </Link>
        </Flex>
      }
    >
      {children}
    </Card>
  );
}
