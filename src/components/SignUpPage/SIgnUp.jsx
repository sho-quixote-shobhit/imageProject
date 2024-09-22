import { Box, Text, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import React, { useState } from 'react';
import bg from '../../assests/bg2.jpg'
import { Button } from '@chakra-ui/react'
import ClipLoader from "react-spinners/ClipLoader";

const SIgnUp = () => {
    const [signup, setsignup] = useState(false)
    const [loading, setloading] = useState(false)

    const [showPass, setShowPass] = useState(false)
    const handlePassClick = () => setShowPass(!showPass)

    const [showConfirmPass, setShowConfirmPass] = useState(false)
    const handleConfirmPassClick = () => setShowConfirmPass(!showConfirmPass)

    const handleSign = () => {
        setloading(true)
    }

    return (
        <Box
            w="100%"
            minH="100vh" 
            p="100px 0px"
            backgroundImage={`url(${bg})`}
            backgroundSize="cover"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDir="column" 
            overflow="hidden"
        >
            <Box
                w={{ base: '95%', lg: '95%' }}
                maxWidth="1200px"
                p="70px 40px"
                m="auto auto"
                display="flex"
                flexDir={{ base: 'column', lg: 'row' }}
                background='transparent'
                boxShadow="0 4px 12px rgba(0, 0, 0, 0.7)"
                borderRadius="10px"
                gap={{ base: '50px', lg: '' }}
            >
                <Box
                    w={{ base: '100%', lg: '50%' }}
                    display="flex"
                    flexDir="column"
                    gap="70px"
                    color='white'
                >
                    <Text
                        fontSize={{ base: '30px', lg: '40px' }}
                        fontWeight="bold"
                    >
                        MV
                    </Text>

                    <Box
                        display="flex"
                        flexDir="column"
                        gap="25px"
                    >
                        <Text
                            fontSize={{ base: '40px', lg: '50px' }}
                            fontWeight="bold"
                        >
                            Welcome!
                        </Text>

                        <Text>
                            Modelverse
                        </Text>

                        <Box>
                            <Text>
                                Instantly remove backgrounds from your images and replace them with any backdrop you desire. Easy, fast, and perfect for creating stunning visuals.
                            </Text>
                        </Box>

                        <Button
                            bg="#FF8C19"
                            color="white"
                            _hover={{
                                bg: 'transparent',
                                border: '1px solid white',
                                transform: 'translateY(-10px)',
                                transition: 'transform 0.3s ease-in-out'
                            }}
                            w={{ base: '30%', md: '20%', lg: '30%' }}
                            onClick={() => { setsignup(!signup) }}
                        >
                            {signup ? 'Sign in' : 'Sign Up'}

                        </Button>

                    </Box>
                </Box>

                <Box
                    w={{ base: '100%', lg: '50%' }}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Box
                        w={{ base: '100%', lg: '85%' }}
                        display="flex"
                        flexDir="column"
                        color="white"
                        p={{ base: '', lg: '' }}
                        gap="25px"
                    >
                        <Text
                            align='center'
                            fontSize={{ base: '30px', lg: '35px' }}
                            fontWeight="bold"
                        >
                            {signup ? 'Sign Up' : 'Sign in'}
                        </Text>

                        <Box
                            display="flex"
                            flexDir="column"
                        >
                            <Text>
                                Email
                            </Text>

                            <Input placeholder='johndoe@email.com   ' />
                        </Box>

                        <Box
                            display="flex"
                            flexDir="column"
                        >
                            <Text>
                                Password
                            </Text>

                            <InputGroup size='md'>
                                <Input
                                    pr='4.5rem'
                                    type={showPass ? 'text' : 'password'}
                                    placeholder='Enter password'
                                />
                                <InputRightElement width='4.5rem'>
                                    <Button h='1.75rem' size='sm' onClick={handlePassClick}>
                                        {showPass ? 'Hide' : 'Show'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </Box>

                        {signup &&

                            <Box
                                display="flex"
                                flexDir="column"
                            >
                                <Text>
                                    Confirm Password
                                </Text>

                                <InputGroup size='md'>
                                    <Input
                                        pr='4.5rem'
                                        type={showConfirmPass ? 'text' : 'password'}
                                        placeholder='Enter password'
                                    />
                                    <InputRightElement width='4.5rem'>
                                        <Button h='1.75rem' size='sm' onClick={handleConfirmPassClick}>
                                            {showConfirmPass ? 'Hide' : 'Show'}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </Box>

                        }

                        <Button
                            bg="#FF8C19"
                            color="white"
                            _hover={{
                                bg: 'transparent',
                                border: '1px solid white',
                                transform: 'translateY(-10px)',
                                transition: 'transform 0.3s ease-in-out'
                            }}
                            w={{ base: '30%', md: '20%', lg: '30%' }}
                            onClick={() => { handleSign() }}
                        >
                            {loading ? <ClipLoader color='white' /> : 'Submit'}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default SIgnUp;
