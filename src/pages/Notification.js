import React, { useEffect } from "react";
import { SmileOutlined } from "@ant-design/icons";
import { notification, Button } from "antd";

const App = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api.open({
      message: "Notification Title",
      description: "This is the content of the notification.",
      icon: (
        <SmileOutlined
          style={{
            color: "#108ee9",
          }}
        />
      ),
    });
  };

  useEffect(() => {
    openNotification(); // 在组件挂载后自动弹出通知
  }, []); // 空数组表示只在组件挂载后执行一次

  return (
    <>
      {contextHolder}
      <Button type="primary" onClick={openNotification}>
        Open the notification box
      </Button>
    </>
  );
};

export default App;
