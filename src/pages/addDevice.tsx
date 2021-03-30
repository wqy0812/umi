import styles from './common.less';
import { Button, Divider, Input } from "antd";

const { TextArea } = Input;

export default function AddDevicePage() {
  return (
    <div className={styles.title}>
      <Divider orientation="left">新增节点</Divider>
      <pre>建立磁盘VG</pre>
      <div style={{ margin: '24px 0' }} />

      <h3>目标节点IP(一个IP一行)</h3>
      <TextArea placeholder="IPs" autoSize />
      <div style={{ margin: '24px 0' }} />

      <h3>磁盘盘符(一个盘符一行)</h3>
      <TextArea placeholder="sda" autoSize />
      <div style={{ margin: '24px 0' }} />

      <Button type="primary">建立VG</Button>
      <div style={{ margin: '24px 0' }} />
    </div>
  );
}
