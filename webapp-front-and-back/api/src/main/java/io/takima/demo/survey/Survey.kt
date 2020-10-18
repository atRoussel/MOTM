package io.takima.demo.survey

import io.takima.demo.comment.Comment
import io.takima.demo.question.Question
import io.takima.demo.user.User
import javax.persistence.*


@Entity(name = "surveys")
data class Survey (
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Id var survey_id: Long?,
        @Column(name = "survey_title") var surveyTitle: String?,
        @Column(name = "survey_description") var surveyDescription: String?,
        @ManyToMany(mappedBy = "surveys")
        var users: List<User>? = mutableListOf(),
        @OneToMany(mappedBy = "survey") var questions: List<Question>? = mutableListOf(),
        @OneToMany(mappedBy = "survey") var comments: List<Comment>? = mutableListOf()) {
        constructor() : this(null, null, null)
}


