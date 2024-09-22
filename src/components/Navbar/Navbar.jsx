import React from 'react'
import { Box, Image, Text } from '@chakra-ui/react'

const Navbar = () => {
    return (
        <Box
            w="100%"
            position="fixed"
            top="0"    
            zIndex="1000" 
        >
            <Box
                display="flex"
                gap="5px"
                color="blue"
                w="95%"
                m="auto"
                p="20px 0px"
            >
                <Box display='flex' alignItems='center' cursor='pointer'>
                    <Image
                        src="https://www.modelverse.in/logo.jpg"
                        w="40px"
                        h="40px"
                        borderRadius="50%"
                    />
                    <Text
                        fontWeight="550"
                        fontSize="20px"
                    >
                        Model Verse
                    </Text>
                </Box>
            </Box>
        </Box>
    )
}

export default Navbar
