import styles from './common.less';
import { Button, Divider, Select, Input } from 'antd';
import React from 'react';
import request from 'umi-request';
import { useModel } from 'umi';

const { Option } = Select;

class Clusters {
  NodeIps: string[];
  ClusterName: string;
}

class ClusterJsons {
  Clusters: Clusters[];
}

class ClusterSelect extends React.Component<{ clusterNames?: string[] }> {
  constructor(props) {
    super(props);
    this.state = {
      clusterNames: [],
    };
  }

  componentDidMount() {
    request
      .get('/getNodeInCluster')
      .then((response) => {
        let cs: string[] = [];
        for (const [index, element] of response.Clusters.entries()) {
          cs.push(element.ClusterName);
        }
        this.setState({
          clusterNames: cs,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <Select defaultValue="clusterName" style={{ width: 150 }}>
          {(this.state['clusterNames'] || []).map((item, i) => {
            return (
              <Option key={i + ''} value={item}>
                {item}
              </Option>
            );
          })}
        </Select>
      </div>
    );
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
      <p>集群名称</p>
      <ClusterSelect />
      <div style={{ margin: '24px 0' }} />

      <p>查询间隔(分钟)</p>
      <Input placeholder="10" />
      <div style={{ margin: '24px 0' }} />

      <Button type="primary">更新FSS_Exporter.service</Button>
      <div style={{ margin: '24px 0' }} />
    </div>
  );
};
