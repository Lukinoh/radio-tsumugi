import React from 'react';
import './App.css';
import Radio from './components/Radio';
import {TsumugiService} from './services/tsumugi.service';
import {ISchedule, ISong} from './services/schedule/parsing/ISchedule';
import {UtilityService} from './services/utility.service';
import Schedule from './components/Schedule';
import PreviousSongList from './components/PreviousSongList';
import {Layout, Typography, Row, Col} from 'antd';

function App() {
  const {Title} = Typography;
  const {Content, Footer} = Layout;
  const [schedule, setSchedule] = React.useState<ISchedule>();
  const [history, setHistory] = React.useState<Array<ISong>>([]);

  React.useEffect(() => {
    TsumugiService.getSchedule().subscribe(newSchedule => {
      console.log(newSchedule);
      setSchedule(newSchedule);
    });

    TsumugiService.retrieveHistory().subscribe(newHistory => {
      console.log(newHistory);
      setHistory(newHistory);
    });
  }, []);

  React.useEffect(() => {
    if (schedule) {
      // Replace by tsumugi service
      UtilityService.distinctBy([schedule.song.previous, ...history],(schedule) => schedule.startTime.toISOString())
        .subscribe(newHistory => {
          setHistory(newHistory)
          TsumugiService.saveHistory(newHistory);
        });
    }
  },[schedule]);

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
            <Schedule schedule={schedule}/>
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
            Radio website: <a href="https://tsumugi.forum-thalie.fr">https://tsumugi.forum-thalie.fr</a>
          </Col>
        </Row>
      </Footer>
    </Layout>
    </div>
  );
}

export default App;
/*

{/!*<div className="App">*!/}
{/!*<header className="App-header">*!/}
{/!*  <Title>Tsumugi Radio</Title>*!/}
//
{/!*<div className="App-test">*!/}
{/!*  <Radio/>*!/}
{/!*  <Schedule schedule={schedule}/>*!/}
// </div>
//
{/!*<PreviousSongList history={history}/>*!/}
//
{/!*<div>*!/}
// Radio original website: <a href="https://tsumugi.forum-thalie.fr">https://tsumugi.forum-thalie.fr</a>
// </div>
{/!*</header>*!/}
// </div>*/
