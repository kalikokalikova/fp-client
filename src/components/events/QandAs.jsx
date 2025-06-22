import { Container, Box, Typography, Button, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import Question from "./Question";
import api from "../../api";

function QandAs({ qAndAData }) {
  const [questionInputOpen, setQuestionInputOpen] = useState(false);
  const [questionText, setQuestionText] = useState("");
  const [questions, setQuestions] = useState(qAndAData);

  const { eventId } = useParams();

  const handleAskQuestion = () => {
    setQuestionInputOpen(true);
  };

  const handleCancelQuestion = () => {
    setQuestionInputOpen(false);
    setQuestionText("");
  };

  const handleQuestionChange = (e) => {
    setQuestionText(e.target.value);
  };

  const handleSubmitQuestion = () => {
    let request = { question_text: questionText };
    mutation.mutate(request);
  };

  const mutation = useMutation({
    mutationFn: async (questionText) => {
      return api.post(`api/v1/events/${eventId}/qa/`, questionText);
    },
    onSuccess: (response) => {
      setQuestions((prevQuestions) =>
        [...prevQuestions, response.data].sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        )
      );
      handleCancelQuestion();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <Container
      sx={{
        backgroundColor: "#F7FDFF",
        margin: "8px",
        width: "auto",
        padding: "5px 5px 20px 5px",
      }}
    >
      <Typography variant="h5" sx={{ fontFamily: "Anton, sans-serif" }}>
        Q&A
      </Typography>
      <Typography sx={{ fontFamily: "Anton, sans-serif" }}>
        Anyone can ask, anyone can answer.
      </Typography>

      {questions.length === 0 ? (
        <Box>
          <Typography>No questions yet.</Typography>
        </Box>
      ) : (
        <>
          <Box sx={{ marginBottom: "20px" }}>
            {questions.map((question, index) => (
              <Question key={index} question={question} />
            ))}
          </Box>
        </>
      )}
      {questionInputOpen && (
        <Box>
          <TextField
            sx={{ width: "100%", marginBottom: "10px" }}
            label="Your question"
            variant="outlined"
            value={questionText}
            onChange={handleQuestionChange}
          />
          <Button
            variant="outlined"
            sx={{ marginRight: "10px" }}
            onClick={handleCancelQuestion}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmitQuestion}>Post</Button>
        </Box>
      )}
      {!questionInputOpen && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button sx={{ width: "80%", marginTop: "15px" }} onClick={handleAskQuestion}>
            ask a question
          </Button>
        </Box>
      )}
    </Container>
  );
}

export default QandAs;
