import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { toast } from 'react-toastify';
import * as Yup from "yup";
import { useContext, useState } from "react";
import Layout from "../components/Layout";
import FormField from "../components/FormField";
import { userLogin } from "../action/user";
import AppContext from "../context/AppContext";
import publicRoute from "../routers/publicRoute";
const validateSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required")
});

function Loginpage() {
  const { dispatchUser, dispatchEvents } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values) => {
    try {
      setLoading(true);
      const data = await userLogin(values, 'user', dispatchUser, dispatchEvents);
      if (data?.error) {
        toast.error(data.error);
      }
    } catch (e) {
      console.log(e)
      toast.error('Something Went Wrong')
    }
    setLoading(false)
  }

  return (
    <Layout>
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        px={{
          base: '16px',
          md: '48px',
          lg: '64px'
        }}
        py={"12vh"}
        w={"100vw"}
      >
        <Flex
          align={"center"}
          justify={"center"}
          rounded={useColorModeValue("", "lg")}
          bg={useColorModeValue("white.100", "secondaries.800")}
          // Apply Halloween-style background and border color
          // bg={"#3E4559"}
          borderColor={"#FFA500"}
        >
          <Stack spacing={"8"} py={12} px={4}>
            <Stack align={"center"}>
              <Heading
                fontSize={"4xl"}
                // Apply Halloween-style font color
                color={"#FFA500"}
              >
                Sign in to your account
              </Heading>
            </Stack>
            <Box
              rounded={"lg"}
              boxShadow={"md"}
              px={"5"}
              py={"8"}
            >
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={validateSchema}
                onSubmit={handleLogin}
              >
                {({ handleBlur, handleChange, values, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <Stack spacing={"5"}>
                      <FormField
                        type="email"
                        placeholder="Email"
                        name="email"
                        label="Email Address"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <FormField
                        label="Password"
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Password"
                      />
                      <Button
                        // Apply Halloween-style button colors
                        bg={"#FFA500"}
                        color={"#3E4559"}
                        _hover={{
                          bg: "#FF4500",
                        }}
                        _active={{
                          bg: "orange",
                        }}
                        type="submit"
                        isLoading={loading}
                      >
                        Sign in
                      </Button>
                    </Stack>
                  </form>
                )}
              </Formik>
            </Box>
          </Stack>
        </Flex>
      </Flex>
    </Layout>
  );
}

export default publicRoute(Loginpage);
