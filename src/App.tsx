import React, {useEffect, useState} from 'react';
import './App.css';
import Radio from './components/Radio';
import {TsumugiService} from './services/tsumugi.service';
import {ISchedule, ISong} from './services/schedule/parsing/ISchedule';
import Program from './components/program/Program';
import PreviousSongList from './components/PreviousSongList';
import {Col, Layout, Row, Typography} from 'antd';

function App() {
  const {Title} = Typography;
  const {Content, Footer} = Layout;
  const [schedule, setSchedule] = useState<ISchedule>();
  const [history, setHistory] = useState<Array<ISong>>([]);

  useEffect(() => {
    TsumugiService.getSchedule()
      .subscribe(newSchedule => {
        console.log(newSchedule);
        setSchedule(newSchedule);
      });

    TsumugiService.retrieveHistory()
      .subscribe(newHistory => {
        console.log(newHistory);
        setHistory(newHistory);
      }, error => {
        alert('RESTART THE PAGE');
      });
  }, []);

  useEffect(() => {
    if (schedule) {
      TsumugiService.saveHistory(schedule, history)
        .subscribe(newHistory => {
          console.log(newHistory);
          setHistory(newHistory);
        });
    }
  }, [schedule]);

  return (
    <div className="App">
      <Layout style={{padding: 16}}>
        <Content>
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
        </Content>
        <Footer>
          <Row justify="center">
            <Col flex="900px">
              <div>
                Radio: <a href="https://tsumugi.forum-thalie.fr">https://tsumugi.forum-thalie.fr</a>
              </div>
              <div>
                Communauté: <a href="https://forum-thalie.fr/">https://forum-thalie.fr/</a>
              </div>
            </Col>
          </Row>
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
