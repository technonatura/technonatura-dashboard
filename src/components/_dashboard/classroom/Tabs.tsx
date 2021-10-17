import * as React from "react";

import { useSelector } from "react-redux";
import { RootStore } from "@/global/index";

import axios from "axios";

// material
// import { styled } from "@mui/material/styles";
// material
import { Box, Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import Classes from "./class";
import Archives from "./archives";

// components

// import { Icon } from "@iconify/react";
// import Cloud from "@iconify/icons-ant-design/cloud-server";

import checkRoles from "@utils/checkRoles";

export default function ClassroomPage() {
  const [tab, setTab] = React.useState("class");
  const [Branches, setBranches] = React.useState<{
    fetched: boolean;
    message: string;
    status: string;
    branches: Array<{ title: string; name: string; active: boolean }>;
  }>({ fetched: false, message: "", status: "", branches: [] });

  const handleChange = (event: any, newValue: any) => {
    setTab(newValue);
  };
  const authState = useSelector((state: RootStore) => state.user);

  React.useEffect(() => {
    fetchBranches();
  }, []);

  async function fetchBranches() {
    try {
      // eslint-disable-next-line no-shadow
      const branches = await axios.get<{
        message: string;
        status: string;
        branches: Array<{ title: string; name: string; active: boolean }>;
      }>(`${process.env.NEXT_PUBLIC_SERVER}/api/branches`);
      console.log(branches.data.branches);
      setBranches({
        fetched: true,
        message: "Success Fethed Branch",
        status: "success",
        branches: branches.data.branches,
      });
    } catch (err) {
      // console.error(err);
      setBranches({
        fetched: true,
        message: "error on server",
        status: "error",
        branches: [],
      });
    }
  }

  //   console.log(
  //     "    console.log(checkRoles(authState.me?.roles, permission));",
  //     checkRoles(authState.me?.roles, ["admin"])
  //   );

  // eslint-disable-next-line no-unused-vars
  return (
    <>
      <TabContext value={tab}>
        {authState.me && checkRoles(authState.me.roles, ["admin", "teacher"]) && (
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              onChange={handleChange}
              aria-label="lab API tabs example"
            >
              <Tab label=" Class" value="class" />

              <Tab label=" Archives" value="archives" />
            </TabList>
          </Box>
        )}

        <TabPanel value="class">
          <Classes Branches={Branches} />
        </TabPanel>
        {authState.me && checkRoles(authState.me.roles, ["admin", "teacher"]) && (
          <TabPanel value="archives">
            <Archives Branches={Branches} />
          </TabPanel>
        )}
      </TabContext>
    </>
  );
}
