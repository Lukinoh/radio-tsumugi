import React, {Fragment, useEffect, useState} from 'react';
import './App.css';
import {Layout} from 'antd';
import RadioTsumugi from './radio-tsumugi/RadioTsumugi';
import RadioInfo from './components/FooterInfo';
import {AppConfigService} from './services/AppConfigService';
import ConfigMissing from './components/ConfigMissing';

function App() {
  const [App, setApp] = useState<JSX.Element>();

  // If we had several page the "redirection" should be handled with a router
  // but it was too much for this small app
  // Put destructuring of Layout, renderApp, renderError inside the effect to remove
  // "React Hook useEffect has a missing dependency" error
  useEffect(() => {
    const {Content, Footer} = Layout;

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
        <ConfigMissing message={message}/>
    );

    AppConfigService.fetch()
        .subscribe({
          next: () => setApp(renderApp()),
          error: (error: Error) => setApp(renderError(error.message))
        });
  }, [])

  return (
    <Fragment>
      {App}
    </Fragment>
  );
}

export default App;
