import { CalendarIcon, TimeIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Button,
  Grid,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import React, { useEffect, useState } from "react";
import Footer from "../../Components/Footer/Footer";
import StudentNavbar from "../NavStudent/StudentNavbar";
import { useNavigate } from "react-router-dom";
// import { webImage } from "";

function Courses() {
  let toast = useToast();
  let [isPresent, setIsPresent] = useState(false);
  let [inUserList, setInUserList] = useState(false);

  let [isLoading, setLoading] = useState(false);
  let [isIndex, setIndex] = useState(-1);
  let isToken = localStorage.getItem("token");
  let navigate = useNavigate();
  let arr = [
    {
      elg: "GRADUATES &amp; 12TH PASS",
      type: "full time",
      req: "requires no coding experience",
      level: "Level 1 - Full Stack",
      course: "Web Development",
      date: "Course starts on 08 May 2024",
    },
    {
      elg: "FINAL YEAR STUDENTS, WORKING PROFESSIONALS",
      type: "part time",
      req: "requires no coding experience",
      level: "Level 1 - Full Stack",
      course: "Web Development",
      date: "Course starts on 20 Mar 2024",
    },
    {
      elg: "FINAL YEAR STUDENTS, WORKING PROFESSIONALS",
      type: "full time",
      req: "REQUIRES NO ANALYTICS EXPERIENCE",
      level: "Level 1 ",
      course: "Data Analytics",
      date: "Course starts on 29 May 2024",
    },
    {
      elg: "WORKING PROFESSIONALS",
      type: "full time",
      req: "REQUIRES MINIMUM ONE YEAR OF TECH EXPERIENCE",
      level: "Level 2",
      course: "Backend Development",
      date: "Course starts on 08 SEP 2023",
    },
    {
      url: "",
      elg: "WORKING PROFESSIONALS",
      type: "full time",
      req: "requires no coding experience",
      level: "Level 1",
      course: "MERA MONITOR",
      date: "Course starts on 19 Oct 2024",
    },
    {
      url: "",
      elg: "WORKING PROFESSIONALS",
      type: "full time",
      req: "requires no coding experience",
      level: "Level 1",
      course: "KARYA KEEPER",
      date: "Course starts on 19 Oct 2024",
    },
  ];
  let user = JSON.parse(localStorage.getItem("currentUser"));

  let handleApplication = (el, index) => {
    let payload = {
      name: user.name,
      email: user.email,
      state: user.state,
      course: el.course,
      index: index,
      coursetime: el.type,
    };
    setLoading(true);
    fetch("http://localhost:3000/application/createapplication", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.msg);
        console.log("Application submited successfully");
        getApplication();
        setLoading(false);
        toast({
          description: res.msg,
          status: res.msg.includes("successfully") ? "success" : "warning",
          isClosable: true,
          duration: 9000,
          position: "top",
        });
      })
      .catch((er) => console.log(er));
  };
  // ----------fetching applications-----------//
  let getApplication = () => {
    fetch("http://localhost:3000/application/getapplicationlist", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.msg);

        for (let i = 0; i < res.msg.length; i++) {
          if (res.msg[i].email === user.email) {
            setIndex(res.msg[i].index);
            setIsPresent(true);

            return;
          } else {
            setIsPresent(false);
          }
        }
      })
      .catch((er) => console.log(er));
  };

  let getStudentList = () => {
    fetch("http://localhost:3000/adminwork/getStudentsList", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        for (let i = 0; i < res.msg.length; i++) {
          if (res.msg[i].email === user.email) {
            setIndex(res.msg[i].index);

            setInUserList(true);
            return;
          } else {
            setInUserList(false);
          }
        }
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    if (!isToken) {
      navigate("/");
    }
    getApplication();
    getStudentList();
  });
  return (
    <>
      <StudentNavbar inUserList={inUserList} />

      <Box m={"auto"}>
        <Box p={10}>
          <Text
            color={"#0A0103"}
            fontSize={{ base: 30, sm: 35, md: 40, lg: 45 }}
            fontWeight={700}
          >
            Our Courses
          </Text>
          <Text
            fontWeight={300}
            fontSize={{ base: 16, sm: 20, md: 25, lg: 28 }}
          >
            Start your career on the right foot by getting skilled and become
            job-ready!
          </Text>
        </Box>
        <Box
          w={{ base: "100%", sm: "90%", md: "100%", lg: "100%" }}
          m={"auto"}
          p={{ base: 1, sm: 2, md: 3, lg: 5, xl: 10 }}
        >
          <Grid
            w={"fit-content"}
            m={"auto"}
            templateColumns={{
              base: "repeat(1,1fr)",
              sm: "repeat(1,1fr)",
              md: "repeat(1,1fr)",
              lg: "repeat(2,1fr)",
              xl: "repeat(3,1fr)",
            }}
            gap={{ base: 2, sm: 3, md: 4, lg: 5, xl: 6 }}
          >
            {arr.map((el, index) => (
              <Box key={index}>
                {/* --------- */}
                <Box width={"100%"}>
                  <Image width={"100%"} src={el.url} />
                </Box>
                {/* --------- */}

                <Box
                  w={"100%"}
                  display={"flex"}
                  flexDir={"column"}
                  borderBottomRadius={20}
                  gap={2}
                  p={3}
                  justifyContent={"left"}
                  boxShadow={"md"}
                  bgColor={"white"}
                >
                  <Box
                    display={"flex"}
                    flexDir={"column"}
                    gap={2}
                    w={"fit-content"}
                  >
                    <Badge
                      color={"#6E71CC"}
                      width={"fit-content"}
                      pl={2}
                      pr={2}
                      borderRadius={15}
                      fontSize={{ base: 8, sm: 12, md: 12, lg: 13, xl: 13 }}
                    >
                      {el.elg}
                    </Badge>
                    <Badge
                      bgColor={"#F6EDE7"}
                      width={"fit-content"}
                      color={"#cc926e"}
                      pl={2}
                      pr={2}
                      borderRadius={15}
                      fontSize={{ base: 8, sm: 12, md: 12, lg: 13, xl: 13 }}
                    >
                      {el.type}
                    </Badge>
                    <Badge
                      pl={2}
                      pr={2}
                      borderRadius={15}
                      fontSize={{ base: 8, sm: 12, md: 12, lg: 13, xl: 13 }}
                      color={"#1A9FBD"}
                    >
                      {el.req}
                    </Badge>
                  </Box>

                  {/* --------- */}
                  <Box
                    display={"flex"}
                    justifyContent={"space-evenly"}
                    textAlign="left"
                    flexDir={"column"}
                    gap={2}
                    pl={6}
                    w={"fit-content"}
                  >
                    <Text fontSize={20} fontWeight={600}>
                      {el.level}
                    </Text>
                    <Text fontSize={20} fontWeight={700}>
                      {el.course}
                    </Text>
                  </Box>
                  {/* --------- */}
                  <Box
                    display={"flex"}
                    justifyContent={"space-evenly"}
                    flexDir={"column"}
                    gap={2}
                    w={"fit-content"}
                  >
                    <Box display={"flex"} gap={2} alignItems={"center"}>
                      <CalendarIcon />
                      <Text>{el.date}</Text>
                    </Box>
                    <Box display={"flex"} gap={2} alignItems={"center"}>
                      <TimeIcon />
                      <Text>{el.startlearning}</Text>
                    </Box>
                    <Box display={"flex"} gap={2} alignItems={"center"}>
                      <HiOutlineCurrencyRupee />
                      <Text>{el.rs}</Text>
                    </Box>
                  </Box>
                  {/* -------- */}
                  <Box w={"fit-content"}>
                    <Button
                      color={"white"}
                      bgColor={
                        index == isIndex && inUserList == false
                          ? "orange"
                          : index == isIndex && inUserList == true
                          ? "green"
                          : "#ED0331"
                      }
                      onClick={() => handleApplication(el, index)}
                    >
                      {index == isIndex && inUserList == false
                        ? "In Progress.."
                        : index == isIndex && inUserList == true
                        ? "Accepted"
                        : "APPLY NOW"}
                    </Button>
                  </Box>
                </Box>
              </Box>
            ))}
          </Grid>
        </Box>
        <Footer />
      </Box>
    </>
  );
}

export default Courses;
