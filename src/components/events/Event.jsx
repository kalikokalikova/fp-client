import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../../api";
import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import QRCode from "react-qr-code";

export default function Event() {
  const params = useParams();
  const [value, setValue] = useState(0);

  const fetchEvent = async () => {
    const res = await api.get(`/api/v1/events/${params.eventId}`);
    console.log(res);
    return res.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["event", params.eventId],
    queryFn: fetchEvent,
  });

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  function EventTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <>
      {(
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box>{data?.title}</Box>
              <Box>
                <Button>save</Button>
                <Button>Share</Button>
              </Box>
            </Box>
            <Box>
              <QRCode
                value="https://www.geeksforgeeks.org/how-to-make-a-qr-code-generator-using-qrcode-js/"
                style={{ height: "auto", maxWidth: "50%", width: "50%" }}
              />
            </Box>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleTabChange}
                aria-label="basic tabs example"
              >
                <Tab label="Details" {...a11yProps(0)} />
                <Tab label="Q&A" {...a11yProps(1)} />
                <Tab label="Event Card" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <EventTabPanel value={value} index={0}>
              <Box>
                {isLoading ? (
                  <>loading ...</>
                ) : data ? (
                  <>
                    <Typography>When</Typography>
                    <Typography>{data.startDateTime}</Typography>
                    <Typography>icon Add to calendar link</Typography>
                    <Typography>Where</Typography>
                    <Typography>location breakdown goes here</Typography>
                    <Typography>What</Typography>
                    <Typography>{data.description}</Typography>
                    <Typography>Organized by {data.hostName}</Typography>
                    <Typography></Typography>
                  </>
                ) : (<>bad</>)}
              </Box>
            </EventTabPanel>
            <EventTabPanel value={value} index={1}>
              Item Two
            </EventTabPanel>
            <EventTabPanel value={value} index={2}>
              Item Three
            </EventTabPanel>
          </Box>
        </Box>
      )}
    </>
  );
}
