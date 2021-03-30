import styles from './common.less';
import { Button, Divider, Input } from "antd";

const { TextArea } = Input;

export default function ExpandClusterPage() {
  return (
    <div className={styles.title}>
      <Divider orientation="left">扩容节点</Divider>
      <pre>安装glusterfs</pre>
      <pre>安装node_exporter</pre>
      <pre>安装FSS_Exporter</pre>
      <pre>修改集群在topology.csv</pre>
      <div style={{ margin: '24px 0' }} />

      <h3>集群名称</h3>
      <Input placeholder="clusterName" />
      <div style={{ margin: '24px 0' }} />

      <h3>一个园区：扩容节点IP(一个IP一行)</h3>
      <TextArea placeholder="IPs" autoSize />
      <div style={{ margin: '24px 0' }} />

      <h3>另一个园区：扩容节点IP(一个IP一行)</h3>
      <TextArea placeholder="IPs" autoSize />
      <div style={{ margin: '24px 0' }} />

      <Button type="primary">修改集群</Button>
      <div style={{ margin: '24px 0' }} />
    </div>
  );
}

