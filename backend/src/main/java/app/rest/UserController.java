package app.rest;

import app.models.User;
import app.services.UserService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private UserService userService;

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(
            @RequestParam Long id,
            @NonNull @RequestBody User updatedUser,
            @NonNull @AuthenticationPrincipal User user) {
        return ResponseEntity.status(HttpStatus.OK).body(
                userService.updateUser(updatedUser, user, id));
    }

}
