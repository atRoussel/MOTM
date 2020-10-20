package io.takima.demo.survey;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

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
        return this.surveyDAO.save(survey);
    }

    @DeleteMapping("/{id}")
    public void deleteSurvey(@PathVariable Long id) {
        this.surveyDAO.deleteById(id);
    }
}



