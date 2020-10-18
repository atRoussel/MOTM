package io.takima.demo.answer

import com.fasterxml.jackson.annotation.JsonProperty
import io.takima.demo.question.Question
import javax.persistence.*


@Entity(name = "answers")
data class Answer (
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Id var answer_id: Long?,
        @Column(name = "answer_value") var answerValue: String?,
        @ManyToOne
        @JoinColumn(name = "question_id", nullable = false)
        @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
        var question: Question?) {
        constructor(): this(null, null, null)
}


