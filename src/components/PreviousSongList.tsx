import React from 'react';
import {Table, Tooltip, Typography} from 'antd';
import {ISong} from '../services/schedule/parsing/ISchedule';

type PreviousSongListProps = {
  history: Array<ISong>;
}

function PreviousSongList(props: PreviousSongListProps) {
  const { Column } = Table;
  const { Title } = Typography;

  return (
    <React.Fragment>
      <Title level={2}>Previously</Title>

      <Table dataSource={props.history} rowKey="startTime" showHeader={false}>
        <Column className="nowrap" title="Time" dataIndex="name" key="startTime" render={(text: string, record: ISong) => {
          // Add tooltip
          return (
            <Tooltip title={record.startTime.format('LTS')}>
              <span>{record.startTime.fromNow()}</span>
            </Tooltip>
          )
        }} />
        <Column title="Name" dataIndex="name" key="startTime" />
        }} />
      </Table>
    </React.Fragment>
  );
}

export default PreviousSongList;
