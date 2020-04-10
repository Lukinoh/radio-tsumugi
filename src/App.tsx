import React from 'react';
import './App.css';
import {Layout} from 'antd';
import RadioTsumugi from './radio-tsumugi/RadioTsumugi';
import RadioInfo from './components/FooterInfo';

function App() {
  const {Content, Footer} = Layout;

  return (
    <Layout className="App-layout">
      <Content>
        <RadioTsumugi/>
      </Content>
      <Footer>
        <RadioInfo/>
      </Footer>
    </Layout>
  );
}

export default App;
