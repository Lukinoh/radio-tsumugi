import React, { Fragment } from 'react';
import {Table, Typography} from 'antd';
import {ISchedule} from '../../services/schedule/parsing/ISchedule';
import {getProgramTableRows, IProgramTableRow} from './ProgramTableRows';

type ScheduleProps = {
  schedule: ISchedule | undefined
}

function Program(props: ScheduleProps) {
  const { Column } = Table;
  const { Title } = Typography;
  const rows = props.schedule ? getProgramTableRows(props.schedule) : [];

  const LabelColumnRender = (value: string, row: IProgramTableRow) => row.renderLabel(row);
  const LabelColumn = (
    <Column className="nowrap"
            key="key"
            render={LabelColumnRender}/>
  );

  const EventColumnRender = (value: string, row: IProgramTableRow) => row.renderEvent(row);
  const EventColumn = (
    <Column className="nowrap"
            key="key"
            render={EventColumnRender}
    />
  );

  return (
    <Fragment>
      <Title level={2}>
        Program
      </Title>

      <Table loading={!props.schedule}
             dataSource={rows}
             rowKey="key"
             showHeader={false}
             pagination={false}>
        {LabelColumn}
        {EventColumn}
      </Table>
    </Fragment>
  );
}

export default Program;
