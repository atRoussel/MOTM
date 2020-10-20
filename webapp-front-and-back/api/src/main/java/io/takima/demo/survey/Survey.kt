package io.takima.demo.survey

import com.fasterxml.jackson.annotation.JsonIgnore
import io.takima.demo.comment.Comment
import io.takima.demo.question.Question
import io.takima.demo.user.User
import javax.persistence.*


@Entity(name = "surveys")
data class Survey (
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Id var id: Long?,
        @Column(name = "title") var title: String?,
        @Column(name = "description") var description: String?,

        // Liaison entre surveys et questions
        // Un survey contient plusieurs questions
        @OneToMany(cascade = [CascadeType.MERGE], mappedBy = "survey", fetch = FetchType.LAZY)
        var questions: List<Question>? = mutableListOf(),

        //Liaison entre surveys et comments
        // Un survey contient plusieurs commentaires
        @OneToMany(mappedBy = "survey") var comments: List<Comment>? = mutableListOf(),

        //Liaison entre surveys et users
        @JsonIgnore
        @ManyToMany(fetch = FetchType.LAZY, mappedBy = "surveys")
        var users: List<User>? = mutableListOf())
        {
        constructor() : this(null, null, null, null ,null,null)
}


