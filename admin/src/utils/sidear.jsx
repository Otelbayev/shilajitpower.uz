import {
  Package,
  HelpCircle,
  Medal,
  Presentation,
  Tags,
  UserCheck,
  MessageCircle,
  MailQuestion,
  Contact2,
  ListOrdered,
  Backpack,
} from "lucide-react";

export const sidebar = [
  {
    key: "orders",
    label: "Orders",
    icon: <ListOrdered />,
  },
  {
    key: "hero",
    label: "Hero",
    icon: <Package size={25} />,
  },
  {
    key: "why",
    label: "Why",
    icon: <HelpCircle size={25} />,
  },
  {
    key: "/superior",
    label: "Superior",
    icon: <Backpack />,
  },
  {
    key: "certificates",
    label: "Certificates",
    icon: <Medal size={25} />,
  },
  {
    key: "statistics",
    label: "Statistics",
    icon: <Presentation size={25} />,
  },
  {
    key: "prices",
    label: "Prices",
    icon: <Tags size={25} />,
  },
  {
    key: "whom",
    label: "Whom",
    icon: <UserCheck size={25} />,
  },
  {
    key: "comments",
    label: "Comments",
    icon: <MessageCircle size={25} />,
  },
  {
    key: "questions",
    label: "Questions",
    icon: <MailQuestion size={25} />,
  },
  {
    key: "contacts",
    label: "Contacts",
    icon: <Contact2 size={25} />,
  },
];
