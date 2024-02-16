package app.services;

import app.dto.UserResponseDTO;
import app.exceptions.ResourceIdentifierMismatchException;
import app.exceptions.ResourceNotFoundException;
import app.mappers.UserMapper;
import app.models.User;
import app.repositories.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserDetailsService userDetailsService() {
        return username -> userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Username not found"));
    }

    @Transactional
    public User createUser(User user) {
        // check for existing user is done in authentication service

        while(userRepository.existsById(user.getId())) {
            user.setId(User.generateRandomId());
        }

        return userRepository.save(user);
    }

    public UserResponseDTO findByEmail(String email) {
        return userRepository.findByEmail(email)
                .map(userMapper::userToUserResponseDTO)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    @Transactional
    public UserResponseDTO updateUser(User updatedUser, User user, Long id) {
        if(Long.parseLong(user.getUsername()) != id) {
            throw new ResourceIdentifierMismatchException("Given id does not match the user's id.");
        }

        //#todo for email confirmation would need to be setup, but for now we will just update the email
        User userFromDb = userRepository.findByEmail(user.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        userFromDb.setEmail(updatedUser.getEmail());
        userFromDb.setFirstName(updatedUser.getFirstName());
        userFromDb.setLastName(updatedUser.getLastName());

        return userMapper.userToUserResponseDTO(userRepository.save(userFromDb));
    }
}
