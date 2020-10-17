package com.pwit.paymentsservice.mapper;


import com.pwit.paymentsservice.dto.Notification;
import com.pwit.paymentsservice.dto.NotificationItem;
import com.pwit.paymentsservice.dto.request.NotificationRequest;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface NotificationMapper {
    NotificationMapper INSTANCE = Mappers.getMapper(NotificationMapper.class);

    NotificationItem createNotificationToNotificationItem(Notification notification);
    Notification createNotificationRequestToNotification(NotificationRequest notificationRequest);
}