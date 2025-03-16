package com.puntored.apirest.service;

import com.puntored.apirest.domain.entity.User;
import com.puntored.apirest.domain.enums.Role;
import com.puntored.apirest.dto.request.AuthRequestDTO;
import com.puntored.apirest.dto.request.SignupRequestDTO;
import com.puntored.apirest.dto.response.AuthResponseDTO;
import com.puntored.apirest.dto.response.UserProfileResponseDTO;
import com.puntored.apirest.exception.BadRequestException;
import com.puntored.apirest.exception.ResourceNotFoundException;
import com.puntored.apirest.mapper.UserMapper;
import com.puntored.apirest.repository.UserRepository;
import com.puntored.apirest.security.TokenProvider;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticateManagerBuilder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, TokenProvider tokenProvider, AuthenticationManagerBuilder authenticateManagerBuilder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
        this.authenticateManagerBuilder = authenticateManagerBuilder;
    }

    @Transactional(readOnly = true)
    public AuthResponseDTO signIn(AuthRequestDTO authRequest) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                authRequest.getEmail(),
                authRequest.getPassword()
        );
        Authentication authentication = authenticateManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String accessToken = tokenProvider.createAccessToken(authentication);
        UserProfileResponseDTO userProfileDTO = findByEmail(authRequest.getEmail());

        return UserMapper.fromUserProfileResDtoToAuthResponse(accessToken, userProfileDTO);
    }

    @Transactional
    public UserProfileResponseDTO signUp(SignupRequestDTO signupFormDTO) {
        boolean emailAlreadyExists = userRepository.existsByEmail(signupFormDTO.getEmail());

        if (emailAlreadyExists) {
            throw new BadRequestException("The email is being used by another user");
        }

        User user = UserMapper.fromSignupReqDtoToUser(signupFormDTO);
        user.setPassword(passwordEncoder.encode(signupFormDTO.getPassword()));
        user.setRole(Role.USER);
        userRepository.save(user);
        return UserMapper.fromUserToUserProfileResDTO(user);
    }

    @Transactional(readOnly = true)
    public UserProfileResponseDTO findByEmail(String email) {
        User user = userRepository.findOneByEmail(email)
                .orElseThrow(ResourceNotFoundException::new);

        return UserMapper.fromUserToUserProfileResDTO(user);
    }
}
