package app.rest;

import app.dto.JwtAuthenticationResponse;
import app.dto.SignInRequest;
import app.dto.SignUpRequest;
import app.exceptions.ResourceAlreadyUsedException;
import app.exceptions.ResourceNotFoundException;
import app.services.AuthenticationService;
import app.services.UserService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignUpRequest request) {
        authenticationService.signup(request);
            return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody SignInRequest request) {
        return ResponseEntity.accepted().header(
               HttpHeaders.AUTHORIZATION, "Bearer " + authenticationService.signin(request).getToken())
                .body(userService.findByEmail(request.getEmail()));
    }
}
