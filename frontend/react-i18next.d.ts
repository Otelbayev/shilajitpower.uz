import "react-i18next";
import commonUz from "../public/locales/uz/common.json";

declare module "react-i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: {
      common: typeof commonUz;
    };
  }
}
