import React from 'react';
import {Col, Row} from 'antd';

function FooterInfo() {
  return (
    <Row justify="center">
      <Col flex="900px">
        <div>
          Radio: <a target="_blank" rel="noreferrer" href="https://tsumugi.forum-thalie.fr">https://tsumugi.forum-thalie.fr</a>
        </div>
        <div>
          Communauté: <a target="_blank" rel="noreferrer" href="https://forum-thalie.fr/">https://forum-thalie.fr/</a>
        </div>
        <div>
          Discord: <a target="_blank" rel="noreferrer" href="https://forum-thalie.fr/discord/">https://forum-thalie.fr/discord</a>
        </div>
      </Col>
    </Row>
  )
}

export default FooterInfo;
