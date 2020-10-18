package io.takima.demo.user

import io.takima.demo.survey.Survey
import javax.persistence.*

/**
 *
 */
@Entity(name = "users")
data class User(
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Id var userId: Long?,
        @Column(name = "user_name") var userName: String?,
        @Column(name = "user_email") var userMail: String?,
        @Column(name = "user_date") var userDate: String?,
        @ManyToMany(cascade = [CascadeType.MERGE], fetch = FetchType.LAZY)
        @JoinTable(name="users_surveys",
        joinColumns = [JoinColumn(name = "user_id", referencedColumnName = "userId")],
        inverseJoinColumns = [JoinColumn(name="survey_id", referencedColumnName = "surveyId")])
        var surveys: List<Survey>? = mutableListOf()) {
        constructor (): this(null, null, null, null, null)

}
