package io.takima.demo.user

import com.fasterxml.jackson.annotation.JsonProperty
import io.takima.demo.answer.Answer
import io.takima.demo.comment.Comment
import io.takima.demo.question.Question
import io.takima.demo.survey.Survey
import javax.persistence.*

/**
 *
 */
@Entity(name = "users")
data class User(
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Id var id: Long?,
        @Column(name = "name") var name: String?,
        @Column(name = "mail") var mail: String?,
        @Column(name = "date") var date: String?,

        // Liaison entre users et surveys
        // -> Un user peut répondre à plusieurs surveys
        // -> Un survey peut être remplis par plusieurs users
        @ManyToMany(cascade = [CascadeType.MERGE], fetch = FetchType.LAZY)
        @JoinTable(name="users_surveys",
        joinColumns = [JoinColumn(name = "user_id", referencedColumnName = "id")],
        inverseJoinColumns = [JoinColumn(name="survey_id", referencedColumnName = "id")])
        var surveys: List<Survey>? = mutableListOf(),

        // Liaison entre users et comments
        // Un user ne peut laisser qu'un commentaire
        @OneToMany(cascade = [CascadeType.ALL], mappedBy = "user")
        var comments: List<Comment>? = mutableListOf(),

        // Liaison entre users et answers
        // Un user laisse plusieurs réponses
        @OneToMany(cascade = [CascadeType.ALL], mappedBy = "user")
        var answers: List<Answer>? = mutableListOf(),)
{
        constructor (): this(null, null, null, null, null, null, null)

}
