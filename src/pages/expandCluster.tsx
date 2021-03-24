import styles from './common.less';
import { Button, Divider, Input } from "antd";

const { TextArea } = Input;

export default function IndexPage() {
  return (
    <div className={styles.title}>
      <Divider orientation="left">扩容节点</Divider>

      <p>集群名称</p>
      <Input placeholder="clusterName" />
      <div style={{ margin: '24px 0' }} />

      <p>一个园区：扩容节点IP(一个IP一行)</p>
      <TextArea placeholder="IPs" autoSize />
      <div style={{ margin: '24px 0' }} />

      <p>另一个园区：扩容节点IP(一个IP一行)</p>
      <TextArea placeholder="IPs" autoSize />
      <div style={{ margin: '24px 0' }} />

      <Button type="primary">修改集群拓扑</Button>
      <div style={{ margin: '24px 0' }} />
    </div>
  );
}

