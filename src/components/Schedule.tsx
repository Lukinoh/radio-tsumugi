import React from 'react';
import {Table, Typography} from 'antd';
import {ISchedule} from '../services/schedule/parsing/ISchedule';

type ScheduleProps = {
  schedule: ISchedule | undefined
}

function Schedule(props: ScheduleProps) {
  const { Column } = Table;
  const { Title } = Typography;

  let table: any = [];

  if (props.schedule) {
    table = [
      {
        key: 1,
        label: 'Show',
        data: props.schedule.show.current.name
      },
      {
        key: 2,
        label: 'Song',
        data: props.schedule.song.current.name
      },
      {
        key: 3,
        label: 'Next song',
        data: props.schedule.song.next.name + ' at ' + props.schedule.song.next.startTime.format('LTS')
      },
      {
        key: 4,
        label: 'Next show',
        data: props.schedule.show.next.name + ' at ' + props.schedule.show.next.startTime.format('LTS')
      }
    ];
  }

  return (
    <React.Fragment>
      <Title level={2}>Program</Title>

      <Table loading={!props.schedule} dataSource={table} rowKey="key" showHeader={false} pagination={false}>
        <Column className="nowrap" title="Name" dataIndex="label" key="key" />
        <Column title="Name" dataIndex="data" key="key" />
      </Table>
    </React.Fragment>
  );
}

export default Schedule;
