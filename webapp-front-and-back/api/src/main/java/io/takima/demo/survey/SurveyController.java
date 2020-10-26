package io.takima.demo.survey;

import io.takima.demo.comment.Comment;
import io.takima.demo.question.Question;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/surveys")
@CrossOrigin
public class SurveyController {
    private final SurveyDAO surveyDAO;

    public SurveyController(SurveyDAO surveyDAO) {
        this.surveyDAO = surveyDAO;
    }

    @GetMapping()
    public List<Survey> getSurveys() {
        Iterable<Survey> it = this.surveyDAO.findAll();
        List<Survey> surveys = new ArrayList<>();
        it.forEach(surveys::add);
        return surveys;
    }

    @PostMapping()
    public Survey addSurvey(@RequestBody Survey survey) {
        List<Question> questionList = survey.getQuestions();
        questionList.forEach(question -> question.setSurvey(survey));
        return this.surveyDAO.save(survey);
    }

    @DeleteMapping("/{id}")
    public void deleteSurvey(@PathVariable Long id) {
        this.surveyDAO.deleteById(id);
    }

    @GetMapping("/{id}")
    public Optional<Survey> getSurveyById(@PathVariable Long survey_id) {
        return this.surveyDAO.findById(survey_id);
    }
}



