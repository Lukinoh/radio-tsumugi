import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {Col, Row, Typography} from 'antd';
import Radio from './components/radio/Radio';
import Program from './components/program/Program';
import PreviousSongList from './components/PreviousSongList';
import {ISchedule, ISong} from './services/schedule-parser/ISchedule';
import {RadioTsumugiService} from './services/RadioTsumugiService';

function RadioTsumugi() {
  const [schedule, setSchedule] = useState<ISchedule>();
  const [history, setHistory] = useState<Array<ISong>>([]);
  const {Title} = Typography;

  useEffect(() => {
    // Order here by be important
    // retrieveHistory is a synchronous observable, where as getSchedule is not
    // So if we put retrieve history after the getSchedule it could erase the history

    RadioTsumugiService.retrieveHistory()
      .subscribe(newHistory => {
        // console.log(newHistory);
        setHistory(newHistory);
      });

    RadioTsumugiService.getSchedule()
      .subscribe(newSchedule => {
        // console.log(newSchedule);
        setSchedule(newSchedule);
      });
  }, []);

  useCallback(() => {
    if (schedule) {
      RadioTsumugiService.saveHistory(schedule, history)
        .subscribe(newHistory => {
          // console.log(newHistory);
          setHistory(newHistory);
        });
    }
  }, [schedule, history]);

  return (
    <Fragment>
      <Row justify="center">
        <Title level={2}>Radio Tsumugi</Title>
      </Row>
      <Row justify="center" gutter={[8, 8]}>
        <Col flex="400px" className="RadioTsumugi-player-width-management">
          <Radio />
        </Col>
        <Col flex="500px">
          <Program schedule={schedule} />
        </Col>
      </Row>
      <Row justify="center" gutter={8}>
        <Col flex="900px">
          <PreviousSongList history={history} />
        </Col>
      </Row>
    </Fragment>
  )
}

export default RadioTsumugi;
