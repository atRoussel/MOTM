package io.takima.demo.question;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/questions")
@CrossOrigin
public class QuestionController {

    private final QuestionDAO questionDAO;

    public QuestionController(QuestionDAO questionDAO) {
        this.questionDAO = questionDAO;
    }

    @GetMapping()
    public List<Question> getQuestions() {
        Iterable<Question> it = this.questionDAO.findAll();
        List<Question> questions = new ArrayList<>();
        it.forEach(e -> questions.add(e));

        return questions;
    }

    @PostMapping
    public Question addQuestion(@RequestBody Question question) {

        return this.questionDAO.save(question);
    }

    @DeleteMapping("/{id}")
    public void deleteQuestion(@PathVariable Long question_id) {
        this.questionDAO.deleteById(question_id);
    }


}







