import { Box, Text, Image, Grid, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, IconButton, useDisclosure, Spinner } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon, DownloadIcon } from '@chakra-ui/icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Gallery = () => {
    const [loading, setloading] = useState(false);
    const [images, setImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const getGallery = async () => {
        try {
            setloading(true);
            const res = await axios.get('http://localhost:5000/image/gallery', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
                },
            });
            setloading(false);
            setImages(res.data.images);
        } catch (error) {
            console.error('Error fetching gallery:', error);
        }
    };

    const openModal = (index) => {
        setCurrentIndex(index);
        onOpen();
    };

    const showNextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const showPreviousImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const downloadImage = async (imageUrl) => {
        try {
            const response = await axios.get(imageUrl, {
                responseType: 'blob',
            });
            const blob = new Blob([response.data], { type: response.data.type });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `image-${currentIndex + 1}.jpg`;
            link.click();
        } catch (error) {
            console.error('Error downloading the image:', error);
        }
    };

    useEffect(() => {
        getGallery();
    }, []);

    return (
        <Box w="100%" mt="80px">
            <Box w={{ base: '90%', lg: '95%' }} m="auto">
                <Text align="center" py={5} fontSize="2xl" fontWeight="bold">Gallery</Text>
                {loading && <Spinner />}
                <Grid
                    templateColumns={{
                        base: 'repeat(2, 1fr)',  
                        md: 'repeat(4, 1fr)',  
                        lg: 'repeat(6, 1fr)',    
                    }}
                    gap={6}
                >
                    {images.map((img, index) => (
                        <Box
                            key={index}
                            display='flex'
                            justifyContent='center'
                            borderRadius="md"
                            overflow="hidden"
                            onClick={() => openModal(index)}
                            cursor="pointer"
                        >
                            <Image
                                src={img}
                                alt={`Gallery Image ${index + 1}`}
                                w="80%"
                                maxHeight="300px"
                                objectFit="cover"
                                borderRadius="md"
                            />
                        </Box>
                    ))}
                </Grid>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose} size="full">
                <ModalOverlay />
                <ModalContent bg="transparent" boxShadow="none">
                    {/* Add zIndex explicitly to ensure it's clickable */}
                    <ModalCloseButton 
                        color="black" 
                        p={3} 
                        bg="white" 
                        zIndex="20"   // Ensure it's above everything else
                        cursor="pointer"  // Ensure the cursor appears
                    />

                    <ModalBody display="flex" justifyContent="center" alignItems="center" position="relative">
                        <IconButton
                            icon={<ChevronLeftIcon color='black' />}
                            onClick={showPreviousImage}
                            position="absolute"
                            left="20px"
                            top="50%"
                            transform="translateY(-50%)"
                            zIndex="10"
                            aria-label="Previous Image"
                        />

                        <Image
                            src={images[currentIndex]}
                            maxHeight="100vh"
                            maxWidth="100vw"
                            objectFit="contain"
                        />

                        <IconButton
                            icon={<ChevronRightIcon color='black' />}
                            onClick={showNextImage}
                            position="absolute"
                            right="20px"
                            top="50%"
                            transform="translateY(-50%)"
                            zIndex="10"
                            aria-label="Next Image"
                        />

                        <IconButton
                            icon={<DownloadIcon color='black' />}
                            onClick={() => downloadImage(images[currentIndex])}
                            position="absolute"
                            bottom="20px"
                            right="50px"
                            zIndex="10"
                            aria-label="Download Image"
                            bg="white"
                            _hover={{ bg: "gray.200" }}
                        />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default Gallery;
