import React from 'react';
import {Table, Tooltip, Typography} from 'antd';
import {ISong} from '../services/schedule/parsing/ISchedule';

type PreviousSongListProps = {
  history: Array<ISong>;
}

function PreviousSongList(props: PreviousSongListProps) {
  const { Column } = Table;
  const { Title } = Typography;

  const TimeColumnRender = (text: string, song: ISong) => (
    <Tooltip title={song.startTime.format('LTS')}>
      <span>{song.startTime.fromNow()}</span>
    </Tooltip>
  );

  const TimeColumn = (
    <Column className="nowrap"
            title="Time"
            dataIndex="name"
            key="startTime"
            render={TimeColumnRender}
    />
  );

  const SongColumn = (
    <Column title="Name"
            dataIndex="name"
            key="startTime"
    />
  );

  return (
    <React.Fragment>
      <Title level={2}>Previously</Title>

      <Table dataSource={props.history}
             rowKey="startTime"
             showHeader={false}>
        {TimeColumn}
        {SongColumn}
      </Table>
    </React.Fragment>
  );
}

export default PreviousSongList;
