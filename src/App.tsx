import React, {useEffect, useState, Fragment} from 'react';
import './App.css';
import {Layout} from 'antd';
import RadioTsumugi from './radio-tsumugi/RadioTsumugi';
import RadioInfo from './components/FooterInfo';
import {AppConfigService} from './services/AppConfigService';
import ConfigMissing from './components/ConfigMissing';

function App() {
  const [App, setApp] = useState<JSX.Element>();
  const {Content, Footer} = Layout;

  // If we had several page the "redirection" should be handled with a router
  // but it was too much for this small app

  useEffect(() => {
    AppConfigService.fetch()
      .subscribe(
        () =>  setApp(renderApp()),
        (message) => setApp(renderError(message))
      );
  }, [])

  const renderApp = () => (
    <Layout className="App-layout">
      <Content>
        <RadioTsumugi/>
      </Content>
      <Footer>
        <RadioInfo/>
      </Footer>
    </Layout>
  );

  const renderError = (message: string) => (
    <ConfigMissing message={message} />
  );

  return (
    <Fragment>
      {App}
    </Fragment>
  );
}

export default App;
