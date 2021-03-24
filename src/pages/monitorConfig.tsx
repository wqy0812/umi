import styles from './common.less';
import { Button, Divider, Input } from "antd";

const { TextArea } = Input;

export default function IndexPage() {
  return (
    <div className={styles.title}>
      <Divider orientation="left">Prometheus配置下发</Divider>

      <p>拉取数据间隔(分钟)</p>
      <Input placeholder="2" />
      <div style={{ margin: '24px 0' }} />

      <Button type="primary">更新Prometheus.yml</Button>
      <div style={{ margin: '24px 0' }} />

      <Divider orientation="left">FSS_Exporter配置下发</Divider>

      <p>集群名称</p>
      <Input placeholder="clusterName" />
      <div style={{ margin: '24px 0' }} />

      <p>查询间隔(分钟)</p>
      <Input placeholder="10" />
      <div style={{ margin: '24px 0' }} />

      <Button type="primary">更新FSS_Exporter.service</Button>
      <div style={{ margin: '24px 0' }} />
    </div>
  );
}

