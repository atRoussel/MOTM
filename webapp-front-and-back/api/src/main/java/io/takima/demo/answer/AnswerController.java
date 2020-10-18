package io.takima.demo.answer;


import io.takima.demo.question.Question;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/answers")
@CrossOrigin
public class AnswerController {

    private final AnswerDAO answerDAO;

    public AnswerController(AnswerDAO answerDAO) {
        this.answerDAO = answerDAO;
    }

    @GetMapping()
    public List<Answer> getAnswers() {
        Iterable<Answer> it = this.answerDAO.findAll();
        List<Answer> answers = new ArrayList<>();
        it.forEach(e -> answers.add(e));

        return answers;
    }

    @PostMapping
    public Answer addAnswer(@RequestBody Answer answer) {
        return this.answerDAO.save(answer);
    }
}
