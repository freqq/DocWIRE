package com.pwit.notificationsservice.dto;

import com.stripe.model.checkout.Session;
import lombok.Data;

@Data
public class SessionResponse {
    private String id;

    public SessionResponse(Session session){
        this.id = session.getId();
    }
}
