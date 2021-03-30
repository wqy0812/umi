import styles from './common.less';
import { Button, Divider, Select, Modal, Input, InputNumber } from 'antd';
import React from 'react';
import request from 'umi-request';
import { useModel } from 'umi';

const { Option } = Select;

export default class MonitorConfigPage extends React.Component  // <{clusterList?: string[]}>
{
  constructor(props) {
    // const { initialState } = useModel('@@initialState');
    // console.log({initialState});
    super(props)
    this.state = {
      clusterList: [],
      fssExporterInterval: 0,
      selectedCluster: "",
      isModalVisible: false,
      result: "init"
    }
  }

  componentDidMount() {
    request
      .get('/getNodeInCluster')
      .then((response) => {
        let tmp: string[] = []
        for (const [, element] of response.Clusters.entries()) {
          tmp.push(element.ClusterName)
        }
        this.setState({
          clusterList: tmp,
        })
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  showModal = () => {
    request
      .get('/updateFssExporterConfig?clusterName=' + this.state["selectedCluster"] + '&fssExporterInterval=' + this.state["fssExporterInterval"])
      .then((response) => {
        console.log(response.success)
        if (response.success){
          this.setState({result: "success"})
        } else {
          this.setState({result: "failed"})
        }
      })
      .catch(function (error) {
        console.log(error)
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

  onInterValChange = (v) => {
    this.setState({
      fssExporterInterval: v,
    })
  }

  onClusterChange = (v) => {
    this.setState({
      selectedCluster: v
    })
  }

  render() {
    return (
      <div className={styles.title}>
        <Divider orientation="left">Prometheus配置下发</Divider>

        <h3>拉取数据间隔(分钟)</h3>
        <InputNumber
          min={1}
          defaultValue={2}
          onChange={this.onInterValChange}
        />
        <div style={{ margin: '24px 0' }} />

        <Button type="primary">更新Prometheus.yml</Button>
        <div style={{ margin: '24px 0' }} />

        <Divider orientation="left">FSS_Exporter配置下发</Divider>
        <h3>选择集群</h3>
        <div>
          <Select defaultValue="集群名称" style={{ width: 150 }} onChange={this.onClusterChange}>
            {(this.state['clusterList'] || []).map((item) => {
              return (
                <Option key={item} value={item}>
                  {item}
                </Option>
              )})}
          </Select>
        </div>
        <div style={{ margin: '24px 0' }} />

        <h3>查询间隔(分钟)</h3>
        <InputNumber
          min={2}
          defaultValue={10}
          onChange={this.onInterValChange}
        />
        <div style={{ margin: '24px 0' }} />

        <Button type="primary" onClick={this.showModal}>
          更新FSS_Exporter.service
        </Button>
        <div style={{ margin: '24px 0' }} />

        <Modal title="result" visible={this.state["isModalVisible"]} onOk={this.handleOk} onCancel={this.handleCancel}>
          <p>{this.state["result"]}</p>
        </Modal>
      </div>
    )
  }
}
