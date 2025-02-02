import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../../api";
import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import TodayIcon from "@mui/icons-material/Today";
import QRCode from "react-qr-code";
import { Day_1 } from "../../assets/cards";
import { Container } from "@mui/system";
import { formattedTimestamp } from "../../utils/timestampFormatter";

export default function Event() {
  const backgroundImage = `url(${Day_1})`;
  const params = useParams();
  const [value, setValue] = useState(0);

  const fetchEvent = async () => {
    const res = await api.get(`/api/v1/events/${params.eventId}`);
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
      {
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundImage: backgroundImage,
            backgroundPosition: "bottom", // Centers the image
          }}
        >
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "15px",
              backgroundColor: "white",
              margin: "15px",
              borderRadius: "6px",
            }}
          >
            {isLoading ? (
              <Typography>Loading ...</Typography>
            ) : data ? (
              <>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="h3">{data.event.title}</Typography>
                  <QRCode
                    value={`${import.meta.env.VITE_FRONTEND_URL}/events/${
                      data.event.id
                    }`}
                    style={{ height: "auto", maxWidth: "25%" }}
                  />
                </Box>

                <Box sx={{ width: "100%" }}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs value={value} onChange={handleTabChange}>
                      <Tab label="Details" {...a11yProps(0)} />
                      <Tab label="Q&A" {...a11yProps(1)} />
                      <Tab label="Event Card" {...a11yProps(2)} />
                    </Tabs>
                  </Box>
                  <EventTabPanel value={value} index={0}>
                    <Box>
                      <Typography variant="h4">When</Typography>
                      <Typography>
                        {formattedTimestamp(data.event.start_date_time).date}
                      </Typography>
                      <Typography gutterBottom>
                        {formattedTimestamp(data.event.start_date_time).time}
                      </Typography>
                      {data.event.end_date_time && (
                        <>
                          <Typography>
                            {
                              formattedTimestamp(data.event.end_date_time)
                                .date
                            }
                          </Typography>
                          <Typography gutterBottom>
                            {
                              formattedTimestamp(data.event.end_date_time)
                                .time
                            }
                          </Typography>
                        </>
                      )}
                      <Typography
                        variant="h4"
                        gutterBottom
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <TodayIcon /> Add to calendar
                      </Typography>
                      <Typography variant="h4">Where</Typography>
                      <Typography>{data.location.address_1}</Typography>
                      <Typography gutterBottom>
                        {data.location.address_2}
                      </Typography>
                      <Typography variant="h4">What</Typography>
                      <Typography gutterBottom>{data.event.description}</Typography>
                      <Typography variant="h4">
                        Organized by {data.event.host}
                      </Typography>
                    </Box>
                  </EventTabPanel>
                  <EventTabPanel value={value} index={1}>
                    Item Two
                  </EventTabPanel>
                  <EventTabPanel value={value} index={2}>
                    Item Three
                  </EventTabPanel>
                </Box>
                <Button>Share</Button>
              </>
            ) : (
              <Typography>Unable to load this event.</Typography>
            )}
          </Container>
        </Box>
      }
    </>
  );
}
