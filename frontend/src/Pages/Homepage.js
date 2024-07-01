import React, { useEffect } from 'react';
import { Container, Box, Tabs, TabList, TabPanel, Tab, TabPanels, Text} from '@chakra-ui/react';
import Login from '../Components/Authentication/Login';
import Signup from '../Components/Authentication/Signup';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user){
      navigate("/chat");
    }
  }, [navigate]);

  
  return (
    <Container maxW="xl" centerContent>
      {/* <div className='heading'>
        <div className='title'>
          Ash-Chat
        </div>
      </div> */}
      <Box display="flex" justifyContent="center" p={3} bg="white" w="100%" 
      m="40px 0 15px 0" borderRadius="lg" borderWidth="1px">
        <Text fontSize="4xl" fontFamily="Work sans">
          Ash-Chat
        </Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px" m="0 0 40px 0">
        <Tabs variant="soft-rounded">
          <TabList mb="1em">
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Signup</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Login/>
            </TabPanel>
            <TabPanel>
              <Signup/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}

export default Homepage