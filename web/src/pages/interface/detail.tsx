import React, { FC, useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { InterfaceDetailState, InterfaceDetailProps } from 'src/types/interface';
import { getInterfaceDetail } from '../../api/interface';
import styles from './index.less';
import CodeEditor from '../../components/code-editor';

const initialData: InterfaceDetailState = {
  req_time: 0,
  code: 0,
  method: '',
  url: '',
  status: '',
  create_time: '',
  user_agent: '',
  params: '',
  err_msg: '',
};

const initialIsSucceed: boolean = false;

const InterfaceDetail: FC<InterfaceDetailProps> = (props) => {
  const [data, setData] = useState(initialData);
  const [isSucceed, setIsSucceed] = useState(initialIsSucceed);

  useEffect(() => {
    const { params } = props.match;

    getInterfaceDetail(params.id).then(({ data }) => {
      setIsSucceed(data.status === 'succeed');
      setData({ ...data, params: data.params });
    });
  }, []);

  return (
    <div className={styles.interfaceDetail}>
      <div>
        <h2 className={styles.title}>基本信息</h2>
        <div className={styles.info}>
          <Row className={styles.row}>
            <Col span={2}>当前状态：</Col>
            <Col span={9}>
              <span className={data.status}>{data.status}</span>
            </Col>

            <Col span={2}>状态码：</Col>
            <Col span={9}>
              <span>{data.code}</span>
            </Col>
          </Row>

          <Row className={styles.row}>
            <Col span={2}>请求方法：</Col>
            <Col span={9}>
              <span>{(data.method || '').toUpperCase()}</span>
            </Col>
            <Col span={2}>请求路径：</Col>
            <Col span={9}>
              <span>{data.url}</span>
            </Col>

          </Row>
          <Row className={styles.row}>
            <Col span={2}>创建时间：</Col>
            <Col span={9}>
              <span>{data.create_time}</span>
            </Col>
            <Col span={2}>请求时长：</Col>
            <Col span={9}>
              {`${data.req_time}ms`}
            </Col>
          </Row>
          <Row className={styles.row}>
            <Col span={3}>浏览器内核：</Col>
            <Col span={21}>{data.user_agent}</Col>
          </Row>
        </div>
      </div>
      {
        !isSucceed && (
          <div>
            <h2 className={styles.title}>错误信息</h2>
            <div className={styles.info}>
              <Row className={styles.row}>
                {data.err_msg}
              </Row>
            </div>
          </div>
        )
      }
      <div>
        <h2 className={styles.title}>请求参数</h2>
        <div className={styles.info}>
          <Row className={styles.row}>
            <CodeEditor data={data.params} height={500} />
          </Row>
        </div>
      </div>
    </div>
  );
};

export default InterfaceDetail;
