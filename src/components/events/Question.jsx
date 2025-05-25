import React, { useState, useEffect } from "react";
import Answer from "./Answer";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import api from "../../api";
import { Box, Button, TextField } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

function Question({ question }) {
  const [answerInputOpen, setAnswerInputOpen] = useState(false);
  const [answerText, setAnswerText] = useState("");
  const [answers, setAnswers] = useState(question.answers || [])
  const { eventId } = useParams();

  useEffect(() => {
    setAnswers(question.answers || []);
  }, [question]);

  const handleAnswerQuestion = () => {
    setAnswerInputOpen(true);
  };

  const handleAnswerChange = (e) => {
    setAnswerText(e.target.value)
  }

  const handleCancelAnswer = () => {
    setAnswerInputOpen(false);
    setAnswerText("");
  };

  const handleSubmitAnswer = () => {
    let request = { "id": question.id, "answer_text": answerText}
    mutation.mutate(request);
  };

  const mutation = useMutation({
    mutationFn: async (request) => {
      return api.post(`api/v1/events/${eventId}/qa/`, request);
    },
    onSuccess: (response) => {
      setAnswers((prevAnswers) =>
        [...prevAnswers, response.data].sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        )
      );
      handleCancelAnswer();
    },
    onError: (error) => {
      console.error(error);
    }
  })

  return (
    <Box>
      <Accordion
      sx={{ backgroundColor: "transparent", boxShadow: "none" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography className="barlow-regular" sx={{ fontWeight: "600" }}>{question.question_text}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {answers.length > 0 ? (
            <List>
              {answers.map((answer, index) => (
                <ListItem key={index}>
                  <Answer answer={answer} />
                </ListItem>
              ))}
            </List>
          ) : (<Typography>No answers yet</Typography>)}
          {answerInputOpen ? (
        <Box>
          <TextField label="Your answer" variant="outlined" value={answerText} onChange={handleAnswerChange} />
          <Button onClick={handleCancelAnswer}>Cancel</Button>
          <Button onClick={handleSubmitAnswer}>Post</Button>
        </Box>
      ) : (<Button onClick={handleAnswerQuestion}>Answer</Button>)}

        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default Question;
