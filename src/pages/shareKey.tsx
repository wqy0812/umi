import styles from './common.less';
import { Divider, Button, Space, Input, Modal } from "antd";
import request from "umi-request";
import React from "react";

const { TextArea } = Input;

export default class ShareKeyPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isModalVisible: false,
      result: "init"
    }
  }

  onChangeIPs = (e) => {this.setState({IPs:e.target.value})}
  onChangePubKeyPath = (e) => {this.setState({pubKeyPath:e.target.value})}
  onChangeHomePath = (e) => {this.setState({homePath:e.target.value})}
  onChangePassUser = (e) => {this.setState({passUser:e.target.value})}
  onChangePassWord = (e) => {this.setState({passWord:e.target.value})}

  shareKey = () => {
    request
      .get('/shareKey', {
        params: {
          IPs: this.state["IPs"],
          pubKeyPath: this.state["pubKeyPath"],
          homePath: this.state["homePath"],
          passUser: this.state["passUser"],
          passWord: this.state["passWord"],
        }})
      .then((response) => {
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

  testconn = () => {
    this.setState({
      isModalVisible: true,
    })
  }

  render() {
    return (
      <div className={styles.title}>
        <Divider orientation="left">分发密钥</Divider>

        <p>目标设备IP(一个IP一行)</p>
        <TextArea placeholder="IPs" autoSize onChange={this.onChangeIPs.bind(this)} />
        <div style={{ margin: '24px 0' }} />

        <p>id_rsa.pub绝对路径</p>
        <Input placeholder="/root/.ssh/id_rsa.pub" onChange={this.onChangePubKeyPath.bind(this)} />
        <div style={{ margin: '24px 0' }} />

        <p>目标用户目录</p>
        <Input placeholder="/root" onChange={this.onChangeHomePath.bind(this)} />
        <div style={{ margin: '24px 0' }} />

        <p>执行用户</p>
        <Input placeholder="passuser" onChange={this.onChangePassUser.bind(this)} />
        <div style={{ margin: '24px 0' }} />

        <p>执行用户密码</p>
        <Input placeholder="password" onChange={this.onChangePassWord.bind(this)} />
        <div style={{ margin: '24px 0' }} />

        <Space>
          <Button type="primary" onClick={this.shareKey}>下发密钥</Button>
          <Button type="primary" onClick={this.testconn}>测试连接</Button>
        </Space>
        <div style={{ margin: '24px 0' }} />

        <Modal title="result" visible={this.state["isModalVisible"]} onOk={this.handleOk} onCancel={this.handleOk}>
          <p>{this.state["result"]}</p>
        </Modal>
      </div>
    )
  }
}
