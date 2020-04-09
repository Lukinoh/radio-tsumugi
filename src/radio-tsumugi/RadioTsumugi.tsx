import React, {Fragment, useEffect, useState} from 'react';
import {Col, Row, Typography} from 'antd';
import Radio from './components/Radio';
import Program from './components/program/Program';
import PreviousSongList from './components/PreviousSongList';
import {ISchedule, ISong} from './services/schedule/ISchedule';
import {RadioTsumugiService} from './services/RadioTsumugiService';

function RadioTsumugi() {
  const [schedule, setSchedule] = useState<ISchedule>();
  const [history, setHistory] = useState<Array<ISong>>([]);
  const {Title} = Typography;

  useEffect(() => {
    RadioTsumugiService.getSchedule()
      .subscribe(newSchedule => {
        console.log(newSchedule);
        setSchedule(newSchedule);
      });

    RadioTsumugiService.retrieveHistory()
      .subscribe(newHistory => {
        console.log(newHistory);
        setHistory(newHistory);
      });
  }, []);

  useEffect(() => {
    if (schedule) {
      RadioTsumugiService.saveHistory(schedule, history)
        .subscribe(newHistory => {
          console.log(newHistory);
          setHistory(newHistory);
        });
    }
  }, [schedule]);

  return (
    <Fragment>
      <Row justify="center">
        <Title>Radio Tsumugi</Title>
      </Row>
      <Row justify="center" gutter={16}>
        <Col flex="400px">
          <Radio/>
        </Col>
        <Col flex="500px">
          <Program schedule={schedule}/>
        </Col>
      </Row>
      <Row justify="center">
        <Col flex="900px">
          <PreviousSongList history={history}/>
        </Col>
      </Row>
    </Fragment>
  )
}

export default RadioTsumugi;