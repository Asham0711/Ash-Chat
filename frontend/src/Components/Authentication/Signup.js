import { FormControl, FormLabel, Input, VStack, InputGroup, InputRightElement, Button } from '@chakra-ui/react'
import React, { useState} from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useToast } from "@chakra-ui/toast";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

//https://api.cloudinary.com/v1_1/dqhrmshl1

const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();


  const handleClick = () => setShow(!show);

  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "ash-chat");
      data.append("cloud_name", "dqhrmshl1");
      fetch("https://api.cloudinary.com/v1_1/dqhrmshl1/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
  };

  const submitHandler = async () => {
    setPicLoading(true);
    if(!email || !password || !confirmpassword || !name){
        toast({
            title:"Please fill all the credentials",
            status:"warning",
            duration: 5000,
            isClosable:true,
            position:"top",
        });
        setPicLoading(false);
        return;
    }
    if(password !== confirmpassword){
        toast({
            title:"Passwords are not matching",
            status:"warning",
            duration: 5000,
            isClosable:true,
            position:"top",
        });
        return;
    }

    try {
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        }
        const { data } = await axios.post(
            "/api/user",
            {
            name,
            email,
            password,
            pic,
            },
            config
        );
        toast({
            title: "Registration Successful",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });
        localStorage.setItem("userInfo", JSON.stringify(data));
        setPicLoading(false);
        navigate('/chat');
    } catch (error) {
        toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
    }

  }

  return (
    <VStack spacing="5px">
        <FormControl id="first-name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input placeholder="Enter Your Name" onChange={(e) => setName(e.target.value)}/>
        </FormControl>
        <FormControl id="email" isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input
            type="email"
            placeholder="Enter Your Email Address"
            onChange={(e) => setEmail(e.target.value)}
            />
        </FormControl>
        <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup size="md">
            <Input
                type={show ? "text" : "password"}
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? <AiOutlineEyeInvisible/> :<AiOutlineEye/>}
                </Button>
            </InputRightElement>
            </InputGroup>
        </FormControl>
        <FormControl id="password" isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup size="md">
            <Input
                type={confirm ? "text" : "password"}
                placeholder="Confirm password"
                onChange={(e) => setConfirmpassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={() => {setConfirm(!confirm)}}>
                {confirm ? <AiOutlineEyeInvisible/> :<AiOutlineEye/>}
                </Button>
            </InputRightElement>
            </InputGroup>
        </FormControl>
        <FormControl id="pic">
            <FormLabel>Upload your Picture</FormLabel>
            <Input
            type="file"
            p={1.5}
            accept="image/*"
            onChange={(e) => postDetails(e.target.files[0])}
            />
        </FormControl>
        <Button
            colorScheme="blue"
            width="100%"
            style={{ marginTop: 15 }}
            onClick={submitHandler}
            isLoading={picLoading}
        >
            Sign Up
        </Button>
    </VStack>
  )
}

export default Signup