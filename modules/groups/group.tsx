import ErrorIcon from "@mui/icons-material/Error";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Stack,
  Tab,
} from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";

import Card from "./components/Card";
import Members from "./components/Members";
import { useGroupQuery } from "graphql/generated";
import { useSnackbarError } from "utils/apollo";

const Group: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error } = useGroupQuery({
    skip: !id || typeof id !== "string",
    variables: {
      id: id as string,
    },
  });
  useSnackbarError(error);
  const group = useMemo(
    () => (data?.node?.__typename === "Group" ? data.node : null),
    [data]
  );

  const [tab, setTab] = useState("members");

  if (loading || !group) {
    return (
      <Stack flex={1} alignItems="center" justifyContent="center">
        <CircularProgress />
      </Stack>
    );
  }

  if (!group) {
    return (
      <Container>
        <Alert severity="error" icon={<ErrorIcon />}>
          Group not found
        </Alert>
      </Container>
    );
  }

  return (
    <Box>
      <Head>
        <title>OBGS | {group.name}</title>
      </Head>
      <Card showSettings group={group} />

      <TabContext value={tab}>
        <TabList onChange={(_, t) => setTab(t)}>
          <Tab label="Members" value="members" />
        </TabList>

        <TabPanel value="members">
          <Members groupId={group.id} />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default Group;
