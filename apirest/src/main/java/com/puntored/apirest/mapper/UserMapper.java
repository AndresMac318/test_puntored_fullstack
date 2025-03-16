package com.puntored.apirest.mapper;

import com.puntored.apirest.domain.entity.User;
import com.puntored.apirest.dto.request.SignupRequestDTO;
import com.puntored.apirest.dto.response.AuthResponseDTO;
import com.puntored.apirest.dto.response.UserProfileResponseDTO;

public class UserMapper {

    public static User fromSignupReqDtoToUser(SignupRequestDTO signupRequestDTO){
        User user = new User();
        user.setFirstName(signupRequestDTO.getFirstName());
        user.setLastName(signupRequestDTO.getLastName());
        user.setEmail(signupRequestDTO.getEmail());
        return user;
    }

    public static UserProfileResponseDTO fromUserToUserProfileResDTO(User user){
        UserProfileResponseDTO userProfile = new UserProfileResponseDTO();
        userProfile.setId(user.getId());
        userProfile.setFirstName(user.getFirstName());
        userProfile.setLastName(user.getLastName());
        userProfile.setEmail(user.getEmail());
        userProfile.setRole(user.getRole());
        return userProfile;
    }

    public static AuthResponseDTO fromUserProfileResDtoToAuthResponse(String token, UserProfileResponseDTO userProfile){
        AuthResponseDTO authResponseDTO = new AuthResponseDTO();
        authResponseDTO.setToken(token);
        authResponseDTO.setUser(userProfile);
        return authResponseDTO;
    }
}
