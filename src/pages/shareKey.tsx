import styles from './common.less';
import { Divider, Button, Space, Input } from 'antd';

const { TextArea } = Input;

export default function shareKey() {
  return (
    <div className={styles.title}>
      <Divider orientation="left">分发密钥</Divider>

      <p>目标设备IP(一个IP一行)</p>
      <TextArea placeholder="IPs" autoSize />
      <div style={{ margin: '24px 0' }} />

      <p>id_rsa.pub绝对路径</p>
      <Input placeholder="/root/,ssh/id_rsa.pub" />
      <div style={{ margin: '24px 0' }} />

      <p>用户名</p>
      <Input placeholder="user" />
      <div style={{ margin: '24px 0' }} />

      <p>密码</p>
      <Input placeholder="password" />
      <div style={{ margin: '24px 0' }} />

      <Space>
        <Button type="primary">下发密钥</Button>
        <Button type="primary">测试连接</Button>
      </Space>

      <div style={{ margin: '24px 0' }} />

    </div>
  );
};
