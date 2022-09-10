import React from 'react';
import RoomAllocation from './containers/RoomAllocation/RoomAllocation';

const App = () => {
  const onChange = guest => {
    console.log(guest);
  };

  return (
    <div>
      <RoomAllocation room={4} guest={10} onChange={onChange} />
    </div>
  );
};

App.propTypes = {};

export default App;
