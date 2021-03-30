import styles from './common.less';
import { Button, Divider, Input } from "antd";

const { TextArea } = Input;

export default function fssdbManager() {
  return (
    <div className={styles.title}>
      <Divider orientation="left">新增节点</Divider>
      <pre>安装glusterfs</pre>
      <pre>安装node_exporter并启动</pre>
      <pre>安装FSS_Exporter但不启动</pre>
      <pre>新增集群到topology.csv</pre>
      <div style={{ margin: '24px 0' }} />

      <h3>集群名称</h3>
      <Input placeholder="clusterName" />
      <div style={{ margin: '24px 0' }} />

      <h3>一个园区：新增节点IP(一个IP一行)</h3>
      <TextArea placeholder="IPs" autoSize />
      <div style={{ margin: '24px 0' }} />

      <h3>另一个园区：新增节点IP(一个IP一行)</h3>
      <TextArea placeholder="IPs" autoSize />
      <div style={{ margin: '24px 0' }} />

      <Button type="primary">建立集群</Button>
      <div style={{ margin: '24px 0' }} />
    </div>
  );
}

