import React from 'react';
import {Table, Typography} from 'antd';
import {ISchedule} from '../../services/schedule/parsing/ISchedule';
import {getProgramTableData} from './ProgramService';

type ScheduleProps = {
  schedule: ISchedule | undefined
}

function Program(props: ScheduleProps) {
  const { Column } = Table;
  const { Title } = Typography;
  const table = props.schedule ? getProgramTableData(props.schedule) : [];

  const LabelColumn = (
    <Column className="nowrap"
            title="Name"
            dataIndex="label"
            key="key" />
  );

  const DataColumn = (
    <Column title="Name"
            dataIndex="data"
            key="key" />
  );

  return (
    <React.Fragment>
      <Title level={2}>
        Program
      </Title>

      <Table loading={!props.schedule}
             dataSource={table}
             rowKey="key"
             showHeader={false}
             pagination={false}>
        {LabelColumn}
        {DataColumn}
      </Table>
    </React.Fragment>
  );
}

export default Program;
