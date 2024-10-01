import { Box, Button, Grid, Image, Text, useToast, useBreakpointValue, Spinner } from '@chakra-ui/react'
import React, { useRef, useState, useEffect } from 'react'
import './HomePage.css'
import { CiImageOn } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import axios from 'axios'
import AvatarEditor from 'react-avatar-editor';
import { FaArrowRotateLeft } from "react-icons/fa6";
import { FaArrowRotateRight } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';


const HomePage = () => {
    const toast = useToast();
    const editorSize = useBreakpointValue({ base: 300, md: 400 });
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [applyloading , setapplyloading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [removedBgImage, setRemovedBgImage] = useState(null);
    const [rotationAngle, setRotationAngle] = useState(0);
    const [scale, setScale] = useState(0.5);
    const [preset , setpreset] = useState('Surprise me');

    const [themes , setthemes] = useState([]);

    const fileInputRef = useRef(null);
    const editorRef = useRef(null);

    const getthemes = async() => {
        await axios.get('http://localhost:5000/image/themes' , {headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        }}).then(res => {
            console.log(setthemes(res.data))
        })
    }

    useEffect(() => {
        getthemes();
    } , [])

    useEffect(() => {
        if (selectedImage !== null) {
            handleRemoveBackground();
        }
    }, [selectedImage]);


    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleRemoveBackground = async () => {
        if (!selectedImage) {
            toast({
                title: 'Error',
                status: 'error',
            });
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append('image', selectedImage);

        try {
            const res = await axios.post('http://localhost:5000/image/remove-background', formData, {headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
            }},
            { withCredentials: true });
            setRemovedBgImage(res.data.removedBgImg);
            toast({
                title: 'Image Added!!',
                status: 'success',
                duration: 2000,
                isClosable: true,
                position: 'top-right',
            });
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);
        }
    };

    const handleScaleChange = (event) => {
        setScale(parseFloat(event.target.value));
    };

    const handleRotateLeft = () => {
        setRotationAngle(rotationAngle - 90);
    };

    const handleRotateRight = () => {
        setRotationAngle(rotationAngle + 90);
    };

    const handlePresetApply = async () => {
        if (editorRef.current) {
            const canvas = editorRef.current.getImageScaledToCanvas(); 
            const base64Image = canvas.toDataURL().replace(/^data:image\/png;base64,/, ""); 
            setapplyloading(true);
    
            try {
                const res = await axios.post('http://localhost:5000/image/apply-preset', {
                    image: base64Image, 
                    preset
                }, {headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
                }},
                { withCredentials: true });
    
                if(res.data.error){
                    toast({
                        title : 'Error Occured!!',
                        status : 'error'
                    })
                    return;
                }else{
                    navigate('/gallery')
                }
            } catch (error) {
                console.error('Error applying preset:', error);
            } finally {
                setapplyloading(false);
            }
        }
    };
    
    const handleThemeSet = (text) => {
        setpreset(text)
    }
    

    return (
        <Box w="100%" p="30px 0px" mt="70px" overflow="auto">
            <Box w={{ base: '95%', lg: '95%' }} display="flex" m="auto">
                {/* sidebar */}
                <Box display={{ base: 'none', lg: 'block' }} w="350px" minWidth="350px" className="sidebar" bg="#E2F7FA" borderRadius="20px">
                    <Box display="flex" justifyContent="center">
                        <Text bg="lightblue" me={2} py={1} px={3} borderRadius="20px" align="center" fontSize="18px" mb={4}>Presets</Text>
                    </Box>

                    <Box pt={4} className="scrollbox">
                        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                            {themes.length !== 0 && themes.map((item, index) => (
                                <Box key={index} display="flex" flexDirection="column" alignItems="center" cursor="pointer"
                                    onClick={() => {handleThemeSet(item.label)}}
                                    border = {preset === item.label ? '1px dashed blue' : 'transparent'}
                                    borderRadius="20px"
                                    
                                >
                                    <Image
                                        borderRadius="20px"
                                        src={item.thumbnail}
                                        alt={item.text}
                                        boxSize="100px"
                                        mb={2}
                                        transition="transform 0.3s ease"
                                        _hover={{ transform: 'scale(1.1)' }}
                                    />
                                    <Text fontSize="16px" fontWeight="500">{item.label}</Text>
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
                    {/* new preset button */}
                    <Box display="flex" justifyContent="flex-end">
                        <Button
                            borderRadius="20px"
                            fontWeight="light"
                            bg="#CAB9D2"
                            boxShadow="0 2px 5px rgba(0, 0, 0, 0.3)"
                            _hover={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}
                            gap="5px"
                        >
                            <FaPlus />
                            <Text>Add New Preset</Text>
                        </Button>
                    </Box>

                    <Box display="flex" justifyContent="center" alignItems="center">

                        {!selectedImage && (
                            <Box
                                w={{ base: '70%', lg: '50%' }}
                                minWidth="400px"
                                h="40vh"
                                border="2px dashed black"
                                borderRadius="20px"
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Box
                                    display="flex"
                                    flexDir="column"
                                    w="80%"
                                    alignItems="center"
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
                                        fontWeight="light"
                                        boxShadow="0 2px 5px rgba(0, 0, 0, 0.3)"
                                        _hover={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}
                                        onClick={handleButtonClick}
                                    >
                                        Browse Image
                                    </Button>
                                </Box>
                            </Box>
                        )}

                        {loading && <Spinner />}

                        <Box display="flex" flexDir="column">
                            {removedBgImage && (
                                <Box display="flex" justifyContent="center" border="0.5px dashed gray" borderRadius="20px">
                                    <AvatarEditor
                                        ref={editorRef}
                                        image={`data:image/png;base64,${removedBgImage}`}
                                        width={editorSize}
                                        height={editorSize}
                                        border={0}
                                        color={[255, 255, 255, 0.6]}
                                        scale={scale}
                                        rotate={rotationAngle}
                                    />
                                </Box>
                            )}

                            {removedBgImage && (
                                <Box display="flex" flexDir="column" justifyContent="center" alignItems="center" gap="20px">
                                    <Box w="100%" display="flex" justifyContent="space-between">
                                        <Button onClick={handleRotateLeft}>
                                            <FaArrowRotateLeft />
                                        </Button>
                                        <Button onClick={handleRotateRight}>
                                            <FaArrowRotateRight />
                                        </Button>
                                    </Box>
                                    <input type="range" min="0.1" max="2" step="0.01" value={scale} onChange={handleScaleChange} />
                                    <Button isLoading = {applyloading} loadingText = "Adding Preset" onClick={handlePresetApply}>Generate Image</Button>
                                </Box>
                            )}


                            {/* {coloredimg &&
                                <Box>
                                    <Image 
                                        src={`data:image/png;base64,${coloredimg}`}
                                    />
                                </Box>
                            } */}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default HomePage;