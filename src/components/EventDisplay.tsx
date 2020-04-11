import React from 'react';

interface EventDisplayProps {
  name: string;
}

// Event name are return as html encoded, so to fix the display, we have to use this component
function EventDisplay(props: EventDisplayProps) {
  return (
    <span dangerouslySetInnerHTML={{ __html: props.name }}>
    </span>
  )
}

export default EventDisplay;