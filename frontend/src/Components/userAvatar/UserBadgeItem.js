import { Badge } from '@chakra-ui/react';
import React from 'react'
import { RxCross2 } from "react-icons/rx";

const UserBadgeItem = ({ user, handleFunction, admin }) => {
  return (
    <Badge
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      colorScheme="purple"
      cursor="pointer"
      display='flex'
      alignContent='center'
      gap='2px'
      onClick={handleFunction}
    >
      {user.name}
      <RxCross2 />
    </Badge>
  );
};

export default UserBadgeItem;