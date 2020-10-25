package com.pwit.common.notifications;

import javax.validation.constraints.NotNull;

public enum NotificationType {
    APPOINTMENT_CREATED(1),
    APPOINTMENT_ACCEPTED(2),
    APPOINTMENT_PAID(3),
    APPOINTMENT_REVIEWED(4),
    APPOINTMENT_FINISHED(5),
    APPOINTMENT_CANCELED(6);

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
