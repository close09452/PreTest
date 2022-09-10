import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import RoomBlock from '../../components/RoomBlock/RoomBlock';
import {
  TitleText
} from '../../components/UI/Common/style';
import { Wrapper, AlertBlock } from './style';
import PropTypes from 'prop-types';

const RoomAllocation = props => {
  const [roomContents, setRoomContents] = useState([]);
  const [assignedGuest, setAssignedGuest] = useState(0);
  const { room, guest, onChange } = props;

  const onRoomGuestChange = roomContent => {
    const currentRooms = _.clone(roomContents);
    const roomToChange = currentRooms.findIndex(
      aRoom => aRoom.roomName === roomContent.roomName
    );
    if (roomToChange !== -1) {
      currentRooms[roomToChange] = roomContent;
      setRoomContents(currentRooms);
    }
    const currnetGuest = currentRooms.map(aRoom => aRoom.guest);
    let currnetGuestLength = 0;
    currnetGuest.forEach(
      aGuestContent =>
        (currnetGuestLength += aGuestContent.adult + aGuestContent.child)
    );
    onChange(currnetGuest);
    setAssignedGuest(currnetGuestLength);
  };

  useEffect(() => {
    const roomContents = [...Array(room).keys()].map(aRoom => ({
      roomName: `room ${aRoom}`,
      guest: { adult: 1, child: 0 }
    }));
    setRoomContents(roomContents);
  }, [room]);

  return (
    <Wrapper>
      <TitleText>
        住客人數: {guest}人 / {room}房
      </TitleText>
      <AlertBlock>尚未分配人數:{guest - assignedGuest}</AlertBlock>
      {roomContents.map(aRoom => (
        <RoomBlock
          roomName={aRoom.roomName}
          key={aRoom.roomName}
          assignableGuest={guest - assignedGuest}
          roomGuest={aRoom.guest}
          onRoomGuestChange={onRoomGuestChange}
          disabled={guest === room}
        />
      ))}
    </Wrapper>
  );
};

RoomAllocation.propTypes = {
    room: PropTypes.number.isRequired,
    guest: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
  };

export default RoomAllocation;
