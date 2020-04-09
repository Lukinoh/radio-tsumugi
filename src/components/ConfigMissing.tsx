import React from 'react';
import {Result} from 'antd';

interface ConfigMissingProps {
  message: string;
}

function ConfigMissing(props: ConfigMissingProps) {

  return (
    <Result
      status="error"
      title={props.message}
      subTitle="Please contact the administrator."
    />
  )
}

export default ConfigMissing