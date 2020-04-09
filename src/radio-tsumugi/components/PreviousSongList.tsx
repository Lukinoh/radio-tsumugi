import React, {Fragment, useEffect, useState} from 'react';
import {Input, Table, Tooltip, Typography} from 'antd';
import {ISong} from '../services/schedule/ISchedule';
import {filterBy} from '../../services/ObservableService';
import {searchSubstr} from '../../services/UtilityService';

type PreviousSongListProps = {
  history: Array<ISong>;
}

function PreviousSongList(props: PreviousSongListProps) {
  const [history, setHistory] = useState<Array<ISong>>(props.history);
  const { Column } = Table;
  const { Title } = Typography;
  const { Search } = Input;

  useEffect(() => {
    setHistory(props.history);
  }, [props.history]);

  const setFilteredHistory = (search: string): void => {
    filterBy(props.history, song => searchSubstr(song.name, search))
      .subscribe(newHistory => setHistory(newHistory));
  };

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
    <Fragment>
      <Title level={2}>Previously</Title>

      <Search allowClear
              className="Previously-search"
              placeholder="Search song in history"
              onChange={value => setFilteredHistory(value.target.value)}
      />

      <Table dataSource={history}
             rowKey="startTime"
             showHeader={false}>
        {TimeColumn}
        {SongColumn}
      </Table>
    </Fragment>
  );
}

export default PreviousSongList;
