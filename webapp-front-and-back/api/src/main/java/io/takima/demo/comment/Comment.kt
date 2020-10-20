package io.takima.demo.comment

import com.fasterxml.jackson.annotation.JsonProperty
import io.takima.demo.survey.Survey
import javax.persistence.*

@Entity(name = "comments")
data class Comment (
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Id var id: Long?,
        @Column (name = "value") var value : String?,

        // Liaison entre comments et survey
        // Un comment appartient à un seul survey
        @ManyToOne
        @JoinColumn(name = "survey_id", nullable = false)
        @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
        var survey: Survey?) {
    constructor(): this (null, null, null)
}
