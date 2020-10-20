package io.takima.demo.user

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
        var surveys: List<Survey>? = mutableListOf())

{
        constructor (): this(null, null, null, null, null)

}
