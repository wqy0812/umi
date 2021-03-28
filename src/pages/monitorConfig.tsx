import styles from './common.less';
import { Button, Divider, Select, Modal, Input, InputNumber } from 'antd';
import React, { useState } from 'react';
import request from 'umi-request';
// import { useModel } from 'umi';

const { Option } = Select;

//JSON数据结构
// class Clusters {
//   NodeIps: string[];
//   ClusterName: string;
// }
//
// class ClusterJsons {
//   Clusters: Clusters[];
// }

//集群下拉框
class ClusterSelect extends React.Component<{
  clusterList?: string[];
  selectedCluster?: string;
}> {
  constructor(props) {
    super(props);
    this.state = {
      clusterList: [],
      selectedCluster: '',
    };
  }

  componentDidMount() {
    request
      .get('/getNodeInCluster')
      .then((response) => {
        let tmp: string[] = [];
        for (const [, element] of response.Clusters.entries()) {
          tmp.push(element.ClusterName);
        }
        this.setState({
          clusterList: tmp,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onChange(value) {
    // this.setState({
    //   selectedCluster: value
    // });
    this.props.onChange('dateCommenced', dateValue);
  }

  render() {
    return (
      <div>
        <Select
          defaultValue="集群名称"
          style={{ width: 150 }}
          onChange={this.onChange.bind(this)}
        >
          {(this.state['clusterList'] || []).map((item) => {
            return (
              <Option key={item} value={item}>
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

  function onInterValChange(value) {
    this.setState({
      interVal: value,
    });
  }

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    request
      .get('/updateFssExporterConfig?clusterName=' + 'wqy' + '&interval=' + '2')
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className={styles.title}>
      <Divider orientation="left">Prometheus配置下发</Divider>

      <p>拉取数据间隔(分钟)</p>
      <Input placeholder="2" />
      <div style={{ margin: '24px 0' }} />

      <Button type="primary">更新Prometheus.yml</Button>
      <div style={{ margin: '24px 0' }} />

      <Divider orientation="left">FSS_Exporter配置下发</Divider>
      <p>选择集群</p>
      <ClusterSelect onChange={} />
      <div style={{ margin: '24px 0' }} />

      <p>查询间隔(分钟)</p>
      <InputNumber
        min={2}
        max={60}
        defaultValue={10}
        onChange={onInterValChange}
      />
      <div style={{ margin: '24px 0' }} />

      <Button type="primary" onClick={showModal}>
        更新FSS_Exporter.service
      </Button>
      <div style={{ margin: '24px 0' }} />

      <Modal
        title="result Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
      </Modal>
    </div>
  );
};
