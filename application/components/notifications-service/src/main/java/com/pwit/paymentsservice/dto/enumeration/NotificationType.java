package com.pwit.paymentsservice.dto.enumeration;

import javax.validation.constraints.NotNull;

public enum NotificationType {
    APPOINTMENT_CREATED(1),
    APPOINTMENT_DECLINED(2),
    APPOINTMENT_PAID(2),
    APPOINTMENT_ACCEPTED(3);

    private final int id;
    private final String name;

    NotificationType(int id){
        this.id = id;
        this.name = this.name();
    }

    @NotNull
    public int getId() {
        return id;
    }

    @NotNull
    public String getName(){
        return name;
    }
}
