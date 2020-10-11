package com.pwit.notificationsservice.mapper;


import com.pwit.notificationsservice.dto.Notification;
import com.pwit.notificationsservice.dto.NotificationItem;
import com.pwit.notificationsservice.dto.request.NotificationRequest;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface NotificationMapper {
    NotificationMapper INSTANCE = Mappers.getMapper(NotificationMapper.class);

    NotificationItem createNotificationToNotificationItem(Notification notification);
    Notification createNotificationRequestToNotification(NotificationRequest notificationRequest);
}