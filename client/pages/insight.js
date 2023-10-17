import { Box, Button, chakra, Flex, Grid, GridItem, Link, SimpleGrid, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import privateUserRoute from '../routers/privateUserRoute';
import * as Yup from "yup";
import { Formik } from "formik";
import NextLink from 'next/link';
import { toast } from 'react-toastify';
import ButtonWithModal from '../components/ButtonWithModal';
import { getEntries, submitEntries } from '../action/entries';
import ContentLoader from '../components/ContentLoader';
import FormField from '../components/FormField';
import TextEditor from '../components/TextEditor';
import { ChevronLeftIcon } from '@chakra-ui/icons';

const options = [
  { value: "1. What if India was a monarch?", label: "1. What if India was a monarch?" },
  { value: "2. According to me, the best invention to date is….", label: "2. According to me, the best invention to date is…" },
  { value: "3. Is Moonlighting ethical?", label: "3. Is Moonlighting ethical?" },
  { value: "4. Is there Life Out There?", label: "4. Is there Life Out There?" },
  { value: "5. Write about an incident from the point of view of your favorite fictional character", label: "5. Write about an incident from the point of view of your favorite fictional character" },

]

const validateSchema = Yup.object({
  topic: Yup.string().trim().required("Required"),
  submission: Yup.string().trim().required("Required")
})

const Insight = () => {
  const textColor = useColorModeValue("gray.700", "gray.50")
  const [submission, setSubmission] = useState()
  const [loading, setLoading] = useState(true);
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const entryData = await submitEntries(values, 'insight');
      if (entryData?.error) {
        toast.error(entryData?.error);
        setLoading(false);
        return;
      }
      setSubmission(entryData.submission);
      toast.success('Entry Submitted Successfully');
    } catch (e) {
      console.log(e)
      toast.error('Someting Went Wrong')
    }
    setLoading(false);
  }
  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const entryData = await getEntries('insight');
        if (entryData?.error) {
          console.log(entryData?.error);
        }
        setSubmission(entryData?.submission);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    }
    fetchSubmission();
  }, [setSubmission])
  const [tabIndex, setTabIndex] = useState(0)
  return !loading ? (
    <Layout>
      <Box
        pt={10}
        width={"full"}
        pb={"20px"}
        px={{
          base: '16px',
          md: '48px',
          lg: '64px'
        }}
      >
        <NextLink href='/dashboard'>
          <chakra.h3
            fontWeight={"bold"}
            fontSize={20}
            textTransform={"uppercase"}
            color={"purple.400"}
            cursor="pointer"
            display={'flex'}
            alignItems={'center'}
          >
            <ChevronLeftIcon w={6} h={6} /> <span>Back to all events</span>
          </chakra.h3>
        </NextLink>
        <chakra.h1
          py={5}
          fontSize={48}
          fontWeight={"bold"}
          color={textColor}
        >
          Insight
        </chakra.h1>
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          gap={10}
        >
          <GridItem>
            <Tabs onChange={(index) => setTabIndex(index)}>
              <TabList>
                <Tab>
                  Topics
                </Tab>
                <Tab>Instructions</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Stack spacing={3}>
                    <Text fontSize='2xl'>
                      Topics
                    </Text>
                    {
                      options.map((item) => (
                        <Text fontSize='lg' key={item.value}>
                          {item.label}
                        </Text>
                      ))
                    }
                  </Stack>
                </TabPanel>
                <TabPanel>
                  <Stack spacing={3}>
                    <Text fontSize='2xl'>
                      Instructions
                    </Text>
                    <Text fontSize='lg'>
                      Round 1:
                      Write an essay or a story using the given prompt.
                      Contestants are required to complete a story or an essay for the prompts provided.
                      <br></br>
                      Mode: online
                      <br></br>
                      Word limit: 400 words
                      <br></br>
                      Timeline: 3 days (30/4/23 to 03/05/23)
                      <br></br>
                      File should be sent in word doc format
                    </Text>
                    <Text fontSize='lg'>
                      Round 2:
                      Mode: offline
                      Picture narrative.
                      <br></br>
                      Given would be a picture with a deeper meaning contained in it. <br></br>
                      Contestants are required to write a narrative about the picture, describing what significance it holds.
                      <br></br>
                      Prep time: 1 min <br></br>
                      Writing time: 15 mins <br></br>
                      Word limit: 150-400 words <br></br>

                    </Text>
                    <Text fontSize='lg'>
                      1. All rounds are elimination rounds and selected participants would be informed by our team.
                    </Text>
                    <Text fontSize='lg'>
                      2. Plagiarized entries will be disqualified.
                    </Text>
                  </Stack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </GridItem>
          {
            submission?.id ?
              (
                <GridItem>
                  <Flex
                    minH={"200px"}
                    border={'2px solid primaries.100'}
                    alignItems={"center"}
                    justifyContent={"center"}
                    flexDirection={'column'}
                    gap={5}
                  >
                    <Text fontSize={'2xl'} textAlign={"center"}>You have already submitted your entry</Text>
                  </Flex>
                </GridItem>
              ) : (
                <GridItem>
                  <Formik
                    initialValues={{ topic: "", submission: "" }}
                    onSubmit={handleSubmit}
                    validationSchema={validateSchema}
                  >
                    {({ handleBlur, handleChange, values, handleSubmit }) => (
                      <form onSubmit={handleSubmit}>
                        <Stack
                          spacing={10}
                        >
                          <FormField
                            label="Topic ( Please copy & paste topic from list of adjacent topic )"
                            type='text'
                            name="topic"
                            value={values.topic}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Topic"
                          />
                          <TextEditor
                            label="Description"
                            name="submission"
                            value={values.submission}
                            placeholder="Description"
                          // onBlur={handleBlur}
                          />
                          <ButtonWithModal handleSubmit={() => handleSubmit(values)} />
                        </Stack>
                      </form>
                    )}
                  </Formik>
                </GridItem>
              )
          }
        </SimpleGrid>
      </Box>
    </Layout>
  ) : (
    <ContentLoader />
  )
}

export default privateUserRoute(Insight)