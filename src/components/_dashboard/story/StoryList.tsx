import * as React from "react";

import axios from "axios";

import { useSelector } from "react-redux";
import { RootStore } from "@/global/index";

// import { NextSeo } from "next-seo";
// import NextLink from "next/link";

// material
// import { styled } from "@mui/material/styles";
// material
import { Box, Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import { StoryPostI } from "@/types/models/Story/Story.model";

// components

// import { Icon } from "@iconify/react";
// import Cloud from "@iconify/icons-ant-design/cloud-server";

// import

export default function RolesPage() {
  const authState = useSelector((state: RootStore) => state.user);
  const [stories, setStories] = React.useState<{
    fetched: boolean;
    message: string;
    status: string;
    stories?: StoryPostI;
  }>({ fetched: false, message: "", status: "" });

  const [tab, setTab] = React.useState("public");

  const handleChange = (event: any, newValue: any) => {
    setTab(newValue);
  };

  React.useEffect(() => {
    fetchStories();
  }, []);

  async function fetchStories() {
    try {
      // eslint-disable-next-line no-shadow
      const storiesRes = await axios.post<{
        message: string;
        status: string;
        stories?: StoryPostI;
      }>(`${process.env.NEXT_PUBLIC_SERVER}/story/getStories`, {
        authToken: authState.token,
      });
      setStories({
        fetched: true,
        message: "Success Fethed Stories",
        status: "success",
        stories: storiesRes.data.stories,
      });
    } catch (err) {
      console.error(err);
      setStories({
        fetched: true,
        message: "error on server",
        status: "error",
      });
    }
  }

  //   console.log(
  //     "    console.log(checkRoles(authState.me?.roles, permission));",
  //     checkRoles(authState.me?.roles, ["admin"])
  //   );

  console.log("stories", stories);

  // eslint-disable-next-line no-unused-vars
  return (
    <>
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Posted" value="public" />
            <Tab label="Drafts" value="private" />
            <Tab label="Unvisible" value="unlist" />
          </TabList>
        </Box>
        <TabPanel value="public">
          {/* @ts-ignore */}
          halo this is posted
        </TabPanel>
        <TabPanel value="private">
          {/* @ts-ignore */}
          halo this is drafts
        </TabPanel>
        <TabPanel value="unlist">
          {/* @ts-ignore */}
          halo this is Unvisible
        </TabPanel>
      </TabContext>
    </>
  );
}
