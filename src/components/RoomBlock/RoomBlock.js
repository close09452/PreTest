import React, { useState } from 'react';
import CustomInputNumber from '../CustomInputNumber/CustomInputNumber';
import { Wrapper } from './style';
import { TitleText, ContentText, SubContentText } from '../UI/Common/style';
import PropTypes from 'prop-types';

const RoomBlock = props => {
  const { roomName, onRoomGuestChange, assignableGuest, roomGuest, disabled } =
    props;
  const [currentAdultGuest, setCurrentAdultGuest] = useState(0);
  const [currentChildGuest, setCurrentChildGuest] = useState(0);

  const onValueChange = e => {
    if (e.target.name === 'adult') {
      setCurrentAdultGuest(e.target.value);
      onRoomGuestChange({
        roomName: roomName,
        guest: { adult: e.target.value, child: currentChildGuest }
      });
    } else if (e.target.name === 'child') {
      setCurrentChildGuest(e.target.value);
      onRoomGuestChange({
        roomName: roomName,
        guest: { adult: currentAdultGuest, child: e.target.value }
      });
    }
  };

  const onBlur = e => {
    if (e.target.name === 'adult') {
      setCurrentAdultGuest(e.target.value);
    } else if (e.target.name === 'child') {
      setCurrentChildGuest(e.target.value);
    }
  };
  return (
    <>
      <TitleText>房間:{currentAdultGuest + currentChildGuest}人</TitleText>
      <Wrapper>
        <div>
          <ContentText>大人</ContentText>
          <SubContentText>年齡:20+</SubContentText>
        </div>
        <CustomInputNumber
          max={4 - currentChildGuest}
          min={1}
          step={1}
          name='adult'
          disabled={disabled}
          value={roomGuest.adult}
          onChange={onValueChange}
          onBlur={onBlur}
          assignableGuest={assignableGuest}
        />
      </Wrapper>
      <Wrapper>
        <ContentText>小孩</ContentText>
        <CustomInputNumber
          max={4 - currentAdultGuest}
          min={0}
          step={1}
          name='child'
          disabled={disabled}
          value={roomGuest.child}
          onChange={onValueChange}
          onBlur={onBlur}
          assignableGuest={assignableGuest}
        />
      </Wrapper>
    </>
  );
};

RoomBlock.propTypes = {
  roomName: PropTypes.string.isRequired,
  onRoomGuestChange: PropTypes.func.isRequired,
  assignableGuest: PropTypes.number.isRequired,
  roomGuest: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired
};

export default RoomBlock;
