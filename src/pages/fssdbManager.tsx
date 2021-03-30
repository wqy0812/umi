import styles from './common.less';
import { Button, Divider, Input } from "antd";

const { TextArea } = Input;

export default function FssdbManagerPage() {
  return (
    <div className={styles.title}>
      <Divider orientation="left">FSS_Server.db管理</Divider>
      <h3>重新构建数据库</h3>
      <Button type="primary">buildFssDB</Button>
      <div style={{ margin: '24px 0' }} />

      <Divider orientation="left">topology.csv管理</Divider>
      <h3>下载topology.csv</h3>
      <Button type="primary">download</Button>
      <div style={{ margin: '24px 0' }} />

    </div>
  );
}

