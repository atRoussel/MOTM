package io.takima.demo.answer;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnswerDAO extends CrudRepository<Answer, Long> {
}
