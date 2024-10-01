import React from 'react'
import { Avatar, Box, Button, Image, Menu, MenuButton, MenuDivider, MenuList, Text, MenuItem } from '@chakra-ui/react'
import { FaChevronDown } from 'react-icons/fa'
import { useUser } from '../../context/userContext'
import { useNavigate } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const Navbar = () => {
    const { user, setuser } = useUser();
    const navigate = useNavigate()

    const handleLogout = () => {
        confirmAlert({
            message: `Are you sure to Logout!!`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        localStorage.clear();
                        setuser()
                        navigate('/')
                    }
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    }

    const handleHome = () => {
        navigate('/home')
    }

    const handleGallery = () => {
        console.log('hi')
        navigate('/gallery')
    }

    return (
        <Box
            w="100%"
            position="fixed"
            top="0"
            zIndex="1000"
            bg = {!user ? 'transparent' : 'white'}
            boxShadow={!user ? '' : "0px 4px 10px rgba(0, 0, 0, 0.1)"}
        >
            <Box
                display="flex"
                gap="5px"
                color="blue"
                w="95%"
                m="auto"
                p="20px 0px"
                justifyContent='space-between'
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
                        onClick={handleHome}
                    >
                        Model Verse
                    </Text>
                </Box>

                {user &&
                    <Menu colorScheme='black'>
                        <MenuButton as={Button} rightIcon={<FaChevronDown />}>
                            <Avatar size='sm' cursor='pointer' name={user.name} src={user.photo} />
                        </MenuButton>
                        <MenuList >
                            <MenuItem color='black' onClick={handleGallery}>Gallery</MenuItem>
                            <MenuDivider />
                            <MenuItem
                                color='red'
                                onClick={handleLogout}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                }
            </Box>
        </Box>
    )
}

export default Navbar
