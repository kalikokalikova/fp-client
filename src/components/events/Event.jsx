import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import QRCode from "react-qr-code";

export default function Event() {
  const [event, setEvent] = useState(null);
  const params = useParams();
  const [value, setValue] = useState(0);

  useEffect(() => {
    setEvent({
      allowQA: true,
      description: "A really good description. Very very nice indeed.",
      endDateTime: null,
      endTime: "2024-11-16T12:20:00.000Z",
      hostName: "Calico Seders",
      isShareable: true,
      location: {
        locationName: "MiniGolf Course",
        addressLine1: "123 Main Loop",
        addressLine2: "Seattle, WA 98103, United States of America",
        city: "Seattle",
        country: "United States",
        locationText:
          "123 Main Loop Seattle, WA 98103, United States of America",
        placeId:
          "51e7ea7d995e965ec0593ea2f8e758d54740f00102f901027a350300000000c00203",
        postcode: "98103",
        state: "Washington",
      },
      startDateTime: "2024-11-15T21:34:37.255Z",
      title: "Your mom",
    });
  }, []);

  // fetch event by event id
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await api.get(`/event/${params.eventId}`);
        console.log("Here's the response: ", response);
        // setEvent(response.data);

      } catch (error) {
        console.log("Here's the error: ", error);
      }
    };
    fetchData();
  }, []);

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
      {event ? (
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box>{event.title}</Box>
              <Box>
                <Button>save</Button>
                <Button>Share</Button>
              </Box>
            </Box>
            <Box><QRCode value="https://www.geeksforgeeks.org/how-to-make-a-qr-code-generator-using-qrcode-js/"  style={{ height: "auto", maxWidth: "50%", width: "50%" }} /></Box>
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
                <Typography>When</Typography>
                <Typography>{event.startDateTime}</Typography>
                <Typography>icon Add to calendar link</Typography>
                <Typography>Where</Typography>
                <Typography>location breakdown goes here</Typography>
                <Typography>What</Typography>
                <Typography>{event.description}</Typography>
                <Typography>Organized by {event.hostName}</Typography>
                <Typography></Typography>
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
      ) : null}
    </>
  );
}
