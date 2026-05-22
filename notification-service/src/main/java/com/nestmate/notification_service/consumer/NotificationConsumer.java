package com.nestmate.notification_service.consumer;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class NotificationConsumer {

    @KafkaListener(topics = "listing-created", groupId="notification-group")
    public void handleNewListing(String message){
        System.out.println("Notification received: "+message);

        //Later: send real email/SMS here
    }
}
