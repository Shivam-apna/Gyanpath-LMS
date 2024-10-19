import {
  Switch,
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useDisclosure,
  Button,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { HamburgerIcon } from "@chakra-ui/icons";

function StudentNavbar({ inUserList }) {
  let isToken = localStorage.getItem("token");
  let navigate = useNavigate();
  let x = JSON.parse(localStorage.getItem("switch"));
  let y = JSON.parse(localStorage.getItem("check"));

  let [show, setShow] = useState(x);
  let [checked, setChecked] = useState(y);
  let toast = useToast();
  //=========for drawer=================================//
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  // =============handle Switch for toggle image=========//
  let handleSwitch = () => {
    setShow(!show);
    localStorage.setItem("switch", JSON.stringify(!show));
    setChecked(!checked);
    localStorage.setItem("check", JSON.stringify(!checked));
  };
  let handleLms = () => {
    if (inUserList) {
      navigate("/lmslecture");
    } else {
      toast({
        description: " Not Authorized!",
        status: "error",
        isClosable: true,
        duration: 9000,
        position: "top",
      });
    }
  };

  let portfolio = () => {
    toast({
      description: "Coming Soon",
      status: "success",
      isClosable: true,
      duration: 9000,
      position: "top",
    });
  };

  return (
    <Flex
      zIndex={700}
      w={"100%"}
      boxShadow="sm"
      height={"80px"}
      align={"center"}
      justifyContent="space-evenly"
      bgColor={"#0a152f"}
      position="sticky"
      top={0}
    >
      <Box>
        <Link to={"/"}>
          <Image src="../../education.png" />
        </Link>
      </Box>
      <Flex
        display={["none", "none", "none", "flex"]}
        align={"center"}
        justifyContent="space-evenly"
        width={"70%"}
        fontSize={["10px", "14px", "16px", "16px"]}
        color="teal.900"
        fontWeight={600}
      >
        <Box color={"white"}>
          <NavLink to={"/courses"}>COURSES</NavLink>
        </Box>
        <Box color={"white"} cursor={"pointer"} onClick={() => handleLms()}>
          LMS
        </Box>
        <Box color={"white"} cursor={"pointer"} onClick={() => portfolio()}>
          PORTFOLIO
        </Box>

        <Box color={"white"}>
          {isToken ? (
            <Menu>
              <MenuButton
                as={IconButton}
                borderRadius={"50%"}
                icon={<Box w={show ? "" : 10}>{<VscAccount />}</Box>}
                bg="variant"
                fontSize={35}
              />

              <MenuList bgColor={"black"} color={"black"}>
                <MenuItem
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/");
                  }}
                >
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <NavLink to={"/signup"}>SignUp</NavLink>
          )}
        </Box>

        <Box>
          <Switch
            colorScheme="red"
            isChecked={checked}
            onChange={handleSwitch}
          />
        </Box>
      </Flex>
      {/* if screen size is small or medium */}

      {isToken && (
        <>
          <HamburgerIcon
            aria-label="Options"
            as={HamburgerIcon}
            fontSize={30}
            color="white"
            onClick={onOpen}
            ref={btnRef}
            display={["flex", "flex", "flex", "none"]}
          />
          <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerBody bgColor={"#66b9bf"} color="white" fontWeight={600}>
                <Stack spacing={30}>
                  <Box>
                    <NavLink to={"/courses"}>COURSES</NavLink>
                  </Box>
                  <Box>
                    <NavLink to={"/fees"}>FEES & PAP</NavLink>
                  </Box>
                  <Box
                    color={"white"}
                    cursor={"pointer"}
                    onClick={() => handleLms()}
                  >
                    LMS
                  </Box>

                  <Box onClick={onClose}>
                    {isToken ? (
                      <Text
                        onClick={() => {
                          localStorage.removeItem("token");
                          navigate("/");
                        }}
                      >
                        {" "}
                        LogOut
                      </Text>
                    ) : (
                      <NavLink to={"/"}>SignUp</NavLink>
                    )}
                  </Box>

                  <Box>
                    <Switch
                      colorScheme="red"
                      isChecked={checked}
                      onChange={handleSwitch}
                    />
                  </Box>
                </Stack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
      )}
    </Flex>
  );
}

export default StudentNavbar;
