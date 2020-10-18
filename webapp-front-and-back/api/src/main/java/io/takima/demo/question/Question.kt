package io.takima.demo.question

import com.fasterxml.jackson.annotation.JsonProperty
import io.takima.demo.answer.Answer
import io.takima.demo.survey.Survey
import javax.persistence.*


@Entity(name = "questions")
data class Question (
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Id var question_id: Long?,
        @Column(name = "question_text") var questionText: String?,
        @ManyToOne
        @JoinColumn(name ="survey_id", nullable = false)
        @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
        var survey: Survey?,
        @OneToMany(mappedBy = "question") var answers: List<Answer>? = mutableListOf()){
    constructor() : this(null, null, null)}
