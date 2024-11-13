import {
  Timeline,
  TimelineEffect,
  TimelineRow,
} from '@xzdarcy/react-timeline-editor';
import React, { useEffect, useState } from 'react';

const TimelineEditor = () => {
  const mockEffect: Record<string, TimelineEffect> = {
    effect0: {
      id: 'effect0',
      name: '效果0',
    },
    effect1: {
      id: 'effect1',
      name: '效果1',
    },
  };

  const mockData: TimelineRow[] = [
    {
      id: '0',
      actions: [
        {
          id: 'action00',
          start: 0,
          end: 2,
          effectId: 'effect0',
        },
      ],
    },
    {
      id: '1',
      actions: [
        {
          id: 'action10',
          start: 1.5,
          end: 5,
          effectId: 'effect1',
        },
      ],
    },
    {
      id: '2',
      actions: [
        {
          id: 'action20',
          flexible: false,
          movable: false,
          start: 3,
          end: 4,
          effectId: 'effect0',
        },
      ],
    },
    {
      id: '3',
      actions: [
        {
          id: 'action30',
          start: 4,
          end: 4.5,
          effectId: 'effect1',
        },
        {
          id: 'action31',
          start: 6,
          end: 8,
          effectId: 'effect1',
        },
      ],
    },
  ];
  const [data, setData] = useState(mockData);
  useEffect(() => {
    console.table(data[0].actions);
  }, [data]);

  return (
    <div className="timeline-editor-example0 h-full">
      <Timeline
        onChange={setData}
        editorData={data}
        effects={mockEffect}
        hideCursor={false}
        autoScroll={true}
        style={{ width: '100%', height: '100%', overflow: 'auto' }}
      />
    </div>
  );
};

export default TimelineEditor;
