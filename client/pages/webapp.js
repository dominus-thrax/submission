import
{
  Box,
  Button,
  chakra,
  Flex,
  Grid,
  GridItem,
  Link,
  SimpleGrid,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import privateUserRoute from "../routers/privateUserRoute";
import { Formik } from "formik";
import { toast } from "react-toastify";
import FileInput from "../components/FileInput";
import NextLink from "next/link";
import { uploadFile } from "../action/uploadFile";
import ButtonWithModal from "../components/ButtonWithModal";
import { getEntries, submitEntries } from "../action/entries";
import ContentLoader from "../components/ContentLoader";
import { ChevronLeftIcon } from "@chakra-ui/icons";

const Webapp = () =>
{
  const textColor = useColorModeValue("gray.700", "gray.50");
  const [submission, setSubmission] = useState();
  const [loading, setLoading] = useState(true);
  const handleSubmit = async (values) =>
  {
    if (!values?.file?.name)
    {
      toast.error("Please Select a file");
      return;
    }
    console.log(values.file.size);
    if (values.file.size > 5000000)
    {
      toast.error("File Size Exceeded");
      return;
    }
    try
    {
      setLoading(true);
      const data = await uploadFile(values.file);
      if (data?.error)
      {
        toast.error("Someting Went Wrong");
        setLoading(false);
        return;
      }
      const entryData = await submitEntries(data, "webapp");
      if (entryData?.error)
      {
        toast.error(entryData?.error);
        setLoading(false);
        return;
      }
      setSubmission(entryData.submission);
      toast.success("Entry Submitted Successfully");
    } catch (e)
    {
      console.log(e);
      toast.error("Someting Went Wrong");
    }
    setLoading(false);
  };
  useEffect(() =>
  {
    const fetchSubmission = async () =>
    {
      try
      {
        const entryData = await getEntries("webapp");
        if (entryData?.error)
        {
          console.log(entryData?.error);
        }
        setSubmission(entryData?.submission);
      } catch (e)
      {
        console.log(e);
      }
      setLoading(false);
    };
    fetchSubmission();
  }, [setSubmission]);
  const [tabIndex, setTabIndex] = useState(0);
  return !loading ? (
    <Layout>
      <Box
        pt={10}
        width={"full"}
        pb={"20px"}
        px={{
          base: "16px",
          md: "48px",
          lg: "64px",
        }}
      >
        <NextLink href="/dashboard">
          <chakra.h3
            fontWeight={"bold"}
            fontSize={20}
            textTransform={"uppercase"}
            color={"purple.400"}
            cursor="pointer"
            display={"flex"}
            alignItems={"center"}
          >
            <ChevronLeftIcon w={6} h={6} /> <span>Back to all events</span>
          </chakra.h3>
        </NextLink>
        <chakra.h1 py={5} fontSize={48} fontWeight={"bold"} color={textColor}>
          Web N App
        </chakra.h1>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={10}>
          <GridItem>
            <Tabs onChange={(index) => setTabIndex(index)}>
              <TabList>
                <Tab>Topics</Tab>
                <Tab>Instructions</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Stack spacing={3}>
                    <Text fontSize="2xl">Topics</Text>
                    <Text fontSize="xl">Get the list of topics <span style={{color:'#2A65AD'}}><a href="https://drive.google.com/file/d/1IN67H2_RrjTPme0p9mbaDiIMedZySAId/view">here</a></span>.</Text>
                    <Text fontSize="2xl">Topics for FE/SE category:</Text>

                    <Text fontSize="xl">Themes:</Text>
                    <Text fontSize="xl">• Agriculture</Text>
                    <Text fontSize="lg">
                      1. Designing an intuitive web/app marketplace for agricultural products, prioritizing a user-friendly interface to enhance the buying and selling experience for farmers, distributors, and buyers.
                    </Text>
                    <Text fontSize="lg">2. Open innovation track.</Text>
                    <Text fontSize="xl">
                      • Education
                    </Text>
                    <Text fontSize="lg">
                      1. Optimizing the user interface and user experience (UI/UX) of a web/app-based platform for reselling old books, ensuring a seamless and visually appealing frontend to attract and engage users in the book resale process.
                    </Text>
                    <Text fontSize="lg">2. Open innovation track.</Text>
                    <Text fontSize="xl">
                      • Healthcare
                    </Text>
                    <Text fontSize="lg">
                      1. Enhancing the frontend design and user interface (UI) of a fitness web/app to deliver an engaging and user-friendly experience, motivating individuals to achieve their fitness goals effectively.
                    </Text>
                    <Text fontSize="lg">2. Open innovation track.</Text>

                    <Text fontSize="2xl">
                      For (SE/TE/BE - Full Stack) judged on full - stack
                      application implementation
                    </Text>
                    <Text fontSize="xl">Themes:</Text>
                    <Text fontSize="xl">• Agriculture</Text>
                    <Text fontSize="lg">
                      1. Finding an innovative, app-based approach to detect and manage diseases in plants and crops, ensuring sustainable agriculture and food security.
                    </Text>
                    <Text fontSize="lg">2. Creating an efficient web/app-based inventory management system tailored for farmers to enhance inventory tracking, minimize waste, and improve agricultural resource utilization.</Text>
                    <Text fontSize="lg">3. Open innovation track.</Text>
                    <Text fontSize="xl">
                      • Education
                    </Text>
                    <Text fontSize="lg">
                      1. Creating a web or app-based solution that promote Education in regional language and also helps to convert existing resources to their regional language.
                    </Text>
                    <Text fontSize="lg">2. Designing an incentive-based strategy for the enrollment of educational service providers, including teachers, tutors, mentors, and educational content creators, onto an online platform aimed at offering educational services to learners in India.</Text>
                    <Text fontSize="lg">3. Open innovation track.</Text>
                    <Text fontSize="xl">
                      • Healthcare
                    </Text>
                    <Text fontSize="lg">
                      1. Enhancing the allocation of doctor availability and appointments within hospitals by integrating digital technology and AI solutions for improved healthcare access and patient scheduling.
                    </Text>
                    <Text fontSize="lg">2. Creating an AR-based medication adherence app that offers visual reminders and instructions for patients, improving medication compliance and health outcomes.</Text>
                    <Text fontSize="lg">3. Open innovation track.</Text>
                  </Stack>
                </TabPanel>
                <TabPanel>
                  <Stack spacing={3}>
                    <Text fontSize="2xl">Instructions</Text>
                    <Text fontSize="lg" fontWeight="bold">
                      1. Each Team can submit an entry for only on Problem Statement. Participants are expected to submit a PPT of the proposed solution and idea on the submission platform for round-1. Adding the link of the figma prototype or github repository in the PPT is optional but preferred.
                    </Text>
                    <Text fontSize="lg">
                      2. Use of web frameworks and any suitable tech stack is allowed but the use of ready-made templates are prohibited.
                    </Text>
                    <Text fontSize="lg">
                      3. Participants should rename their PPT name according to their Leader's name as FirstName_LastName_MobileNumber.extension.
                    </Text>
                    <Text fontSize="lg">
                      4. Ppt slides can include web/app screenshots as well as
                      idea presentation.
                    </Text>
                    
                  </Stack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </GridItem>
          {submission?.id ? (
            <GridItem>
              <Flex
                minH={"200px"}
                border={"2px solid primaries.100"}
                alignItems={"center"}
                justifyContent={"center"}
                flexDirection={"column"}
                gap={5}
              >
                <Text fontSize={"2xl"} textAlign={"center"}>
                  You have already submitted your entry
                </Text>
                <Link
                  href={submission.submission}
                  bg={"blue.400"}
                  px={4}
                  py={2}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  borderRadius={"md"}
                >
                  Downlooad
                </Link>
                
              </Flex>
            </GridItem>
          ) : (
            <GridItem>
              <Formik initialValues={{ file: {} }} onSubmit={handleSubmit}>
                {({ handleBlur, handleChange, values, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <Stack spacing={10}>
                      <FileInput
                        accept={".ppt,.pptx"}
                        label="Upload Your PPT ( .ppt, .pptx upto 5mb )"
                        name="file"
                        onBlur={handleBlur}
                      />
                      <ButtonWithModal
                        handleSubmit={() => handleSubmit(values)}
                      />
                    </Stack>
                  </form>
                )}
              </Formik>
            </GridItem>
          )}
        </SimpleGrid>
      </Box>
    </Layout>
  ) : (
    <ContentLoader />
  );
};

export default privateUserRoute(Webapp);
