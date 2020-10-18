package io.takima.demo.question;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionDAO extends CrudRepository<Question, Long> {
}
