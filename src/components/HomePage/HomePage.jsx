import { Box, Button, Grid, Image, Text } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import './HomePage.css'
import { CiImageOn } from "react-icons/ci";

import data from './data'
const HomePage = () => {


    const fileInputRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
            console.log(file)
        }
    };


    return (
        <Box
            w="100%"
            p="30px 0px"
            mt="70px"
            overflow="auto"
        >
            <Box
                w={{ base: '95%', lg: '95%' }}
                display="flex"
                m="auto"
            >
                <Box display={{ base: 'none', lg: 'block' }} w="350px" minWidth="350px" className="sidebar" bg="#E2F7FA" borderRadius="20px">
                    <Box display="flex" justifyContent='center'>
                        <Text bg="lightblue" me={2} py={1} px={3} borderRadius="20px" align='center' fontSize="18px" mb={4}>Presets</Text>
                    </Box>

                    <Box pt={4} className="scrollbox">
                        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                            {data.map((item, index) => (
                                <Box key={index} display="flex" flexDirection="column" alignItems="center" cursor='pointer'>

                                    <Image
                                        borderRadius="20px"
                                        src={item.img}
                                        alt={item.text}
                                        boxSize="100px"
                                        mb={2}
                                        transition="transform 0.3s ease"
                                        _hover={{ transform: 'scale(1.1)' }}
                                    />
                                    <Text fontSize="16px" fontWeight="500">{item.text}</Text>
                                </Box>
                            ))}
                        </Grid>
                    </Box>
                </Box>

                <Box
                    w={{ base: '100%', lg: '80%' }}
                    m={{ base: '0', lg: "0px 0px 0px 380px" }}
                    display="flex"
                    flexDir="column"
                    gap="40px"
                >
                    <Box
                        display="flex"
                        justifyContent='flex-end'
                    >
                        <Button
                            borderRadius="20px"
                            fontWeight="light"
                            bg="#CAB9D2"
                            boxShadow="0 2px 5px rgba(0, 0, 0, 0.3)"
                            _hover={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}
                        >
                            Add New Preset
                        </Button>
                    </Box>

                    <Box
                        display="flex"
                        justifyContent='center'
                        alignItems='center'
                    >
                        <Box
                            w={{ base: '70%', lg: '50%' }}
                            minWidth="500px"
                            h="40vh"
                            border="2px dashed black"
                            borderRadius="20px"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >

                            {!selectedImage && <Box
                                display='flex'
                                flexDir='column'
                                w="80%"
                                alignItems='center'
                                gap="15px"
                                p="50px 0px"
                                bgGradient="linear(to-b, #D9F9FB, white)"
                                borderRadius="20px"
                            >
                                <CiImageOn size={40} />
                                <Text>Drop your images here!!</Text>

                                <input
                                    type="file"
                                    accept="image/jpeg, image/png"
                                    onChange={handleFileChange}
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                />

                                <Button
                                    bg="#AEF3F8"
                                    borderRadius="20px"
                                    fontWeight='light'
                                    boxShadow="0 2px 5px rgba(0, 0, 0, 0.3)"
                                    _hover={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}
                                    onClick={handleButtonClick}
                                >
                                    Browse Image
                                </Button>
                            </Box>}

                            {selectedImage && <Image w = "50%" src = {selectedImage} />}

                        </Box>
                    </Box>

                </Box>
            </Box>

        </Box>
    )
}

export default HomePage
