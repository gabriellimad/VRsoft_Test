import { NotificacaoGateway } from './gateway/notificacao.gateway';
import { MessagingService } from './rabbit-services/messaging.service';
import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    RabbitMQModule.forRoot({
      exchanges: [
        {
          name: 'notificacao-exchange',
          type: 'direct',
        },
      ],
      uri: 'amqp://guest:guest@localhost:5672',
    }),
  ],
  controllers: [AppController],
  providers: [NotificacaoGateway, MessagingService, AppService],
})
export class AppModule {}
