package io.takima.demo.survey;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SurveyDAO extends CrudRepository<Survey, Long> {
}
