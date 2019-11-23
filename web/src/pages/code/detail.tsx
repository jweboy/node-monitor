import React, { FC, useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { CodeDto, CodeParams } from 'src/types/code';
import { getCodeDetail } from '../../api/code';
import { useParams } from 'react-router';
import CodeEditor from '../../components/code-editor';
import styles from './index.less';

const initialData: CodeDto = {
  id: '',
  message: '',
  create_time: '',
  source: '',
  url: '',
  lineNo: 0,
  columnNo: 0,
  sourceContent: '',
};

const CodeDetail: FC = () => {
  const [data, setData] = useState(initialData);
  const params = useParams<CodeParams>();

  useEffect(() => {
    getCodeDetail(params.id)
      .then(({ data }) => {
        setData(data);
      });
  }, []);

  return (
    <div className={styles.codeDetail}>
      <ul>
        <li>
          <h2 className={styles.title}>错误信息</h2>
          <div className={styles.info}>
            <Row className={styles.row}>
              {data.message}
            </Row>
          </div>
        </li>
        <li>
          <h2 className={styles.title}>错误位置</h2>
          <div className={styles.info}>
            <Row className={styles.row}>
              <Col span={2}>
                <span>行号：</span>
                <span className={styles.blodNumber}>{data.lineNo}</span>
              </Col>
              <Col span={2}>
                <span>列号：</span>
                <span className={styles.blodNumber}>{data.columnNo}</span>
              </Col>
            </Row>
          </div>
        </li>
        <li>
          <h2 className={styles.title}>源文件</h2>
          <div className={styles.info}>
            <Row className={styles.row}>
              {data.source}
            </Row>
          </div>
        </li>
        <li>
          <h2 className={styles.title}>源代码</h2>
          <div className={styles.info}>
            <Row className={styles.row}>
              <CodeEditor data={data.sourceContent} height={'calc(100vh - 144px)'}/>
            </Row>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default CodeDetail;
