package io.takima.demo.answer

import io.takima.demo.question.Question
import javax.persistence.*


@Entity(name = "answers")
data class Answer (
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Id var answer_id: Long?,
        @Column(name = "answer_value") var answerValue: String?,
        @ManyToOne
        @JoinColumn(name = "question_id", nullable = false)
        var question: Question?) {
        constructor(): this(null, null, null)
}


