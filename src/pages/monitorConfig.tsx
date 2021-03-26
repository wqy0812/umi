import styles from './common.less';
import { Button, Divider, Select, Input } from 'antd';
import React from 'react';
import { useModel } from 'umi';

const { Option } = Select;

interface clusterNodeJson {
  Clusters: string;
  myNumber: number;
}

async function fetchClusterNodeJson() {
  const response = await fetch('/getNodeInCluster');
  // .then(data => data.json())
  // .catch(e => console.log("Oops, error", e));
  return response.json();
}

class ClusterSelect extends React.Component {
  constructor(props) {
    super(props);
    fetchClusterNodeJson().then(this.setState({ date: new Date() }));
    // this.state = {date: new Date()};
  }
  render() {
    return <h1>Hello,{this.state.date.toLocaleTimeString()}</h1>;
  }
}

export default () => {
  // const { initialState } = useModel('@@initialState');
  // console.log({initialState});

  return (
    <div className={styles.title}>
      <Divider orientation="left">Prometheus配置下发</Divider>

      <p>拉取数据间隔(分钟)</p>
      <Input placeholder="2" />
      <div style={{ margin: '24px 0' }} />

      <Button type="primary">更新Prometheus.yml</Button>
      <div style={{ margin: '24px 0' }} />

      <Divider orientation="left">FSS_Exporter配置下发</Divider>
      <ClusterSelect />
      <p>集群名称</p>

      <div style={{ margin: '24px 0' }} />

      <p>查询间隔(分钟)</p>
      <Input placeholder="10" />
      <div style={{ margin: '24px 0' }} />

      <Button type="primary">更新FSS_Exporter.service</Button>
      <div style={{ margin: '24px 0' }} />
    </div>
  );
};
