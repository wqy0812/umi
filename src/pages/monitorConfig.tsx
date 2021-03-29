import styles from './common.less';
import { Button, Divider, Select, Modal, Input, InputNumber } from 'antd';
import React from 'react';
import request from 'umi-request';

const { Option } = Select;

//集群下拉框
class ClusterSelect extends React.Component<{
  clusterList?: string[];
}> {
  constructor(props) {
    super(props);
    this.state = {
      clusterList: [],

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

  handleCurrencyChange = currency => {
    if (!('value' in this.props)) {
      this.setState({ currency });
    }
    this.triggerChange({ currency });
  };

  triggerChange = changedValue => {
    // Should provide an event to pass value to Form.
    const { onChange } = this.props;
    if (onChange) {
      onChange({
        ...this.state,
        ...changedValue,
      });
    }
  };

  render() {
    return (
      <div>
        <Select defaultValue="集群名称" style={{ width: 150 }} onChange={this.handleCurrencyChange}>
          {(this.state['clusterList'] || []).map((item) => {
            return (
              <Option key={item} value={item}>
                {item}
              </Option>
            )})}
        </Select>
      </div>
    );
  }
}

export default class MonitorConfigPage extends React.Component{
  // const { initialState } = useModel('@@initialState');
  // console.log({initialState});
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      fssExporterInterval: 0,
      selectedCluster: "1",
    };
  }

  showModal = () => {
    //todo:get cluster and inter val
    request
      .get('/updateFssExporterConfig?clusterName=' + 'wqy' + '&fssExporterInterval=' + '2')
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    this.setState({
      isModalVisible: true,
    })
  }

  handleOk = () => {
    this.setState({
      isModalVisible: false,
    })
  }

  handleCancel = () => {
    this.setState({
      isModalVisible: false,
    })
  }

  onInterValChange = (value) => {
    this.setState({
      fssExporterInterval: value,
    })
  }

  onClusterChange = (value) => {
    this.setState({
      selectedCluster: value
    });
  };

  render() {
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
        <ClusterSelect onChange={this.onClusterChange} />
        <div style={{ margin: '24px 0' }} />

        <p>查询间隔(分钟)</p>
        <InputNumber
          min={2}
          max={60}
          defaultValue={10}
          onChange={this.onInterValChange}
        />
        <div style={{ margin: '24px 0' }} />

        <Button type="primary" onClick={this.showModal}>
          更新FSS_Exporter.service
        </Button>
        <div style={{ margin: '24px 0' }} />

        <Modal title="result" visible={this.state["isModalVisible"]} onOk={this.handleOk} onCancel={this.handleCancel}>
          <p>Some contents...</p>
        </Modal>
      </div>
    )
  }
}
