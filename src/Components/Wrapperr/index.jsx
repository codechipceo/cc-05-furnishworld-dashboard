import { Box, Container, Typography } from "@mui/material";

export const Wrapper = ({ children }) => {
  return (
    <Box m={3} p={3} borderRadius={0} boxShadow={2} bgcolor={"white"} >
      {children}
    </Box>
  );
};

export const HeaderBar = ({ title }) => {
  return (
    <Box bgcolor={"white"} boxShadow={2} py={2} >
      <Container>
        <Typography variant='h3' fontWeight={"bold"}>
          {title}
        </Typography>
      </Container>
    </Box>
  );
};
