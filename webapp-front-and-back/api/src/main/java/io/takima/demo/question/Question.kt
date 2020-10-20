package io.takima.demo.question

import com.fasterxml.jackson.annotation.JsonProperty
import io.takima.demo.answer.Answer
import io.takima.demo.survey.Survey
import javax.persistence.*


@Entity(name = "questions")
data class Question (
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Id var id: Long?,
        @Column(name = "text") var text: String?,

        // Liaison entre questions et surveys
        // Une question appartient à un seul survey
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name ="survey_id", nullable = false)
        @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
        var survey: Survey?,

        // Liaison entre questions et answers
        // Une question peut avoir plusieurs answers
        @OneToMany(mappedBy = "question") var answers: List<Answer>? = mutableListOf())

{
    constructor() : this(null, null, null)}
