package io.takima.demo.comment;

import io.takima.demo.question.Question;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/comments")
@CrossOrigin
public class CommentController {

    private final CommentDAO commentDAO;

    public CommentController(CommentDAO commentDAO) {
        this.commentDAO = commentDAO;
    }

    @GetMapping()
    public List<Comment> getComments() {
        Iterable<Comment> it = this.commentDAO.findAll();
        List<Comment> comments = new ArrayList<>();
        it.forEach(e -> comments.add(e));
        return comments;
    }


    @PostMapping
    public Comment addComment(@RequestBody Comment comment) {
        return this.commentDAO.save(comment);
    }
}
